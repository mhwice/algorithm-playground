import React, { useState, useEffect } from "react";
import $ from "jquery";
import PathfindingAlgorithmManager from "../algorithms-and-data-structures/PathfindingAlgorithmManager";
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
import getSettings from "../utils/graph-algorithm-settings";

const ROWS = 3;
const COLUMNS = 3;

const INITIAL_START_NODE = "(0, 0)";
const INITIAL_END_NODE = `(${ROWS - 1}, ${COLUMNS - 1})`;

const INITIAL_ALGORITHM = "4";

const PathfindingAlgorithmsVisualizerPage = () => {
	const initialSettings = getSettings(INITIAL_ALGORITHM);

	const [settings, setSettings] = useState(initialSettings);

	// Graph model
	const initialGraph = () =>
		generateRandomGraph(settings.IS_DIRECTED, settings.IS_WEIGHTED, settings.ALLOWS_NEGATIVE, ROWS, COLUMNS);
	const [graph, setGraph] = useState(initialGraph);

	const [startNode, setStartNode] = useState(INITIAL_START_NODE);
	const [endNode, setEndNode] = useState(INITIAL_END_NODE);

	// Algorithm generator
	const initialAlgorithmResults = () => new PathfindingAlgorithmManager(settings.ALGORITHM, graph, startNode, endNode);
	const [algorithmGenerator, setAlgorithmGenerator] = useState(initialAlgorithmResults);

	// Shortest path
	const [path, setPath] = useState({ path: [], drawPath: false });

	// Determines if 'playing' or 'paused'
	const [isPlaying, setIsPlaying] = useState(false);

	const [isEditing, setIsEditing] = useState(false);

	// A list of nodes that were marked as visited in the last step
	const [visitedNodes, setVisitedNodes] = useState([]);

	// History
	const [history, { redoHistory, undoHistory, canRedoHistory, setHistory, resetHistory }] = useHistory(
		settings.INITIAL_HISTORY
	);

	const [selected, setSelected] = useState(INITIAL_ALGORITHM);

	const [isViewingTable, setIsViewingTable] = useState(false);

	const [isAnimating, setIsAnimating] = useState(false);

	const [disable, setDisable] = useState(false);

	// ================ Steps =============

	useEffect(() => {
		if (isAnimating) {
			setDisable(true);
		} else {
			setDisable(false);
		}
	}, [isAnimating]);

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
				if (shortestPath.length > 0) {
					setIsAnimating(true);
					setPath({ path: shortestPath, drawPath: true });
				}
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
		if (!isAnimating) {
			setIsAnimating(false);
			setIsPlaying(false);
			setVisitedNodes(history.present[0]);
			setPath({ path: [], drawPath: false });
			setAlgorithmGenerator(initialAlgorithmResults);
			resetHistory(settings.INITIAL_HISTORY);
		}
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

	const editGraph = () => {
		if (!isAnimating) {
			resetAll();
			setIsEditing((prev) => !prev);
			if (!isViewingTable && $("#graph-window").hasClass("graph-window")) {
				$("#graph-window").toggleClass("graph-window");
				$("#table-window").toggleClass("table-window");
			} else if (!$("#graph-window").hasClass("graph-window")) {
				$("#graph-window").toggleClass("graph-window");
				$("#table-window").toggleClass("table-window");
			}
		}
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
		setAlgorithmGenerator(new PathfindingAlgorithmManager(settings.ALGORITHM, newGraph, startNode, endNode));
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
			newGraph.push(createEdge(fromNode, toNode, 0, settings.IS_DIRECTED, settings.IS_WEIGHTED));
			setGraph(newGraph);
			setAlgorithmGenerator(new PathfindingAlgorithmManager(settings.ALGORITHM, newGraph, startNode, endNode));
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

				newGraph[id] = createEdge(fromNode, toNode, Number(weight), settings.IS_DIRECTED, settings.IS_WEIGHTED);

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

				newGraph[id] = createEdge(fromNode, toNode, Number(weight), settings.IS_DIRECTED, settings.IS_WEIGHTED);

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
				newGraph[id] = createEdge(fromNode, toNode, Number(weight), settings.IS_DIRECTED, settings.IS_WEIGHTED);
				setGraph(newGraph);
			}
		}
		setAlgorithmGenerator(new PathfindingAlgorithmManager(settings.ALGORITHM, newGraph, startNode, endNode));
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
			setAlgorithmGenerator(new PathfindingAlgorithmManager(settings.ALGORITHM, newGraph, node.data.id, endNode));
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
			setAlgorithmGenerator(new PathfindingAlgorithmManager(settings.ALGORITHM, newGraph, startNode, node.data.id));
		}
	};

	// ===================== SelectBox ==================

	const handleClick = (radio) => {
		const { value } = radio.target;
		if (selected !== value) {
			setSelected(value);
			const newSettings = getSettings(value);
			setSettings(newSettings);
			setStartNode(INITIAL_START_NODE);
			setEndNode(INITIAL_END_NODE);
			setIsPlaying(false);
			setVisitedNodes(history.present[0]);
			setPath({ path: [], drawPath: false });
			resetHistory(newSettings.INITIAL_HISTORY);
			const newGraph = generateRandomGraph(
				newSettings.IS_DIRECTED,
				newSettings.IS_WEIGHTED,
				newSettings.ALLOWS_NEGATIVE,
				ROWS,
				COLUMNS
			);
			setAlgorithmGenerator(
				new PathfindingAlgorithmManager(newSettings.ALGORITHM, newGraph, INITIAL_START_NODE, INITIAL_END_NODE)
			);
			setGraph(newGraph);
		}
	};

	const animationCompletionHandler = () => {
		setIsAnimating(false);
	};

	// ====================== JSX =====================

	return (
		<div className="wrapper">
			<SelectBox
				disable={disable}
				handleClick={handleClick}
				items={["Depth First Search", "Dijkstras Algorithm", "Breadth First Search", "Bellman Ford"]}
			/>
			<div className="content">
				<div className="window-container">
					<div id="table-window" className="window table-window">
						{isEditing ? (
							<Editor
								list={graphToEdgeList(graph)}
								addEdge={addEdgeCallback}
								removeEdge={removeEdgeCallback}
								updateEdge={updateEdgeCallback}
								updateStartNode={updateStartNode}
								updateEndNode={updateEndNode}
								isWeighted={settings.IS_WEIGHTED}
							/>
						) : (
							<>
								{history.present.slice(1).map((data, idx) => {
									return <Table key={idx} title={settings.TITLES[idx]} headings={settings.HEADINGS[idx]} data={data} />;
								})}
							</>
						)}
					</div>
					<div id="graph-window" className="window">
						<Graph
							rows={ROWS}
							graph={graph}
							path={path}
							visitedNodes={visitedNodes}
							isEditing={isEditing}
							animationCompletionHandler={animationCompletionHandler}
						/>
					</div>
				</div>
			</div>

			<MediaButtons
				moveForward={moveForward}
				playPauseToggle={playPauseToggle}
				moveBackward={moveBackward}
				resetAll={resetAll}
				editorToggle={editGraph}
				isEditing={isEditing}
				isPlaying={isPlaying}
				addAdditionalButton
				additionalButtonCallback={() => {
					setIsViewingTable((prev) => !prev);
					$("#graph-window").toggleClass("graph-window");
					$("#table-window").toggleClass("table-window");
				}}
				isViewingTable={isViewingTable}
			/>
		</div>
	);
};

export default PathfindingAlgorithmsVisualizerPage;
