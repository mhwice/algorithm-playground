import dijkstra from "./dijkstra";
import depthFirstSearch from "./depth-first-search";

const runAlgorithm = (algorithm, grid, start, end) => {
	switch (algorithm) {
		case "dijkstra":
			return dijkstra(grid, start, end);
		case "dfs":
			return depthFirstSearch(grid, start, end);
		default:
			return [];
	}
};

export { runAlgorithm as default };
