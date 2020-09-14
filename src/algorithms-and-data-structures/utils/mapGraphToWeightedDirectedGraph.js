import WeightedDirectedGraph from "../data-structures/graphs/WeightedDirectedGraph";

const mapGraphToWeightedDirectedGraph = (graph) => {
	const weightedGraph = new WeightedDirectedGraph();
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

export { mapGraphToWeightedDirectedGraph as default };
