import UnweightedUndirectedGraph from "./utils/UnweightedUndirectedGraph";
import PathTable from "./utils/PathTable";
import Queue from "./utils/Queue";

const bfs = (grid, start, end) => {
	//
};

const nodeObjectToString = (node) => JSON.stringify(node);

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

export { bfs as default, breadthFirstSearchProcess };
