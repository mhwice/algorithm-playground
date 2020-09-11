import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="bg">
			<div className="navigation-container">
				<Link className="link" to="/graph-algorithms">
					Graph Algorithms
				</Link>
				<Link className="link" to="/sorting-algorithms">
					Sorting Algorithms
				</Link>
			</div>
			<div className="title-box">
				<h1 className="title">The Algorithm Playground</h1>
				<p>A place to visualize and interact with data structures and algorithms</p>
			</div>
		</div>
	);
};

export { HomePage as default };

// <div>
// 			<h1>Interactive Data Structures & Algorithms</h1>
// <img className="hero-image" src="/images/wave.png" alt="wave" />
// 			<ul>
// 				<li>
// 					<Link to="/sorting-algorithms">Sorting Algorithms</Link>
// 				</li>
// 				<li>
// 					<Link to="/graph-algorithms">Graph Algorithms</Link>
// 				</li>
// 				<li>
// 					<Link to="/data-structures">Data Structures</Link>
// 				</li>
// 			</ul>
// 		</div>
