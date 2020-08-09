import dijkstra from "./dijkstra";
import depthFirstSearch from "./depth-first-search";

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

export { runAlgorithm as default };
