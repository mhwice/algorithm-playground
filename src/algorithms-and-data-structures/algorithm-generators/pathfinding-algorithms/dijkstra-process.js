import mapGraphToWeightedDirectedGraph from "../../utils/mapGraphToWeightedDirectedGraph";
import PriorityQueue from "../../data-structures/stacks-and-queues/PriorityQueue";
import CostTable from "../../data-structures/tables/CostTable";
import PathTable from "../../data-structures/tables/PathTable";

function* dijkstraProcess(graph, startNode, endNode) {
	const weightedGraph = mapGraphToWeightedDirectedGraph(graph);
	const costTable = new CostTable();
	const pathTable = new PathTable();
	const priorityQueue = new PriorityQueue();

	costTable.initializeCosts({ nodes: weightedGraph.nodes, startNode });

	priorityQueue.enqueue({ node: startNode, priority: 0 });

	while (!priorityQueue.isEmpty()) {
		yield {
			costTable: costTable.table,
			pathTable: pathTable.table,
			priorityQueue: priorityQueue.queue
		};

		const { node: currentNode } = priorityQueue.dequeue();

		if (currentNode === endNode) {
			break;
		}

		const neighbors = weightedGraph.getNeighborsOf(currentNode);

		neighbors.forEach((neighbor) => {
			const costFromCurrentNodeToNeighbor = costTable.getCostOf(currentNode) + neighbor.cost;

			if (costFromCurrentNodeToNeighbor < costTable.getCostOf(neighbor.node)) {
				costTable.updateCost({ node: neighbor.node, newCost: costFromCurrentNodeToNeighbor });
				pathTable.updatePath({ from: currentNode, to: neighbor.node });
				priorityQueue.enqueue({ node: neighbor.node, priority: costFromCurrentNodeToNeighbor });
			}
		});
	}

	const shortestPath = pathTable.getPath({ from: startNode, to: endNode });
	const cost = costTable.getCostOf(endNode);

	return { shortestPath, cost };
}

export { dijkstraProcess as default };
