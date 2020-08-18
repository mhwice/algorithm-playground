const generateRandomNumber = (min = 1, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);

const generateRandomGraph = (isDirected, isWeighted, rows, columns) => {
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
								weight: generateRandomNumber(),
								isDirected
							}
						};
					} else {
						edge = {
							data: {
								id: `${nodeId}-${neighborId}`,
								source: nodeId,
								target: neighborId,
								isDirected
							}
						};
					}
					graph.push(edge);
				}
			});
		}
	}

	return graph;
};

export { generateRandomGraph as default };

// const generateRandomGraph = (isDirected, isWeighted, rows, columns) => {}
// if (!isDirected) -> 1 edge connecting nodes only! Does having 2 edges vs 1 matter?
// if (!isWeighted) -> remove weight property!
