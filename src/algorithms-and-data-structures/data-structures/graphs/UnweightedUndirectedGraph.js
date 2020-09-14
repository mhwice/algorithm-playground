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

	getNeighborsOf = (node) => {
		if (this.adjacencyList[node]) {
			return this.adjacencyList[node];
		}
		return [];
	};

	getEdges = () => {
		const edges = [];
		Object.keys(this.adjacencyList).forEach((node) => {
			this.adjacencyList[node].forEach((neighbor) => {
				edges.push({ from: node, to: neighbor.node });
			});
		});
		return edges;
	};
}

export { UnweightedUndirectedGraph as default };
