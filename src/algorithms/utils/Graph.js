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
class Graph {
	constructor() {
		this.adjacencyList = {};
		this.nodes = [];
	}

	addEdge = (node, neighbor, cost) => {
		if (Object.prototype.hasOwnProperty.call(this.adjacencyList, node)) {
			this.adjacencyList[node].push({
				node: neighbor,
				cost
			});
		} else {
			this.nodes.push(node);
			this.adjacencyList[node] = [
				{
					node: neighbor,
					cost
				}
			];
		}
	};

	getNeighborsOf = (node) => this.adjacencyList[node];
}

export { Graph as default };
