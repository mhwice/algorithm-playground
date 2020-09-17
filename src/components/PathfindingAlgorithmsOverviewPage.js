import React from "react";
import { Link } from "react-router-dom";
import OverviewTable from "./OverviewTable";

const headings = ["Algorithm", "When to use"];
const data = [
	[
		"Depth First Search",
		"Undirected and unweighted. When there are many shallow options. Does NOT guarantee the shortest path."
	],
	[
		"Breadth First Search",
		"Undirected and unweighted. When there are only a few deep (or varying depth) options. Guarantees the shortest path."
	],
	["Dijkstras Algorithm", "Weighted and directed path with no negative edges. Guarantees the shortest path."],
	[
		"Bellman Ford Algorithm",
		"Weighted and directed path with negative edges (but not negative cycles). Guarantees the shortest path."
	]
];

const PathfindingAlgorithmsOverviewPage = () => {
	return (
		<>
			<h2 className="overview-title">Pathfinding Algorithms Overview</h2>
			<p className="notice">
				* The space and time complexities of pathfinding algorithms are heavily tied to the data structures used in
				their implementations. Here they have been omitted since the deciding factor in which pathfinding algorithm to
				use typically relies on the nature of the graph, not the time or space to compute.
			</p>
			<div className="algorithm-table-container">
				<OverviewTable headings={headings} data={data} />
			</div>
			<div className="action-button-container">
				<a href="https://github.com/mhwice/algorithm-playground/tree/master/src/algorithms-and-data-structures/algorithms/pathfinding-algorithms">
					<button className="btn-si btn-github" type="button">
						View Code on Github
					</button>
				</a>
				<Link to="/pathfinding-algorithms/visualizer">
					<button className="btn-si btn-pathfinding-algorithm" type="button">
						Visualize Algorithms
					</button>
				</Link>
			</div>
		</>
	);
};
export default PathfindingAlgorithmsOverviewPage;
