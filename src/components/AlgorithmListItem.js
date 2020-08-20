import React from "react";
import { Link } from "react-router-dom";

const AlgorithmListItem = () => (
	<div className="list-item-container">
		<Link to="/graph-algorithms/dijkstra">
			<h3>Dijkstras Algorithm</h3>
			<p>Is Weighted and Guarantees the Shortest Path</p>
		</Link>
		<div className="tag-container">
			<div className="tag tag-directed">Directed</div>
			<div className="tag tag-weighted">Weighted</div>
		</div>
		<button className="btn-si btn-github" type="button">
			View Code on Github
		</button>
	</div>
);

export default AlgorithmListItem;
