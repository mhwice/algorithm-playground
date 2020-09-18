import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="bg">
			<div className="navigation-container">
				<Link className="link" to="/pathfinding-algorithms">
					Pathfinding Algorithms
				</Link>
				<Link className="link" to="/sorting-algorithms">
					Sorting Algorithms
				</Link>
			</div>
			<div className="title-box">
				<h1 className="title">The Algorithm Playground</h1>
				<p className="subtitle">
					A place to visualize and interact with 9 different pathfinding and sorting algorithms.{" "}
					<a href="https://github.com/mhwice/algorithm-playground/">Source code available on GitHub.</a>
				</p>
			</div>
		</div>
	);
};

export { HomePage as default };
