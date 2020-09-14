import UnweightedUndirectedGraph from "./UnweightedUndirectedGraph";

class WeightedDirectedGraph extends UnweightedUndirectedGraph {
	addEdge = (node, neighbor, cost) => {
		if (Object.prototype.hasOwnProperty.call(this.adjacencyList, node)) {
			this.adjacencyList[node].push({
				node: neighbor,
				cost
			});
		} else {
			if (!this.nodes.includes(node)) {
				this.nodes.push(node);
			}

			this.adjacencyList[node] = [
				{
					node: neighbor,
					cost
				}
			];
			if (!Object.prototype.hasOwnProperty.call(this.adjacencyList, neighbor)) {
				this.nodes.push(neighbor);
			}
		}
	};

	getEdges = () => {
		const edges = [];
		Object.keys(this.adjacencyList).forEach((node) => {
			this.adjacencyList[node].forEach((neighbor) => {
				edges.push({ from: node, to: neighbor.node, cost: neighbor.cost });
			});
		});
		return edges;
	};
}

export { WeightedDirectedGraph as default };
