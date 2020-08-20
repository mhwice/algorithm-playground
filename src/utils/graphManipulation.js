const createEdge = (source, target, weight, isDirected, isWeighted) => {
	if (isWeighted) {
		return {
			data: {
				id: `${source}-${target}`,
				label: `${source}-${target}`,
				source,
				target,
				weight,
				isDirected
			}
		};
	}
	return {
		data: {
			id: `${source}-${target}`,
			source,
			target,
			isDirected
		}
	};
};

const createNode = (node, isStart, isEnd) => {
	return {
		data: {
			id: node,
			label: node,
			isStart,
			isEnd
		}
	};
};

const graphToEdgeList = (graphList) => {
	const edges = [];
	const nodes = [];
	for (let i = 0; i < graphList.length; i += 1) {
		const { data } = graphList[i];
		if (data.source !== undefined && data.target !== undefined) {
			edges.push({ originalIndex: i, ...data });
		} else {
			nodes.push({ originalIndex: i, ...data });
		}
	}
	return { edges, nodes };
};

const nodeNameIsValid = (node) => node.length > 0 && node.length < 7;

const isNodeInGraph = (graph, node) => graph.filter((item) => item.data.id === node).length > 0;

const isEdgeInGraph = (graph, source, target) =>
	graph.filter((item) => item.data.source === source && item.data.target === target).length > 0;

const isNodeUsed = (graph, node) =>
	graph.filter((item) => item.data.source === node || item.data.target === node).length > 0;

const removeNode = (graph, node) => graph.filter((item) => item.data.id !== node);

const isWeightValid = (weight) => weight.match(/^\d{1,3}$/);

export {
	graphToEdgeList,
	nodeNameIsValid,
	createEdge,
	createNode,
	isNodeInGraph,
	isEdgeInGraph,
	isNodeUsed,
	removeNode,
	isWeightValid
};
