import React, { useState, useEffect } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import Graph from "./Graph";
import Table from "./Table";

const generateRandomNumber = (min = 1, max = 10) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const GraphAlgorithmsVisualizerPage = () => {
	const rows = 5;
	const columns = 5;

	const createGraph = () => {
		const graph = [];

		for (let i = 0; i < rows; i += 1) {
			for (let j = 0; j < columns; j += 1) {
				const nodeId = `(${i}, ${j})`;
				const node = {
					data: {
						id: nodeId,
						label: nodeId,
						isStart: i === 0 && j === 0,
						isEnd: i === rows - 1 && j === columns - 1,
						isVisited: false
					}
				};
				graph.push(node);

				const candidateNeighbors = [
					{ x: i, y: j - 1 },
					{ x: i + 1, y: j },
					{ x: i, y: j + 1 },
					{ x: i - 1, y: j }
				];

				candidateNeighbors.forEach((neighbor) => {
					if (neighbor.x >= 0 && neighbor.y >= 0 && neighbor.x < rows && neighbor.y < columns) {
						const neighborId = `(${neighbor.x}, ${neighbor.y})`;
						const edge = {
							data: {
								id: `${nodeId}-${neighborId}`,
								label: nodeId,
								source: nodeId,
								target: neighborId,
								weight: generateRandomNumber()
							}
						};
						graph.push(edge);
					}
				});
			}
		}

		return graph;
	};

	const initialGraph = () => createGraph();
	const [graph, setGraph] = useState(initialGraph);
	const initialAlgorithmResults = () =>
		dijkstraProcess(graph, `(0, 0)`, `(${rows - 1}, ${columns - 1})`);
	const [algorithmGenerator, setAlgorithmGenerator] = useState(initialAlgorithmResults);
	const [path, setPath] = useState([]);
	const [costTableData, setCostTableData] = useState([]);
	const [pathTableData, setPathTableData] = useState([]);
	const [priorityQueueTableData, setPriorityQueueTableData] = useState([]);

	const reset = () => {
		console.log("reset");
	};
	const play = () => {
		console.log("play");
	};

	const back = () => {
		console.log("back");
	};

	const forward = () => {
		const dijkstraState = algorithmGenerator.next();
		console.log("forward -> dijkstraState", dijkstraState);
		if (!dijkstraState.done) {
			const costTableState = dijkstraState.value.costTable;
			const costTableKeys = Object.keys(costTableState);
			const newCostTableBody = [];
			costTableKeys.forEach((key) => {
				newCostTableBody.push([key, costTableState[key]]);
			});
			setCostTableData(newCostTableBody);
			const pathTableState = dijkstraState.value.pathTable;
			const pathTableKeys = Object.keys(pathTableState);
			const newPathTableBody = [];
			pathTableKeys.forEach((key) => {
				newPathTableBody.push([key, pathTableState[key]]);
			});
			setPathTableData(newPathTableBody);
			const { priorityQueue } = dijkstraState.value;
			const newPriorityQueueTableBody = [];
			const visitedNodes = [];
			priorityQueue.forEach((item) => {
				visitedNodes.push(item.node);
				newPriorityQueueTableBody.push([item.node, item.priority]);
			});
			setPriorityQueueTableData(newPriorityQueueTableBody);
			const graphCopy = [...graph];
			for (let i = 0; i < graphCopy.length; i += 1) {
				visitedNodes.forEach((node) => {
					if (graphCopy[i].data.id === node) {
						graphCopy[i].data.isVisited = true;
					}
				});
			}
			setGraph(graphCopy);
		} else if (dijkstraState.value) {
			const { shortestPath } = dijkstraState.value;
			if (shortestPath) {
				const pathWithEdges = [];
				pathWithEdges.push(shortestPath[0]);
				if (shortestPath.length > 1) {
					for (let i = 1; i < shortestPath.length; i += 1) {
						const currentNode = shortestPath[i];
						const previousNode = shortestPath[i - 1];
						const edgeName = `${previousNode}-${currentNode}`;
						pathWithEdges.push(edgeName);
						pathWithEdges.push(currentNode);
					}
				}

				setPath(pathWithEdges);
			}
		}
	};

	return (
		<div className="page">
			<h1>Dijkstra Algorithm</h1>
			<div className="button-container">
				<button className="run-button" onClick={back} type="button">
					{"<-"}
				</button>
				<button className="run-button" onClick={play} type="button">
					Play
				</button>
				<button className="run-button" onClick={forward} type="button">
					{"->"}
				</button>
				<button className="run-button" onClick={reset} type="button">
					Reset
				</button>
			</div>
			<div className="visualizations">
				<Table titles={["Node", "Lowest Cost to Reach Node"]} data={costTableData} />
				<Table titles={["Node", "Reached By"]} data={pathTableData} />
				<Table titles={["Node", "Priority"]} data={priorityQueueTableData} />
				<Graph rows={rows} graph={graph} path={path} />
			</div>
		</div>
	);
};

export default GraphAlgorithmsVisualizerPage;
