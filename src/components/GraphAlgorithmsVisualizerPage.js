import React, { useState } from "react";
import AlgorithmManager from "../algorithms/AlgorithmManager";
import Graph from "./Graph";
import Table from "./Table";
import Editor from "./Editor";
import generateRandomGraph from "../utils/generateRandomGraph";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";

const ROWS = 2;
const COLUMNS = 2;

const INITIAL_START_NODE = "(0, 0)";
const INITIAL_END_NODE = `(${ROWS - 1}, ${COLUMNS - 1})`;

const IS_WEIGHTED = true;
const IS_DIRECTED = true;
const ALGORITHM = "dijkstra";
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
		} else if (algorithmState.value) {
			const { shortestPath } = algorithmState.value;
			if (shortestPath) {
				// make sure a path was found
				setIsPlaying(false);
				setPath({ path: shortestPath, drawPath: true });
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
	}, 1000);

	// ======================= editor ======================

	const editGraph = () => {
		setIsEditing((prev) => !prev);
	};

	const graphToEdgeList = (graphList) => {
		const edges = [];
		const nodes = [];
		for (let i = 0; i < graphList.length; i += 1) {
			const { data } = graphList[i];
			if (data.source !== undefined && data.target !== undefined) {
				edges.push({ originalIndex: i, ...data });
			} else {
				nodes.push({ originalIndex: i, ...data });
			}
		}
		return { edges, nodes };
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
		const index = val.id;
		const node = graph[index];
		if (!node.data.isStart && !node.data.isEnd) {
			const newGraph = [...graph];
			newGraph.forEach((item) => {
				if (item.data.isStart) {
					item.data.isStart = false;
				}
			});
			newGraph[index].data.isStart = true;
			setGraph(newGraph);
		}

		setStartNode(node.data.id);
		setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, graph, node.data.id, endNode));
	};

	const updateEndNode = (val) => {
		const index = val.id;
		const node = graph[index];
		if (!node.data.isStart && !node.data.isEnd) {
			const newGraph = [...graph];
			newGraph.forEach((item) => {
				if (item.data.isEnd) {
					item.data.isEnd = false;
				}
			});
			newGraph[index].data.isEnd = true;
			setGraph(newGraph);
		}

		setEndNode(node.data.id);
		setAlgorithmGenerator(new AlgorithmManager(ALGORITHM, graph, startNode, node.data.id));
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
							startNode={INITIAL_START_NODE}
							endNode={INITIAL_END_NODE}
							updateStartNode={updateStartNode}
							updateEndNode={updateEndNode}
						/>
					) : (
						<>
							{history.present.slice(1).map((data, idx) => {
								return <Table key={idx} title={titles[idx]} headings={headings[idx]} data={data} />;
							})}
						</>
					)}
				</div>
				<div className="window">
					<Graph rows={ROWS} graph={graph} path={path} visitedNodes={visitedNodes} />
				</div>
			</div>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;
