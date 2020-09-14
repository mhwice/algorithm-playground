const generateRandomNumber = (min = 1, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomUnboundedNumber = (min = -5, max = 20) => {
	const val = Math.floor(Math.random() * (max - min + 1) + min);
	return val;
};

const graphToEdgeList = (graphList) => {
	const edges = [];
	const nodes = [];
	for (let i = 0; i < graphList.length; i += 1) {
		const { data } = graphList[i];
		if (data.source !== undefined && data.target !== undefined) {
			edges.push(graphList[i]);
		} else {
			nodes.push(graphList[i]);
		}
	}
	return { edges, nodes };
};

function filterOut(src) {
	const found = new Set();
	return src.filter((item) => {
		const { data } = item;
		const result = found.has(`source:${data.source}, target:${data.target}`);
		found.add(`source:${data.source}, target:${data.target}`);
		found.add(`source:${data.target}, target:${data.source}`);
		return !result;
	});
}

const filterGraph = (graph) => {
	const { edges, nodes } = graphToEdgeList(graph);
	const uniqueEdges = filterOut(edges);
	return [...nodes, ...uniqueEdges];
};

const generateRandomGraph = (isDirected, isWeighted, allowsNegative, rows, columns) => {
	const graph = [];

	for (let i = 0; i < rows; i += 1) {
		for (let j = 0; j < columns; j += 1) {
			const nodeId = `(${i}, ${j})`;
			const node = {
				data: {
					id: nodeId,
					label: nodeId,
					isStart: i === 0 && j === 0,
					isEnd: i === rows - 1 && j === columns - 1
				}
			};
			graph.push(node);

			const candidateNeighbors = [
				{ x: i, y: j - 1 },
				{ x: i + 1, y: j },
				{ x: i, y: j + 1 },
				{ x: i - 1, y: j }
			];

			candidateNeighbors.forEach((neighbor) => {
				if (neighbor.x >= 0 && neighbor.y >= 0 && neighbor.x < rows && neighbor.y < columns) {
					const neighborId = `(${neighbor.x}, ${neighbor.y})`;

					let edge;
					if (isWeighted) {
						edge = {
							data: {
								id: `${nodeId}-${neighborId}`,
								label: nodeId,
								source: nodeId,
								target: neighborId,
								weight: allowsNegative ? generateRandomUnboundedNumber() : generateRandomNumber(),
								isDirected
							}
						};
					} else {
						edge = {
							data: {
								id: `${nodeId}-${neighborId}`,
								source: nodeId,
								target: neighborId,
								weight: undefined,
								isDirected
							}
						};
					}
					graph.push(edge);
				}
			});
		}
	}

	if (!isDirected) {
		return filterGraph(graph);
	}

	return graph;
};

export { generateRandomGraph as default };
