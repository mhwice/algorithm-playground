import React from "react";
import { Link } from "react-router-dom";

const GraphAlgorithmsPage = () => (
	<>
		<h2>Graph Algorithms Overview</h2>
		<p>
			Graph algorithms are designed to compute the shortest path between two nodes on a graph or
			tree.
		</p>
		<p>The graph may be weighted or unweighted, directed or undirected</p>
		<ul>
			<li>
				<Link to="/graph-algorithms/dijkstra">Dijkstras Algorithm • Weighted • Undirected</Link>
			</li>
			<li>
				<Link to="/graph-algorithms/depth-first-search">
					Depth First Search • Unweighted • Undirected
				</Link>
			</li>
			<li>
				<Link to="/graph-algorithms/bfs">Breadth First Search • Unweighted • Undirected</Link>
			</li>
		</ul>
	</>
);

export default GraphAlgorithmsPage;
