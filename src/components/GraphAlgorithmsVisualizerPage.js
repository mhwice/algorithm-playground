import React, { useState, useEffect } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import Graph from "./Graph";
import Table from "./Table";
import generateRandomGraph from "../utils/generateRandomGraph";
import getPathWithEdges from "../utils/getPathWithEdges";

const ROWS = 3;
const COLUMNS = 3;

const GraphAlgorithmsVisualizerPage = () => {
	// ------ State -------

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

	// Holds the data for the tables
	const [costTableData, setCostTableData] = useState([]);
	const [pathTableData, setPathTableData] = useState([]);
	const [priorityQueueTableData, setPriorityQueueTableData] = useState([]);

	// Determines if 'playing' or 'paused'
	const [isActive, setIsActive] = useState(false);

	// A list of all nodes that have been marked as visited
	const [allVisited, setAllVisited] = useState([]);

	// A list of nodes that were marked as visited in the last step
	const [newlyVisited, setNewlyVisited] = useState([]);

	// A list of nodes that need to be marked as unvisited
	const [clearNodes, setClearNodes] = useState([]);

	// History
	const [history, setHistory] = useState([]);

	// Future
	const [future, setFuture] = useState([]);

	// ------- Custom functions -----

	const formatTable = (tableState) => {
		const tableKeys = Object.keys(tableState);
		const tableBody = [];
		tableKeys.forEach((key) => {
			tableBody.push([key, tableState[key]]);
		});
		return tableBody;
	};

	const formatYieldedCostTable = (tableState) => formatTable(tableState);

	const formatYieldedPathTable = (tableState) => formatTable(tableState);

	const formatYieldedPriorityQueue = (tableState) => {
		const newPriorityQueueTableBody = [];
		tableState.forEach((item) => {
			newPriorityQueueTableBody.push([item.node, item.priority]);
		});
		return newPriorityQueueTableBody;
	};

	// Takes a single algorithm step
	const takeStep = () => {
		// ! we have some future so apply that instead of taking a step
		if (future.length > 0) {
			// Get current state
			const current = future[future.length - 1];
			// Remove from future
			setFuture((prev) => prev.splice(0, prev.length - 1));
			// Add to history
			setHistory((prev) => [...prev, current]);

			// Update graph by highlighting items that were just seen for the first time
			console.log("pq", JSON.stringify(current[2], null, 4));
			console.log("allVisited", JSON.stringify(allVisited, null, 4));
			const newItems = [];
			current[2].forEach((item) => {
				if (!allVisited.includes(item[0])) {
					newItems.push(item[0]);
				}
			});
			setNewlyVisited([...newItems]);

			// Update tables
			setCostTableData(current[0]);
			setPathTableData(current[1]);
			setPriorityQueueTableData(current[2]);
		} else {
			const algorithmState = algorithmGenerator.next();
			if (!algorithmState.done) {
				const { costTable, pathTable, priorityQueue } = algorithmState.value;
				setHistory((prev) => {
					return [
						...prev,
						[
							formatYieldedCostTable(costTable),
							formatYieldedPathTable(pathTable),
							formatYieldedPriorityQueue(priorityQueue)
						]
					];
				});

				// Update graph by highlighting items that were just seen for the first time
				const newItems = [];
				priorityQueue.forEach((item) => {
					if (!allVisited.includes(item.node)) {
						newItems.push(item.node);
					}
				});
				setNewlyVisited([...newItems]);

				// Update tables
				setCostTableData(formatYieldedCostTable(costTable));
				setPathTableData(formatYieldedPathTable(pathTable));
				setPriorityQueueTableData(formatYieldedPriorityQueue(priorityQueue));
			} else if (algorithmState.value) {
				// Algorithm is finished -> display shortest path
				const { shortestPath } = algorithmState.value;
				if (shortestPath) {
					setPath(getPathWithEdges(shortestPath));
				}
			}
		}
	};

	// ---- useEffects -----

	// Callback for when newlyVisited is changed -> add newlyVisited nodes to allVisited nodes
	useEffect(() => {
		setAllVisited((prev) => [...prev, ...newlyVisited]);
	}, [newlyVisited]);

	// Callback for when isActive is changed -> if true -> every 1s call takeStep();
	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				takeStep();
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive]);

	// ------- onClick handlers -------

	// onClick handler for reset button - clears the graph and sets all state values back to initial values
	const reset = () => {
		setIsActive(false);
		setClearGraph(allVisited);
		setClearNodes([]);
		setAllVisited([]);
		setCostTableData([]);
		setPathTableData([]);
		setPriorityQueueTableData([]);
		setAlgorithmGenerator(initialAlgorithmResults);
		setHistory([]);
		setFuture([]);
	};

	// onClick handler for back button ->
	// if history is small -> reset everything, else ->
	// remove the last item from history
	const back = () => {
		if (history.length > 1) {
			const len = history.length;
			const current = history[len - 1];
			const previous = history[len - 2];
			setCostTableData(previous[0]);
			setPathTableData(previous[1]);
			setPriorityQueueTableData(previous[2]);
			const currentNodes = current[2].map((item) => item[0]);
			const previousNodes = previous[2].map((item) => item[0]);
			const difference = currentNodes.filter((x) => !previousNodes.includes(x));
			setClearNodes(difference);
			setAllVisited((prev) => prev.filter((x) => !difference.includes(x)));
			// Add current history to future, then remove it from history
			setFuture((prev) => [...prev, current]);
			setHistory((prev) => prev.splice(0, prev.length - 1));
		} else {
			reset();
		}
	};

	// onClick handler for forward button -> takes one algorithm step
	const forward = () => {
		takeStep();
	};

	// onClick handler for play/pause button -> toggles the value of isActive
	const toggle = () => {
		setIsActive(!isActive);
	};

	return (
		<div className="page">
			<h1>Dijkstra Algorithm</h1>
			<div className="button-container">
				<button className="run-button" onClick={back} type="button">
					{"<-"}
				</button>
				<button className="run-button" onClick={toggle} type="button">
					{isActive ? "Pause" : "Play"}
				</button>
				<button className="run-button" onClick={forward} type="button">
					{"->"}
				</button>
				<button className="run-button" onClick={reset} type="button">
					Reset
				</button>
			</div>
			<div className="visualizations">
				<Table title="Cost Table" headings={["Node", "Lowest Cost to Reach Node"]} data={costTableData} />
				<Table title="Path Table" headings={["Node", "Reached By"]} data={pathTableData} />
				<Table title="Priority Queue" headings={["Node", "Priority"]} data={priorityQueueTableData} />
				<Graph
					rows={ROWS}
					graph={graph}
					path={path}
					clearGraph={clearGraph}
					newlyVisited={newlyVisited}
					clearNodes={clearNodes}
				/>
			</div>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;
