/*

Format:

edges = {
	A: [
		{ node: B },
		{ node: D }
	],
	B: [
		{ node: A },
		{ node: C },
		{ node: E }
	]
}

edges = {
	A: [
		B,
		D
	],
	B: [
		A,
		C,
		E
	]
}

Usage: 

const graph = new Graph();
graph.addEdge("A", "B", 3);
graph.addEdge("A", D), 2;

*/
class UnweightedGraph {
	constructor() {
		this.adjacencyList = {};
		this.nodes = [];
	}

	addEdge = (node, neighbor) => {
		if (Object.prototype.hasOwnProperty.call(this.adjacencyList, node)) {
			this.adjacencyList[node].push({ node: neighbor });
		} else {
			this.nodes.push(node);
			this.adjacencyList[node] = [{ node: neighbor }];
		}
	};

	getNeighborsOf = (node) => this.adjacencyList[node];
}

export { UnweightedGraph as default };
