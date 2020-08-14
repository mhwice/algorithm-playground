import React, { useState } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import Graph from "./Graph";
import Table from "./Table";
import generateRandomGraph from "../utils/generateRandomGraph";
import getPathWithEdges from "../utils/getPathWithEdges";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import { objectToArray, arrayOfObjectsToArrayOfArrays } from "../utils/arrayManipulators";

const ROWS = 3;
const COLUMNS = 3;

const GraphAlgorithmsVisualizerPage = () => {
	// Graph model
	const initialGraph = () => generateRandomGraph(ROWS, COLUMNS);
	const [graph] = useState(initialGraph);

	// Algorithm generator
	const initialAlgorithmResults = () => dijkstraProcess(graph, `(0, 0)`, `(${ROWS - 1}, ${COLUMNS - 1})`);
	const [algorithmGenerator, setAlgorithmGenerator] = useState(initialAlgorithmResults);

	// Shortest path
	const [path, setPath] = useState({ path: [], drawPath: false });

	// Determines if 'playing' or 'paused'
	const [isPlaying, setIsPlaying] = useState(false);

	// A list of nodes that were marked as visited in the last step
	const [visitedNodes, setVisitedNodes] = useState([]);

	// History
	const [history, { redoHistory, undoHistory, canRedoHistory, setHistory, resetHistory }] = useHistory([
		[],
		[],
		[],
		[]
	]);

	// ================ Steps =============

	// Takes one algorithm step
	const takeStep = () => {
		const algorithmState = algorithmGenerator.next();
		if (!algorithmState.done) {
			const { costTable, pathTable, priorityQueue } = algorithmState.value;
			const formattedPriorityQueueTableData = arrayOfObjectsToArrayOfArrays(priorityQueue);

			const presentNodes = history.present[3];
			const newNodes = formattedPriorityQueueTableData
				.map((item) => item[0])
				.filter((item) => !presentNodes.includes(item));

			setHistory([
				objectToArray(costTable),
				objectToArray(pathTable),
				formattedPriorityQueueTableData,
				[...presentNodes, ...newNodes]
			]);

			setVisitedNodes(newNodes);
		} else if (algorithmState.value) {
			const { shortestPath } = algorithmState.value;
			if (shortestPath) {
				setIsPlaying(false);
				setPath({ path: getPathWithEdges(shortestPath), drawPath: true });
			}
		}
	};

	// Move item from future to past and apply changes
	const redoStep = () => {
		if (history.future.length === 1) {
			setPath((prev) => {
				return { path: prev.path, drawPath: true };
			});
		}
		setVisitedNodes(history.future[0][3].filter((node) => !history.present[3].includes(node)));
		redoHistory();
	};

	// Move item from past to future and apply changes
	const undoStep = () => {
		setPath((prev) => {
			return { path: prev.path, drawPath: false };
		});
		setVisitedNodes(history.present[3].filter((node) => !history.past[history.past.length - 1][3].includes(node)));
		undoHistory();
	};

	// Resets everything
	const resetAll = () => {
		setIsPlaying(false);
		setVisitedNodes(history.present[3]);
		setPath({ path: [], drawPath: false });
		setAlgorithmGenerator(initialAlgorithmResults);
		resetHistory([[], [], [], []]);
	};

	// Moves backwards one step
	const moveBackward = () => {
		undoStep();
	};

	// Moves forward one step
	const moveForward = () => {
		if (canRedoHistory) {
			redoStep();
		} else {
			takeStep();
		}
	};

	// Toggles the value of isPlaying
	const playPauseToggle = () => {
		setIsPlaying((prev) => !prev);
	};

	// Begins timer
	useInterval(() => {
		if (isPlaying) {
			moveForward();
		}
	}, 1000);

	// ====================== JSX =====================

	return (
		<div className="page">
			<h1>Dijkstra Algorithm</h1>
			<div className="button-container">
				<button className="run-button" onClick={moveBackward} type="button">
					{"<-"}
				</button>
				<button className="run-button" onClick={playPauseToggle} type="button">
					{isPlaying ? "Pause" : "Play"}
				</button>
				<button className="run-button" onClick={moveForward} type="button">
					{"->"}
				</button>
				<button className="run-button" onClick={resetAll} type="button">
					Reset
				</button>
			</div>
			<div className="visualizations">
				<Table title="Cost Table" headings={["Node", "Lowest Cost to Reach Node"]} data={history.present[0]} />
				<Table title="Path Table" headings={["Node", "Reached By"]} data={history.present[1]} />
				<Table title="Priority Queue" headings={["Node", "Priority"]} data={history.present[2]} />
				<Graph rows={ROWS} graph={graph} path={path} visitedNodes={visitedNodes} />
			</div>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;

/*

// ================ Steps =============

	// Takes a single algorithm step
	const takeStep = () => {
		// Get next algorithm state
		const algorithmState = algorithmGenerator.next();
		if (!algorithmState.done) {
			// Format data
			const { costTable, pathTable, priorityQueue } = algorithmState.value;
			const formattedPriorityQueueTableData = arrayOfObjectsToArrayOfArrays(priorityQueue);

			const currentNodes = history.present[3];
			console.log("currentNodes", JSON.stringify(currentNodes, null, 4));

			const newNodes = formattedPriorityQueueTableData
				.map((item) => item[0])
				.filter((item) => !history.present[3].includes(item));

			console.log("newNodes", JSON.stringify(newNodes, null, 4));

			// ! big problem. here we are using history to set history..... but history will be out of date!
			setHistory([
				objectToArray(costTable),
				objectToArray(pathTable),
				formattedPriorityQueueTableData,
				[
					...history.present[3],
					...formattedPriorityQueueTableData.map((item) => item[0]).filter((item) => !history.present[3].includes(item))
				]
			]);

			setVisitedNodes(newNodes);
		} else if (algorithmState.value) {
			// Display path
			const { shortestPath } = algorithmState.value;
			if (shortestPath) {
				setShouldAnimatePath(true);
				setPath(getPathWithEdges(shortestPath));
			}
		}
	};

	// Move item from future to history and apply changes
	const redoStep = () => {
		setVisitedNodes(history.future[0][3].filter((node) => !history.present[3].includes(node)));
		redoHistory();
	};

	// Move item from history to future and apply changes
	const undoStep = () => {
		setVisitedNodes(history.present[3].filter((node) => !history.past[history.past.length - 1][3].includes(node)));
		undoHistory();
	};

	// Resets everything
	const resetAll = () => {
		setIsPlaying(false);
		setVisitedNodes(history.present[3]);
		setShouldAnimatePath(false);
		setPath([]);
		setAlgorithmGenerator(initialAlgorithmResults);
		resetHistory([[], [], [], []]);
	};

	// Moves backwards once
	const moveBackward = () => {
		undoStep();
	};

	// Moves forward once
	const moveForward = () => {
		if (canRedoHistory) {
			redoStep();
		} else {
			takeStep();
		}
	};

	// Toggles the value of isPlaying
	const playPauseToggle = () => {
		setIsPlaying((prev) => !prev);
	};

	// ================== useEffect =========================

	// Start/stop playing
	useEffect(() => {
		let interval = null;
		if (isPlaying) {
			interval = setInterval(() => {
				moveForward();
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isPlaying]); // ! adding 'history' here solves the problem, but now this useEffect runs constantly!


*/
