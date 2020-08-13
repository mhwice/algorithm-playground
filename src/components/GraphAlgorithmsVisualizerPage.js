import React, { useState, useEffect, useReducer } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import Graph from "./Graph";
import Table from "./Table";
import generateRandomGraph from "../utils/generateRandomGraph";
import getPathWithEdges from "../utils/getPathWithEdges";
import useHistory from "../hooks/useHistory";
import visitedNodesReducer from "../reducers/visitedNodesReducer";
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
	const [path, setPath] = useState([]);

	// When length > 0 causes the Graph to be cleared
	const [clearGraph, setClearGraph] = useState([]);

	// Used to clear the path from the graph if drawn
	const [clearPath, setClearPath] = useState([]);

	// Determines if 'playing' or 'paused'
	const [isPlaying, setIsPlaying] = useState(false);

	// A list of all nodes that have been marked as visited
	const [allVisited, dispatchAllVisitedNodes] = useReducer(visitedNodesReducer, []);

	// A list of nodes that were marked as visited in the last step
	const [newlyVisited, setNewlyVisited] = useState([]);

	// A list of nodes that need to be marked as unvisited
	const [clearNodes, setClearNodes] = useState([]);

	// History
	const [history, { redoHistory, undoHistory, canRedoHistory, setHistory, resetHistory }] = useHistory([]);

	// ================= Custom Functions ==================

	// const updateNewNodes = (priorityQueueData) => {
	// 	setNewlyVisited([...priorityQueueData.filter((item) => !allVisited.includes(item[0])).map((item) => item[0])]);
	// };

	// ================ Steps =============

	// Takes a single algorithm step
	const takeStep = () => {
		// Get next algorithm state
		const algorithmState = algorithmGenerator.next();
		if (!algorithmState.done) {
			// Format data
			const { costTable, pathTable, priorityQueue } = algorithmState.value;
			const formattedPriorityQueueTableData = arrayOfObjectsToArrayOfArrays(priorityQueue);
			const tableData = [objectToArray(costTable), objectToArray(pathTable), formattedPriorityQueueTableData];

			// ! Get new nodes -> add to previous

			setHistory(tableData);

			// Update graph by highlighting items that were just seen for the first time
			setNewlyVisited([
				...formattedPriorityQueueTableData.filter((item) => !allVisited.includes(item[0])).map((item) => item[0])
			]);
		} else if (algorithmState.value) {
			// Display path
			const { shortestPath } = algorithmState.value;
			if (shortestPath) {
				setPath(getPathWithEdges(shortestPath));
			}
		}
	};

	// Move item from future to history and apply changes
	const redoStep = () => {
		redoHistory();

		// Update graph by highlighting items that were just seen for the first time
		setNewlyVisited([...history.present[2].filter((item) => !allVisited.includes(item[0])).map((item) => item[0])]);
	};

	// Move item from history to future and apply changes
	const undoStep = () => {
		const currentState = history.present;
		const previousState = history.past[history.past.length - 1];

		undoHistory();

		// Compute which nodes were visited between the previous state and the current state
		const currentNodes = currentState[2].map((item) => item[0]);
		const previousNodes = previousState[2].map((item) => item[0]);
		const visitedNodes = currentNodes.filter((x) => !previousNodes.includes(x));

		setClearNodes(visitedNodes);
		dispatchAllVisitedNodes({ type: "REMOVE_NODES", nodes: visitedNodes });
		setClearPath(path);
	};

	// Resets everything
	const resetAll = () => {
		setIsPlaying(false);
		setClearGraph(allVisited);
		setClearNodes([]);
		setClearPath([]);
		dispatchAllVisitedNodes({ type: "RESET" });
		setAlgorithmGenerator(initialAlgorithmResults);
		resetHistory([]);
	};

	// Moves backwards once
	const moveBackward = () => {
		if (history.past.length > 1) {
			undoStep();
		} else {
			resetAll();
		}
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

	// Add newly visited notes to all visited nodes
	useEffect(() => {
		dispatchAllVisitedNodes({ type: "ADD_NODES", nodes: newlyVisited });
	}, [newlyVisited]);

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
	}, [isPlaying]);

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
				<Graph
					rows={ROWS}
					graph={graph}
					path={path}
					clearGraph={clearGraph}
					newlyVisited={newlyVisited}
					clearNodes={clearNodes}
					clearPath={clearPath}
				/>
			</div>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;
