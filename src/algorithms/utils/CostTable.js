class CostTable {
	constructor() {
		this.table = {};
	}

	initializeCosts = ({ nodes, startNode }) => {
		nodes.forEach((node) => {
			this.table[node] = Infinity;
		});
		this.updateCost({ node: startNode, newCost: 0 });
	};

	updateCost = ({ node, newCost }) => {
		this.table[node] = newCost;
	};

	getCostOf = (node) => this.table[node];

	toString = () => {
		console.log("costTable", JSON.parse(JSON.stringify(this.table)));
	};
}

export { CostTable as default };
