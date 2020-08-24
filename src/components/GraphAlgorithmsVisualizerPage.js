import React, { useState, useEffect } from "react";
import AlgorithmManager from "../algorithms/AlgorithmManager";
import Graph from "./Graph";
import Table from "./Table";
import Editor from "./Editor";
import generateRandomGraph from "../utils/generateRandomGraph";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import {
	graphToEdgeList,
	nodeNameIsValid,
	createEdge,
	createNode,
	isNodeInGraph,
	isEdgeInGraph,
	isNodeUsed,
	removeNode,
	isWeightValid
} from "../utils/graphManipulation";
import SelectBox from "./SelectBox";
import MediaButtons from "./MediaButtons";

const ROWS = 9;
const COLUMNS = 9;

const INITIAL_START_NODE = "(0, 0)";
const INITIAL_END_NODE = `(${ROWS - 1}, ${COLUMNS - 1})`;

const IS_WEIGHTED = true;
const IS_DIRECTED = true;
const ALGORITHM = "dijkstra";
const TITLE = "Dijkstra's Algorithm";
const headings = [
	["Node", "Reached By"],
	["Node", "Lowest Cost to Reach Node"],
	["Node", "Priority"]
];
const titles = ["Path Table", "Cost Table", "Priority Queue"];
const INITIAL_HISTORY = [[], [], [], []];

// const IS_WEIGHTED = false;
// const IS_DIRECTED = false;
// const ALGORITHM = "dfs";
// const TITLE = "Depth First Search";
// const headings = [["Node", "Reached By"]];
// const titles = ["Path Table"];
// const INITIAL_HISTORY = [[], []];

