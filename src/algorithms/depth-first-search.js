import UnweightedUndirectedGraph from "./utils/UnweightedUndirectedGraph";
import PathTable from "./utils/PathTable";

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

// ! THIS IS WRONG!
const mapGraphToUnweightedUndirectedGraph = (graph) => {
	const unweightedGraph = new UnweightedUndirectedGraph();
	graph.forEach((item) => {
		if (
			Object.prototype.hasOwnProperty.call(item.data, "source") &&
			Object.prototype.hasOwnProperty.call(item.data, "target")
		) {
			const sourceNode = item.data.source;
			const targetNode = item.data.target;

			unweightedGraph.addEdge(sourceNode, targetNode);
			unweightedGraph.addEdge(targetNode, sourceNode);
		}
	});
	return unweightedGraph;
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

// =======================================================================

function* dfsProcess(graph, currentNode, endNode, pathTable) {
	yield {
		pathTable: pathTable.table
	};

	// console.log("currentNode", JSON.stringify(currentNode, null, 2));

	if (currentNode === endNode) {
		return [currentNode];
	}

	const neighbors = graph.getNeighborsOf(currentNode).filter((neighbor) => !pathTable.hasVisited(neighbor.node));
	// console.log("neighbors", JSON.stringify(graph.getNeighborsOf(currentNode), null, 2));
	// console.log("neighbors", JSON.stringify(neighbors, null, 2));

	for (let i = 0; i < neighbors.length; i += 1) {
		pathTable.updatePath({ from: currentNode, to: neighbors[i].node });
		const path = yield* dfsProcess(graph, neighbors[i].node, endNode, pathTable);
		// console.log("path", JSON.stringify(path, null, 2));
		return [pathTable.getPreviousNode(path[0]), ...path];
	}
}

function* depthFirstSearchProcess(graph, start, end) {
	console.log("graph", JSON.stringify(graph, null, 2));
	const unweightedUndirectedGraph = mapGraphToUnweightedUndirectedGraph(graph);
	console.log("unweightedUndirectedGraph", JSON.stringify(unweightedUndirectedGraph, null, 2));
	const pathTable = new PathTable();
	return yield* dfsProcess(unweightedUndirectedGraph, start, end, pathTable);
}

export { depthFirstSearch as default, depthFirstSearchProcess };
