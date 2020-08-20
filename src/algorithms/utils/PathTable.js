class PathTable {
	constructor() {
		this.table = {};
	}

	updatePath = ({ from: fromNode, to: toNode }) => {
		this.table[toNode] = fromNode;
	};

	getPreviousNode = (node) => this.table[node];

	getPath = ({ from: startNode, to: endNode }) => {
		const path = [endNode];
		let lastStep = endNode;

		while (lastStep !== startNode) {
			path.unshift(this.getPreviousNode(lastStep));
			lastStep = this.getPreviousNode(lastStep);
			if (lastStep === undefined) {
				return undefined;
			}
		}

		return path;
	};

	hasVisited = (node) => {
		if (Object.values(this.table).indexOf(node) > -1) {
			return true;
		}
		return false;
	};

	toString = () => {
		console.log("pathTable", JSON.parse(JSON.stringify(this.table)));
	};
}

export { PathTable as default };
