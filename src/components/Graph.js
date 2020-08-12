import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CytoscapeComponent from "react-cytoscapejs";

const Graph = ({ rows, graph: elements, path, clearGraph, newlyVisited, clearNodes, clearPath }) => {
	const [cyRef, setCyRef] = useState({});

	// Adds the visited class to any nodes that have been seen for the first time
	useEffect(() => {
		newlyVisited.forEach((node) => {
			if (!cyRef.$id(node).hasClass("visited")) {
				cyRef.$id(node).addClass("visited");
			}
		});
	}, [newlyVisited]);

	useEffect(() => {
		clearNodes.forEach((node) => {
			if (cyRef.$id(node).hasClass("visited")) {
				cyRef.$id(node).removeClass("visited");
			}
		});
	}, [clearNodes]);

	// Animates the path
	useEffect(() => {
		let i = 0;
		path.forEach((item) => {
			cyRef
				.$id(item)
				.animate(
					{
						style: {
							"background-color": "#61bffc",
							"line-color": "#61bffc",
							"target-arrow-color": "#61bffc"
						}
					},
					{
						duration: 250,
						queue: true
					}
				)
				.delay(i * 500);
			i += 1;
		});
	}, [path]);

	// Clears the graph
	useEffect(() => {
		const stopAnimations = () => {
			if (clearGraph.length > 0) {
				cyRef.nodes().stop(true);
				cyRef.edges().stop(true);
				cyRef.nodes().removeStyle();
				cyRef.edges().removeStyle();
				cyRef.$(".visited").removeClass("visited");
			}
		};

		stopAnimations();
	}, [clearGraph]);

	useEffect(() => {
		const erasePath = () => {
			if (clearPath.length > 0) {
				cyRef.nodes().stop(true);
				cyRef.edges().stop(true);
				cyRef.nodes().removeStyle();
				cyRef.edges().removeStyle();
			}
		};

		erasePath();
	}, [clearPath]);

	const style = [
		{
			selector: "core",
			style: {
				"active-bg-size": 0
			}
		},
		{
			selector: "node, edge",
			style: {
				"overlay-opacity": 0
			}
		},
		{
			selector: "node",
			style: {
				"background-color": "pink",
				label: "data(id)",
				"text-valign": "top",
				"text-halign": "left"
			}
		},
		{
			selector: "edge",
			style: {
				width: 3,
				label: "data(weight)",
				"line-color": "#ccc",
				"curve-style": "bezier",
				"target-arrow-shape": "triangle"
			}
		},
		{
			selector: ".visited",
			style: {
				"background-color": "blue",
				"line-color": "blue",
				"target-arrow-color": "blue",
				"transition-property": "background-color, line-color, target-arrow-color",
				"transition-duration": "0s"
			}
		},
		{
			selector: "node[?isStart]",
			style: {
				"border-color": "#248E00",
				"border-width": 5,
				"border-opacity": 1
			}
		},
		{
			selector: "node[?isEnd]",
			style: {
				"border-color": "#8E0000",
				"border-width": 5,
				"border-opacity": 1
			}
		}
	];
	const layout = {
		name: "grid",
		rows
	};

	const cyStyle = {
		height: "100%",
		width: "100%"
	};

	return (
		<div className="graph-container">
			<CytoscapeComponent
				cy={(cy) => {
					setCyRef(cy);
				}}
				elements={elements}
				style={cyStyle}
				stylesheet={style}
				layout={layout}
			/>
		</div>
	);
};

Graph.defaultProps = {
	rows: 1,
	graph: [],
	path: [],
	clearGraph: [],
	newlyVisited: [],
	clearNodes: [],
	clearPath: []
};

Graph.propTypes = {
	rows: PropTypes.number,
	graph: PropTypes.arrayOf(PropTypes.object),
	path: PropTypes.arrayOf(PropTypes.string),
	clearGraph: PropTypes.arrayOf(PropTypes.string),
	newlyVisited: PropTypes.arrayOf(PropTypes.string),
	clearNodes: PropTypes.arrayOf(PropTypes.string),
	clearPath: PropTypes.arrayOf(PropTypes.string)
};

export default Graph;
