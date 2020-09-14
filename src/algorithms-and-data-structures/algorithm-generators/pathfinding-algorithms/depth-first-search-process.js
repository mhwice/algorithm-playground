import mapGraphToUnweightedUndirectedGraph from "../../utils/mapGraphToUnweightedUndirectedGraph";
import PathTable from "../../data-structures/tables/PathTable";

function* dfsProcess(graph, currentNode, startNode, endNode, pathTable) {
	yield {
		pathTable: pathTable.table
	};

	if (currentNode === endNode) {
		return { shortestPath: [currentNode] };
	}

	const neighbors = graph.getNeighborsOf(currentNode);

	for (let i = 0; i < neighbors.length; i += 1) {
		if (!pathTable.hasVisited(neighbors[i].node)) {
			pathTable.updatePath({ from: currentNode, to: neighbors[i].node });
			const path = yield* dfsProcess(graph, neighbors[i].node, startNode, endNode, pathTable);
			if (path) {
				return { shortestPath: [pathTable.getPreviousNode(path.shortestPath[0]), ...path.shortestPath] };
			}
		}
	}

	if (currentNode === startNode) {
		return { shortestPath: [] };
	}
}

function* depthFirstSearchProcess(graph, start, end) {
	const unweightedUndirectedGraph = mapGraphToUnweightedUndirectedGraph(graph);
	const pathTable = new PathTable();
	return yield* dfsProcess(unweightedUndirectedGraph, start, start, end, pathTable);
}

export { depthFirstSearchProcess as default };
