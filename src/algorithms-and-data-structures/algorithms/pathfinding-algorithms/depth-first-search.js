import UnweightedUndirectedGraph from "../../data-structures/graphs/UnweightedUndirectedGraph";
import PathTable from "../../data-structures/tables/PathTable";

const nodeObjectToString = (node) => JSON.stringify(node);

const mapGridToGraph = (grid) => {
	const graph = new UnweightedUndirectedGraph();
	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid[0].length; j += 1) {
			const node = nodeObjectToString({ x: i, y: j });
			const candidateNeighbors = [
				{ x: i, y: j - 1 },
				{ x: i + 1, y: j },
				{ x: i, y: j + 1 },
				{ x: i - 1, y: j }
			];
			candidateNeighbors.forEach((neighbor) => {
				if (typeof grid[neighbor.x] !== "undefined" && typeof grid[neighbor.x][neighbor.y] !== "undefined") {
					graph.addEdge(node, nodeObjectToString(neighbor));
				}
			});
		}
	}
	return graph;
};

const dfs = (graph, currentNode, endNode, pathTable) => {
	// If we have reached the endNode -> stop
	if (currentNode === endNode) {
		return [currentNode];
	}

	// Then find all of the neighbors of the current node that have not yet been visited
	const neighbors = graph.getNeighborsOf(currentNode).filter((neighbor) => !pathTable.hasVisited(neighbor.node));

	// For each neighbor, mark down where you came from, then repeat process.
	for (let i = 0; i < neighbors.length; i += 1) {
		pathTable.updatePath({ from: currentNode, to: neighbors[i].node });
		const path = dfs(graph, neighbors[i].node, endNode, pathTable);
		if (path) {
			return [...path, pathTable.getPreviousNode(path[path.length - 1])];
		}
	}
	return undefined;
};

const depthFirstSearch = (grid, start, end) => {
	const startNode = nodeObjectToString(start);
	const endNode = nodeObjectToString(end);
	const graph = mapGridToGraph(grid);
	const pathTable = new PathTable();
	const path = dfs(graph, startNode, endNode, pathTable);
	return { path };
};

export { depthFirstSearch as default };
