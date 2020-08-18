import { depthFirstSearchProcess } from "../algorithms/depth-first-search";
import generateRandomGraph from "../utils/generateRandomGraph";

const ROWS = 2;
const COLUMNS = 2;
const IS_WEIGHTED = false;
const IS_DIRECTED = false;
const graph = generateRandomGraph(IS_DIRECTED, IS_WEIGHTED, ROWS, COLUMNS);
const process = depthFirstSearchProcess(graph, `(0, 0)`, `(${ROWS - 1}, ${COLUMNS - 1})`);

while (true) {
	const next = process.next();
	if (next.done) {
		console.log("return", JSON.stringify(next.value, null, 2));
		break;
	}
	console.log("yield", JSON.stringify(next.value, null, 2));
}
