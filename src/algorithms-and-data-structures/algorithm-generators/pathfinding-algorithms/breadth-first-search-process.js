import mapGraphToUnweightedUndirectedGraph from "../../utils/mapGraphToUnweightedUndirectedGraph";
import PathTable from "../../data-structures/tables/PathTable";
import Queue from "../../data-structures/stacks-and-queues/Queue";

function* breadthFirstSearchProcess(grid, start, end) {
	const unweightedUndirectedGraph = mapGraphToUnweightedUndirectedGraph(grid);
	const pathTable = new PathTable();
	const queue = new Queue();
	const visited = [];

	// add start node to queue
	queue.enqueue(start);
	visited.push(start);
	yield { pathTable: pathTable.table, queue: queue.queue, visited };

	while (!queue.isEmpty()) {
		// get element
		const currentNode = queue.dequeue();

		if (currentNode === end) {
			break;
		}

		// add unvisited neighbors to queue
		unweightedUndirectedGraph.getNeighborsOf(currentNode).forEach((neighbor) => {
			// check if already in queue
			if (!visited.includes(neighbor.node)) {
				visited.push(neighbor.node);
				queue.enqueue(neighbor.node);
				pathTable.updatePath({ from: currentNode, to: neighbor.node });
			}
		});

		yield { pathTable: pathTable.table, queue: queue.queue, visited };
	}

	return { shortestPath: pathTable.getPath({ from: start, to: end }) };
}

export { breadthFirstSearchProcess as default };
