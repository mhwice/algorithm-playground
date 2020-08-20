const getPathWithEdges = (path, graph) => {
	if (!path) {
		return path;
	}

	if (path.length < 2) {
		return path;
	}
	const pathWithEdges = [];
	pathWithEdges.push(path[0]);
	for (let i = 1; i < path.length; i += 1) {
		const currentNode = path[i];
		const previousNode = path[i - 1];
		const edge = `${previousNode}-${currentNode}`;

		if (graph) {
			if (graph.filter((item) => item.data.id === edge).length === 1) {
				pathWithEdges.push(edge);
			} else {
				pathWithEdges.push(`${currentNode}-${previousNode}`);
			}
		} else {
			pathWithEdges.push(edge);
		}

		pathWithEdges.push(currentNode);
	}
	return pathWithEdges;
};

export { getPathWithEdges as default };
