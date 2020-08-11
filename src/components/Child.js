import React, { useState } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import Graph from "./Graph";
import generateRandomGraph from "../utils/generateRandomGraph";

const ROWS = 30;
const COLUMNS = 30;

function* process() {
	for (let i = 0; i < 10; i += 1) {
		yield i;
	}
}

const Child = () => {
	const initialGraph = () => generateRandomGraph(ROWS, COLUMNS);
	const [graph] = useState(initialGraph);
	const initialAlgorithmResults = () => dijkstraProcess(graph, `(0, 0)`, `(${ROWS - 1}, ${COLUMNS - 1})`);
	const [algorithmGenerator] = useState(initialAlgorithmResults);
	const [path] = useState([]);

	const forward = () => {
		const algorithmState = algorithmGenerator.next();
		console.log("algorithmState", algorithmState);
	};

	return (
		<div className="page">
			<button className="run-button" onClick={forward} type="button">
				{"->"}
			</button>
			<Graph rows={ROWS} graph={graph} path={path} />
		</div>
	);
};

export default Child;