const GraphAlgorithmsVisualizerPage = () => {
	// Graph model
	const initialGraph = () => generateRandomGraph(IS_DIRECTED, IS_WEIGHTED, ROWS, COLUMNS);
	const [graph, setGraph] = useState(initialGraph);

	const [startNode, setStartNode] = useState(INITIAL_START_NODE);
	const [endNode, setEndNode] = useState(INITIAL_END_NODE);

	// Algorithm generator
	const initialAlgorithmResults = () => new AlgorithmManager(ALGORITHM, graph, startNode, endNode);
	const [algorithmGenerator, setAlgorithmGenerator] = useState(initialAlgorithmResults);

	// Shortest path
	const [path, setPath] = useState({ path: [], drawPath: false });

	// Determines if 'playing' or 'paused'
	const [isPlaying, setIsPlaying] = useState(false);

	const [isEditing, setIsEditing] = useState(false);

	// A list of nodes that were marked as visited in the last step
	const [visitedNodes, setVisitedNodes] = useState([]);

	// History
	const [history, { redoHistory, undoHistory, canRedoHistory, setHistory, resetHistory }] = useHistory(INITIAL_HISTORY);

	// ================ Steps =============

	// Takes one algorithm step
	const takeStep = () => {
		const algorithmState = algorithmGenerator.next();
		if (!algorithmState.done) {
			if (algorithmState.value) {
				const presentNodes = history.present[0];
				const tables = algorithmState.value;

				let newNodes;
				if (tables[0].length === 0) {
					newNodes = [startNode];
				} else {
					newNodes = tables[0].map((item) => item[0]).filter((item) => !presentNodes.includes(item));
				}

				setHistory([[...presentNodes, ...newNodes], ...tables]);

				setVisitedNodes(newNodes);
			}
		} else if (algorithmState.value) {
			const { shortestPath } = algorithmState.value;
			if (shortestPath) {
				// make sure a path was found
				setIsPlaying(false);
				setPath({ path: shortestPath, drawPath: true });
			} else {
				setIsPlaying(false);
				console.log("path not found");
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
		setVisitedNodes(history.future[0][0].filter((node) => !history.present[0].includes(node)));
		redoHistory();
	};

	// Move item from past to future and apply changes
	const undoStep = () => {
		setPath((prev) => {
			return { path: prev.path, drawPath: false };
		});
		setVisitedNodes(history.present[0].filter((node) => !history.past[history.past.length - 1][0].includes(node)));
		undoHistory();
	};

	// Resets everything
	const resetAll = () => {
		setIsPlaying(false);
		setVisitedNodes(history.present[0]);
		setPath({ path: [], drawPath: false });
		setAlgorithmGenerator(initialAlgorithmResults);
		resetHistory(INITIAL_HISTORY);
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
	}, 300); // the more nodes, the smaller the interval #nodes 100/81

	// ======================= editor ======================

	useEffect(() => {
		if (isEditing) {
			resetAll();
		}
	}, [isEditing]);

	// useEffect(() => {
	// 	console.log("graph", JSON.stringify(graph, null, 2));
	// }, [graph]);

	const editGraph = () => {
		setIsEditing((prev) => !prev);
	};

	// need to prevent the deletion of the start and end nodes!
	const removeEdgeCallback = (id) => {
		const edgeData = graph[id].data;
		const { source } = edgeData;
		const { target } = edgeData;

		let newGraph = graph.filter((_, index) => index !== id);

		if (!isNodeUsed(newGraph, source) && source !== startNode && source !== endNode) {
			newGraph = removeNode(newGraph, source);
		}

		if (!isNodeUsed(newGraph, target) && target !== startNode && target !== endNode) {
			newGraph = removeNode(newGraph, target);
		}

		setGraph(newGraph);
		setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, newGraph, startNode, endNode));
	};

	const addEdgeCallback = (fromNode = "A", toNode = "B") => {
		if (!isEdgeInGraph(graph, fromNode, toNode)) {
			const newGraph = [...graph];
			if (!isNodeInGraph(newGraph, fromNode)) {
				newGraph.push(createNode(fromNode, false, false));
			}
			if (!isNodeInGraph(newGraph, toNode)) {
				newGraph.push(createNode(toNode, false, false));
			}
			newGraph.push(createEdge(fromNode, toNode, 0, IS_DIRECTED, IS_WEIGHTED));
			setGraph(newGraph);
			setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, newGraph, startNode, endNode));
		}
	};

	const updateEdgeCallback = (id, values) => {
		let newGraph = [...graph];
		const { fromNode, toNode, weight } = values;
		const { source, target, weight: oldWeight } = graph[id].data;

		if (source !== fromNode) {
			if (nodeNameIsValid(fromNode)) {
				if (fromNode === toNode) {
					return;
				}

				newGraph[id] = createEdge(fromNode, toNode, Number(weight), IS_DIRECTED, IS_WEIGHTED);

				if (!isNodeUsed(newGraph, source) && source !== startNode && source !== endNode) {
					newGraph = removeNode(newGraph, source);
				}

				if (!isNodeUsed(newGraph, target) && target !== startNode && target !== endNode) {
					newGraph = removeNode(newGraph, target);
				}

				if (!isNodeInGraph(newGraph, fromNode)) {
					newGraph.push(createNode(fromNode, false, false));
				}

				setGraph(newGraph);
			}
		} else if (target !== toNode) {
			if (nodeNameIsValid(toNode)) {
				if (fromNode === toNode) {
					return;
				}

				newGraph[id] = createEdge(fromNode, toNode, Number(weight), IS_DIRECTED, IS_WEIGHTED);

				if (!isNodeUsed(newGraph, source) && source !== startNode && source !== endNode) {
					newGraph = removeNode(newGraph, source);
				}

				if (!isNodeUsed(newGraph, target) && target !== startNode && target !== endNode) {
					newGraph = removeNode(newGraph, target);
				}

				if (!isNodeInGraph(newGraph, toNode)) {
					newGraph.push(createNode(toNode, false, false));
				}

				setGraph(newGraph);
			}
		} else if (oldWeight !== weight) {
			if (isWeightValid(weight)) {
				newGraph[id] = createEdge(fromNode, toNode, Number(weight), IS_DIRECTED, IS_WEIGHTED);
				setGraph(newGraph);
			}
		}
		setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, newGraph, startNode, endNode));
	};

	const updateStartNode = (id) => {
		const node = graph[id];

		// Check if node is already the start or end node
		if (!node.data.isStart && !node.data.isEnd) {
			let newGraph = [...graph];

			// Mark all nodes as not the start node
			newGraph.forEach((item) => {
				if (item.data.isStart) {
					item.data.isStart = false;
				}
			});

			// Mark the new node as the start node
			newGraph[id].data.isStart = true;

			// Remove previous start node if no longer used
			if (!isNodeUsed(newGraph, startNode)) {
				newGraph = removeNode(newGraph, startNode);
			}

			// Update graph
			setGraph(newGraph);
			setStartNode(node.data.id);
			setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, newGraph, node.data.id, endNode));
		}
	};

	const updateEndNode = (id) => {
		const node = graph[id];

		// Check if node is already the start node or end node
		if (!node.data.isStart && !node.data.isEnd) {
			let newGraph = [...graph];

			// Mark all nodes as not the end node
			newGraph.forEach((item) => {
				if (item.data.isEnd) {
					item.data.isEnd = false;
				}
			});

			// Mark the new node as the end node
			newGraph[id].data.isEnd = true;

			// Remove previous end node if no longer used
			if (!isNodeUsed(newGraph, endNode)) {
				newGraph = removeNode(newGraph, endNode);
			}

			// Update graph
			setGraph(newGraph);
			setEndNode(node.data.id);
			setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, newGraph, startNode, node.data.id));
		}
	};
	// ====================== JSX =====================

	return (
		<div className="wrapper">
			<SelectBox className="header" />
			<div className="content window-container">
				<div id="table-window" className="window">
					{isEditing ? (
						<Editor
							list={graphToEdgeList(graph)}
							addEdge={addEdgeCallback}
							removeEdge={removeEdgeCallback}
							updateEdge={updateEdgeCallback}
							updateStartNode={updateStartNode}
							updateEndNode={updateEndNode}
							isWeighted={IS_WEIGHTED}
						/>
					) : (
						<>
							{history.present.slice(1).map((data, idx) => {
								return <Table key={idx} title={titles[idx]} headings={headings[idx]} data={data} />;
							})}
						</>
					)}
				</div>
				<div id="graph-window" className="window">
					<Graph rows={ROWS} graph={graph} path={path} visitedNodes={visitedNodes} isEditing={isEditing} />
				</div>
			</div>

			<MediaButtons
				className="footer"
				moveForward={moveForward}
				playPauseToggle={playPauseToggle}
				moveBackward={moveBackward}
				resetAll={resetAll}
				isEditing={isEditing}
				isPlaying={isPlaying}
			/>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;
