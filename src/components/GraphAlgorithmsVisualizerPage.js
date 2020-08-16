import React, { useState, useEffect } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import Graph from "./Graph";
import Table from "./Table";
import Editor from "./Editor";
import generateRandomGraph from "../utils/generateRandomGraph";
import getPathWithEdges from "../utils/getPathWithEdges";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import { objectToArray, arrayOfObjectsToArrayOfArrays } from "../utils/arrayManipulators";

const ROWS = 2;
const COLUMNS = 2;

const GraphAlgorithmsVisualizerPage = () => {
	// Graph model
	const initialGraph = () => generateRandomGraph(ROWS, COLUMNS);
	const [graph, setGraph] = useState(initialGraph);

	// Algorithm generator
	const initialAlgorithmResults = () => dijkstraProcess(graph, `(0, 0)`, `(${ROWS - 1}, ${COLUMNS - 1})`);
	const [algorithmGenerator, setAlgorithmGenerator] = useState(initialAlgorithmResults);

	// Shortest path
	const [path, setPath] = useState({ path: [], drawPath: false });

	// Determines if 'playing' or 'paused'
	const [isPlaying, setIsPlaying] = useState(false);

	const [isEditing, setIsEditing] = useState(false);

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

	// ======================= editor ======================

	// useEffect(() => {

	// }, [isEditing])

	const editGraph = () => {
		setIsEditing((prev) => !prev);
	};

	const graphToEdgeList = (graphList) => {
		const edges = [];
		for (let i = 0; i < graphList.length; i += 1) {
			const { data } = graphList[i];
			if (data.source !== undefined && data.target !== undefined && data.weight !== undefined) {
				edges.push({ originalIndex: i, source: data.source, target: data.target, weight: data.weight });
			}
		}
		return edges;
	};

	const nodeAppearsNTimesInGraph = (g, node, N = 0) =>
		g.filter((item) => item.data.source === node || item.data.target === node).length > N;

	const removeNodeIfUnused = (newGraph, node, N = 0) => {
		if (!nodeAppearsNTimesInGraph(newGraph, node, N)) {
			return newGraph.filter((item) => item.data.id !== node);
		}
		return newGraph;
	};

	const nodeNameIsValid = (node) => node.length > 0 && node.length < 7;

	const addNodeIfNotInGraph = (newGraph, node) => {
		if (!nodeAppearsNTimesInGraph(newGraph, node)) {
			const newNode = {
				data: {
					id: node,
					label: node,
					isStart: false,
					isEnd: false
				}
			};
			newGraph.push(newNode);
		}

		return newGraph;
	};

	const removeEdgeCallback = (id) => {
		const removedEdge = graph[id];
		const sourceNode = removedEdge.data.source;
		const targetNode = removedEdge.data.target;
		let newGraph = graph.filter((_, index) => index !== id);

		newGraph = removeNodeIfUnused(newGraph, sourceNode);
		newGraph = removeNodeIfUnused(newGraph, targetNode);

		setGraph(newGraph);
	};

	const addEdgeCallback = () => {
		let newGraph = [...graph];

		const fromNode = "A";
		const toNode = "B";

		newGraph = addNodeIfNotInGraph(newGraph, fromNode);
		newGraph = addNodeIfNotInGraph(newGraph, toNode);

		const newEdge = {
			data: {
				id: `${fromNode}-${toNode}`,
				label: fromNode,
				source: fromNode,
				target: toNode,
				weight: 0
			}
		};
		newGraph.push(newEdge);

		setGraph(newGraph);
	};

	const updateEdgeCallback = (val) => {
		let newGraph = [...graph];
		const { fromNode, toNode, weight, id } = val;
		const { source, target } = graph[id].data;
		const newEdge = {
			data: {
				id: `${fromNode}-${toNode}`,
				label: fromNode,
				source: fromNode,
				target: toNode,
				weight: Number(weight)
			}
		};

		if (source !== fromNode) {
			if (nodeNameIsValid(fromNode)) {
				newGraph = removeNodeIfUnused(newGraph, source, 1);
				newGraph = addNodeIfNotInGraph(newGraph, fromNode);
				newGraph[id] = newEdge;
				setGraph(newGraph);
			}
		} else if (target !== toNode) {
			if (nodeNameIsValid(toNode)) {
				newGraph = removeNodeIfUnused(newGraph, target, 1);
				newGraph = addNodeIfNotInGraph(newGraph, toNode);
				newGraph[id] = newEdge;
				setGraph(newGraph);
			}
		} else if (!weight || weight.match(/^\d{1,3}$/)) {
			newGraph[id] = newEdge;
			setGraph(newGraph);
		}
	};

	const updateStartNode = (val) => {
		console.log(val);
	};

	const updateEndNode = (val) => {
		console.log(val);
	};
	// ====================== JSX =====================

	return (
		<div>
			<h1>Dijkstra Algorithm</h1>
			<div className="media-button-container">
				<button className="media-button" onClick={moveBackward} type="button">
					{"<-"}
				</button>
				<button className="media-button" onClick={playPauseToggle} type="button">
					{isPlaying ? "Pause" : "Play"}
				</button>
				<button className="media-button" onClick={moveForward} type="button">
					{"->"}
				</button>
				<button className="media-button" onClick={resetAll} type="button">
					Reset
				</button>
				<button className="media-button" onClick={editGraph} type="button">
					{isEditing ? "Done" : "Edit"}
				</button>
			</div>
			<div className="window-container">
				<div className="window">
					{isEditing ? (
						<Editor
							list={graphToEdgeList(graph)}
							addEdge={addEdgeCallback}
							removeEdge={removeEdgeCallback}
							updateEdge={updateEdgeCallback}
							startNode="(0, 0)"
							endNode="(2, 2)"
							updateStartNode={updateStartNode}
							updateEndNode={updateEndNode}
						/>
					) : (
						<>
							<Table title="Cost Table" headings={["Node", "Lowest Cost to Reach Node"]} data={history.present[0]} />
							<Table title="Path Table" headings={["Node", "Reached By"]} data={history.present[1]} />
							<Table title="Priority Queue" headings={["Node", "Priority"]} data={history.present[2]} />
						</>
					)}
					{/* <Editor
					list={graphToEdgeList(graph)}
					addEdge={addEdgeCallback}
					removeEdge={removeEdgeCallback}
					updateEdge={updateEdgeCallback}
					startNode="(0, 0)"
					endNode="(2, 2)"
					updateStartNode={updateStartNode}
					updateEndNode={updateEndNode}
				/> */}
				</div>
				<div className="window">
					<Graph rows={ROWS} graph={graph} path={path} visitedNodes={visitedNodes} />
				</div>
			</div>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;
