import React from "react";
import { Link } from "react-router-dom";
import AlgorithmListItem from "./AlgorithmListItem";

const GraphAlgorithmsPage = () => (
	<>
		<h2>Graph Algorithms Overview</h2>
		<p>Graph algorithms are designed to compute the shortest path between two nodes on a graph or tree.</p>
		<p>The graph may be weighted or unweighted, directed or undirected</p>

		<AlgorithmListItem
			algorithm="Dijkstra's Algorithm"
			description="Guarantees the shortest path"
			isDirected
			isWeighted
		/>
		<AlgorithmListItem
			algorithm="Depth First Search"
			description="Does not guarantee the shortest path"
			isDirected={false}
			isWeighted={false}
		/>
	</>
);

export default GraphAlgorithmsPage;
