import UnweightedUndirectedGraph from "../data-structures/graphs/UnweightedUndirectedGraph";

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

export { mapGraphToUnweightedUndirectedGraph as default };
