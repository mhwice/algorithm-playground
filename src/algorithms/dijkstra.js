import Graph from "./utils/Graph";
import PriorityQueue from "./utils/PriorityQueue";
import CostTable from "./utils/CostTable";
import PathTable from "./utils/PathTable";

// const nodeObjectToString = (node) => `(${node.x}, ${node.y})`;

const nodeObjectToString = (node) => JSON.stringify(node);

const createExampleGraph = () => {
	const graph = new Graph();
	graph.addEdge("(0, 0)", "(0, 1)", 2);
	graph.addEdge("(0, 0)", "(1, 0)", 3);
	graph.addEdge("(0, 1)", "(0, 0)", 2);
	graph.addEdge("(0, 1)", "(0, 2)", 7);
	graph.addEdge("(0, 1)", "(1, 1)", 5);
	graph.addEdge("(0, 2)", "(0, 1)", 7);
	graph.addEdge("(0, 2)", "(1, 2)", 1);
	graph.addEdge("(1, 0)", "(0, 0)", 3);
	graph.addEdge("(1, 0)", "(1, 1)", 5);
	graph.addEdge("(1, 0)", "(2, 1)", 6);
	graph.addEdge("(1, 1)", "(0, 1)", 5);
	graph.addEdge("(1, 1)", "(1, 0)", 5);
	graph.addEdge("(1, 1)", "(1, 2)", 9);
	graph.addEdge("(1, 1)", "(2, 1)", 4);
	graph.addEdge("(1, 2)", "(0, 2)", 1);
	graph.addEdge("(1, 2)", "(1, 1)", 9);
	graph.addEdge("(1, 2)", "(2, 2)", 1);
	graph.addEdge("(2, 0)", "(1, 0)", 6);
	graph.addEdge("(2, 0)", "(2, 1)", 1);
	graph.addEdge("(2, 1)", "(1, 1)", 4);
	graph.addEdge("(2, 1)", "(2, 0)", 1);
	graph.addEdge("(2, 1)", "(2, 2)", 6);
	graph.addEdge("(2, 2)", "(1, 2)", 1);
	graph.addEdge("(2, 2)", "(2, 1)", 6);
	return graph;
};

const createExampleGraph2 = () => {
	const graph = new Graph();
	graph.addEdge("(0, 0)", "(0, 1)", 1);
	graph.addEdge("(0, 0)", "(1, 0)", 20);
	graph.addEdge("(0, 1)", "(0, 0)", 1);
	graph.addEdge("(0, 1)", "(0, 2)", 1);
	graph.addEdge("(0, 1)", "(1, 1)", 20);
	graph.addEdge("(0, 2)", "(0, 1)", 1);
	graph.addEdge("(0, 2)", "(1, 2)", 1);
	graph.addEdge("(1, 0)", "(0, 0)", 20);
	graph.addEdge("(1, 0)", "(1, 1)", 20);
	graph.addEdge("(1, 0)", "(2, 1)", 20);
	graph.addEdge("(1, 1)", "(0, 1)", 20);
	graph.addEdge("(1, 1)", "(1, 0)", 20);
	graph.addEdge("(1, 1)", "(1, 2)", 20);
	graph.addEdge("(1, 1)", "(2, 1)", 20);
	graph.addEdge("(1, 2)", "(0, 2)", 1);
	graph.addEdge("(1, 2)", "(1, 1)", 20);
	graph.addEdge("(1, 2)", "(2, 2)", 1);
	graph.addEdge("(2, 0)", "(1, 0)", 20);
	graph.addEdge("(2, 0)", "(2, 1)", 20);
	graph.addEdge("(2, 1)", "(1, 1)", 20);
	graph.addEdge("(2, 1)", "(2, 0)", 20);
	graph.addEdge("(2, 1)", "(2, 2)", 20);
	graph.addEdge("(2, 2)", "(1, 2)", 1);
	graph.addEdge("(2, 2)", "(2, 1)", 20);
	return graph;
};

const mapGridToGraph = (grid) => {
	const graph = new Graph();
	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid[0].length; j += 1) {
			const node = nodeObjectToString({ x: i, y: j });
			const candidateNeighbors = [
				{ x: i, y: j - 1 },
				{ x: i + 1, y: j },
				{ x: i, y: j + 1 },
				{ x: i - 1, y: j }
			];
			candidateNeighbors.forEach((neighbor) => {
				if (
					typeof grid[neighbor.x] !== "undefined" &&
					typeof grid[neighbor.x][neighbor.y] !== "undefined"
				) {
					graph.addEdge(node, nodeObjectToString(neighbor), 1);
				}
			});
		}
	}
	return graph;
};

const dijkstra = (grid, start, end) => {
	const startNode = nodeObjectToString(start);
	const endNode = nodeObjectToString(end);
	const graph = mapGridToGraph(grid);

	const costTable = new CostTable();
	const pathTable = new PathTable();
	const priorityQueue = new PriorityQueue();

	costTable.initializeCosts({ nodes: graph.nodes, startNode });

	priorityQueue.enqueue({ node: startNode, priority: 0 });

	while (!priorityQueue.isEmpty()) {
		const { node: currentNode } = priorityQueue.dequeue();

		if (currentNode === endNode) {
			break;
		}

		const neighbors = graph.getNeighborsOf(currentNode);
		neighbors.forEach((neighbor) => {
			const costFromCurrentNodeToNeighbor = costTable.getCostOf(currentNode) + neighbor.cost;

			if (costFromCurrentNodeToNeighbor < costTable.getCostOf(neighbor.node)) {
				costTable.updateCost({ node: neighbor.node, newCost: costFromCurrentNodeToNeighbor });
				pathTable.updatePath({ from: currentNode, to: neighbor.node });
				priorityQueue.enqueue({ node: neighbor.node, priority: costFromCurrentNodeToNeighbor });
			}
		});
	}

	const path = pathTable.getPath({ from: startNode, to: endNode });
	const cost = costTable.getCostOf(endNode);

	return { path, cost };
};

export default dijkstra;

// const dijkstra = new ShortestPathAlgorithm("dijkstra");
// dijkstra.getShortestPath("A", "B", grid);
// const breadthFirstSearch = new ShortestPathAlgorithm("bfs");
// breadthFirstSearch.getShortestPath("A", "B", grid);
