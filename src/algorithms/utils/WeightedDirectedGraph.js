/*

Format:

edges = {
	A: [
		{ node: B, cost: 2 },
		{ node: D, cost: 3 }
	],
	B: [
		{ node: A, cost: 2 },
		{ node: C, cost: 7 },
		{ node: E, cost: 5 }
	]
}

Usage: 

const graph = new Graph();
graph.addEdge("A", "B", 3);
graph.addEdge("A", D), 2;

*/

import UnweightedDirectedGraph from "./UnweightedDirectedGraph";

class WeightedDirectedGraph extends UnweightedDirectedGraph {
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
