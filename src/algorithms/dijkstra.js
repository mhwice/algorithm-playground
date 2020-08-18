import { node } from "prop-types";
import WeightedGraph from "./utils/WeightedDirectedGraph";
import PriorityQueue from "./utils/PriorityQueue";
import CostTable from "./utils/CostTable";
import PathTable from "./utils/PathTable";

const mapGraphToWeightedGraph = (graph) => {
	const weightedGraph = new WeightedGraph();
	graph.forEach((item) => {
		if (
			Object.prototype.hasOwnProperty.call(item.data, "source") &&
			Object.prototype.hasOwnProperty.call(item.data, "target") &&
			Object.prototype.hasOwnProperty.call(item.data, "weight")
		) {
			const sourceNode = item.data.source;
			const targetNode = item.data.target;
			const { weight } = item.data;
			weightedGraph.addEdge(sourceNode, targetNode, weight);
		}
	});
	return weightedGraph;
};

function* dijkstraProcess(graph, startNode, endNode) {
	const weightedGraph = mapGraphToWeightedGraph(graph);
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

const dijkstra = (graph, startNode, endNode) => {
	const weightedGraph = mapGraphToWeightedGraph(graph);
	const costTable = new CostTable();
	const pathTable = new PathTable();
	const priorityQueue = new PriorityQueue();

	costTable.initializeCosts({ nodes: weightedGraph.nodes, startNode });

	priorityQueue.enqueue({ node: startNode, priority: 0 });

	while (!priorityQueue.isEmpty()) {
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

	const path = pathTable.getPath({ from: startNode, to: endNode });
	const cost = costTable.getCostOf(endNode);

	return { path, cost };
};

export { dijkstra as default, dijkstraProcess };
