import { dijkstraProcess } from "./dijkstra";
import { depthFirstSearchProcess } from "./depth-first-search";
import { objectToArray, arrayOfObjectsToArrayOfArrays } from "../utils/arrayManipulators";
import getPathWithEdges from "../utils/getPathWithEdges";

class AlgorithmManager {
	constructor(algorithm, graph, startNode, endNode) {
		switch (algorithm) {
			case "dijkstra": {
				this.algorithm = "dijkstra";
				this.process = dijkstraProcess(graph, startNode, endNode);
				break;
			}
			case "dfs": {
				this.algorithm = "dfs";
				this.process = depthFirstSearchProcess(graph, startNode, endNode);
				break;
			}
			default:
		}
	}

	// I can format the algorithm output here
	next() {
		const iterable = this.process.next();
		if (this.algorithm === "dijkstra") {
			if (!iterable.done) {
				const { costTable, pathTable, priorityQueue } = iterable.value;
				const result = {
					done: iterable.done,
					value: [objectToArray(pathTable), objectToArray(costTable), arrayOfObjectsToArrayOfArrays(priorityQueue)]
				};
				return result;
			}
			const { shortestPath } = iterable.value;
			const result = {
				done: iterable.done,
				value: {
					shortestPath: getPathWithEdges(shortestPath)
				}
			};
			return result;
		}
		if (this.algorithm === "dfs") {
			if (!iterable.done) {
				const { pathTable } = iterable.value;
				const result = {
					done: iterable.done,
					value: [objectToArray(pathTable)]
				};
				return result;
			}
			if (iterable.value) {
				const path = iterable.value;
				const result = {
					done: iterable.done,
					value: {
						shortestPath: getPathWithEdges(path)
					}
				};
				return result;
			}
		}
		return "not found";
	}
}

export { AlgorithmManager as default };
