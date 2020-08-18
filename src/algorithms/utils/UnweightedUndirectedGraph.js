class UnweightedUndirectedGraph {
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

export { UnweightedUndirectedGraph as default };
