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

const bellmanFord = () => {
	//
};

function* bellmanFordProcess(graph, startNode, endNode) {
	const weightedGraph = mapGraphToWeightedGraph(graph);
	const costTable = new CostTable();
	const pathTable = new PathTable();

	costTable.initializeCosts({ nodes: weightedGraph.nodes, startNode });

	for (let i = 0; i < weightedGraph.nodes.length - 1; i += 1) {
		yield {
			costTable: costTable.table,
			pathTable: pathTable.table
		};

		weightedGraph.nodes.forEach((currentNode) => {
			weightedGraph.getNeighborsOf(currentNode).forEach((neighbor) => {
				const costToGetToCurrentNode = costTable.getCostOf(currentNode);
				const newCostToGetToNeighborNode = costToGetToCurrentNode + neighbor.cost;
				const existingCostToGetToNeighborNode = costTable.getCostOf(neighbor.node);
				if (newCostToGetToNeighborNode < existingCostToGetToNeighborNode) {
					costTable.updateCost({ node: neighbor.node, newCost: newCostToGetToNeighborNode });
					pathTable.updatePath({ from: currentNode, to: neighbor.node });
				}
			});
		});
	}

	const edges = weightedGraph.getEdges();
	for (let i = 0; i < edges.length; i += 1) {
		const edge = edges[i];
		const u = edge.from;
		const v = edge.to;
		const { cost } = edge;
		if (costTable.getCostOf(u) !== Number.MAX_SAFE_INTEGER && costTable.getCostOf(u) + cost < costTable.getCostOf(v)) {
			return { shortestPath: [] };
		}
	}

	const shortestPath = pathTable.getPath({ from: startNode, to: endNode });
	return { shortestPath };
}

export { bellmanFord as default, bellmanFordProcess };
