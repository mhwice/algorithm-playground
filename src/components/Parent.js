import React, { useState } from "react";
import { dijkstraProcess } from "../algorithms/dijkstra";
import generateRandomGraph from "../utils/generateRandomGraph";

const ROWS = 30;
const COLUMNS = 30;

const Parent = () => {
	const initialGraph = () => generateRandomGraph(ROWS, COLUMNS);
	const [graph] = useState(initialGraph);
	const initialAlgorithmResults = () => dijkstraProcess(graph, `(0, 0)`, `(${ROWS - 1}, ${COLUMNS - 1})`);
	const [generator] = useState(initialAlgorithmResults);

	const buttonClicked = () => {
		const current = generator.next();
		console.log(current);
	};

	return (
		<div>
			<button onClick={buttonClicked} type="button">
				Click me
			</button>
		</div>
	);
};

export default Parent;
