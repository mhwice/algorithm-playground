import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";

cytoscape.use(cola);

const Graph = ({ rows, graph: elements, path, visitedNodes }) => {
	const [cyRef, setCyRef] = useState({});

	useEffect(() => {
		try {
			cyRef.reset();
			const newLayout = cyRef.layout({ name: "cola", padding: 20 });
			newLayout.run();
		} catch (err) {
			console.log("no problem");
		}
	}, [elements, cyRef, rows]);

	// Toggles visited status of nodes
	useEffect(() => {
		visitedNodes.forEach((node) => {
			cyRef.$id(node).toggleClass("visited");
		});
	}, [visitedNodes, cyRef]);

	// Animates the path
	useEffect(() => {
		if (path.drawPath) {
			let i = 0;
			path.path.forEach((item) => {
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
							duration: 100,
							queue: true,
							complete() {
								console.log("Animation complete");
							}
						}
					)
					.delay(i * 100);
				i += 1;
			});
		} else {
			try {
				cyRef.nodes().removeStyle();
				cyRef.edges().removeStyle();
			} catch (err) {
				console.log("no problem");
			}
		}
	}, [path, cyRef]);

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
				"background-color": "white",
				label: "data(id)",
				"text-valign": "top",
				"text-halign": "left",
				"border-color": "#C1C6CC",
				"border-width": 5,
				"border-opacity": 1
			}
		},
		{
			selector: "edge",
			style: {
				width: 3,
				"line-color": "#C1C6CC",
				"curve-style": "haystack",
				"target-arrow-shape": "none",
				"target-arrow-color": "#C1C6CC"
			}
		},
		{
			selector: "edge[weight]",
			style: {
				label: "data(weight)"
			}
		},
		{
			selector: "edge[?isDirected]",
			style: {
				"curve-style": "bezier",
				"target-arrow-shape": "triangle"
			}
		},
		{
			selector: ".visited",
			style: {
				"background-color": "#D596FF",
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
	path: { path: [], draw: false },
	visitedNodes: []
};

Graph.propTypes = {
	rows: PropTypes.number,
	graph: PropTypes.arrayOf(PropTypes.object),
	path: PropTypes.objectOf(PropTypes.any),
	visitedNodes: PropTypes.arrayOf(PropTypes.string)
};

export default Graph;
