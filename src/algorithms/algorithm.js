import dijkstra, { dijkstraProcess } from "./dijkstra";
import depthFirstSearch, { depthFirstSearchProcess } from "./depth-first-search";

const runAlgorithm = (algorithm, graph, startNode, endNode) => {
	switch (algorithm) {
		case "dijkstra":
			return dijkstra(graph, startNode, endNode);
		case "dfs":
			return depthFirstSearch(graph, startNode, endNode);
		default:
			return [];
	}
};

const getAlgorithmProcess = (algorithm, graph, startNode, endNode) => {
	switch (algorithm) {
		case "dijkstra":
			return dijkstraProcess(graph, startNode, endNode);
		case "dfs":
			return depthFirstSearchProcess(graph, startNode, endNode);
		default:
			return [];
	}
};

export { runAlgorithm as default, getAlgorithmProcess };

/*

From our application, is it possible to run

algorithmGenerator.getNext()

and have formatted values returned....?

*/
