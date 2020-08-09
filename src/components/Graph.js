import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";

const Graph = ({ rows, graph: elements, path }) => {
	const container = document.getElementById("cy");
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
				"background-color": "#666",
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
			selector: "node[?isVisited]",
			style: {
				"background-color": "#F7B500"
			}
		},
		{
			selector: ".highlighted",
			style: {
				"background-color": "#61bffc",
				"line-color": "#61bffc",
				"target-arrow-color": "#61bffc",
				"transition-property": "background-color, line-color, target-arrow-color",
				"transition-duration": "0.5s"
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
	// useEffect(() => {
	// 	const container = document.getElementById("cy");
	// 	const style = [
	// 		{
	// 			selector: "core",
	// 			style: {
	// 				"active-bg-size": 0
	// 			}
	// 		},
	// 		{
	// 			selector: "node, edge",
	// 			style: {
	// 				"overlay-opacity": 0
	// 			}
	// 		},
	// 		{
	// 			selector: "node",
	// 			style: {
	// 				"background-color": "#666",
	// 				label: "data(id)",
	// 				"text-valign": "top",
	// 				"text-halign": "left"
	// 			}
	// 		},
	// 		{
	// 			selector: "edge",
	// 			style: {
	// 				width: 3,
	// 				label: "data(weight)",
	// 				"line-color": "#ccc",
	// 				"curve-style": "bezier",
	// 				"target-arrow-shape": "triangle"
	// 			}
	// 		},
	// 		{
	// 			selector: "node[?isVisited]",
	// 			style: {
	// 				"background-color": "#61bffc"
	// 			}
	// 		},
	// 		{
	// 			selector: ".highlighted",
	// 			style: {
	// 				"background-color": "#F7B500",
	// 				"line-color": "#61bffc",
	// 				"target-arrow-color": "#61bffc",
	// 				"transition-property": "background-color, line-color, target-arrow-color",
	// 				"transition-duration": "0.5s"
	// 			}
	// 		},
	// 		{
	// 			selector: "node[?isStart]",
	// 			style: {
	// 				"border-color": "#248E00",
	// 				"border-width": 5,
	// 				"border-opacity": 1
	// 			}
	// 		},
	// 		{
	// 			selector: "node[?isEnd]",
	// 			style: {
	// 				"border-color": "#8E0000",
	// 				"border-width": 5,
	// 				"border-opacity": 1
	// 			}
	// 		}
	// 	];
	// 	const layout = {
	// 		name: "grid",
	// 		rows
	// 	};

	// 	const cy = cytoscape({
	// 		container,
	// 		elements,
	// 		style,
	// 		layout
	// 	});

	// 	cy.autoungrabify(true);
	// 	cy.autounselectify(true);
	// 	cy.autolock(true);
	// 	cy.boxSelectionEnabled(false);
	// 	cy.panningEnabled(false);
	// 	cy.zoomingEnabled(false);

	// 	let i = 0;
	// 	const highlight = () => {
	// 		if (i < path.length) {
	// 			cy.$id(path[i]).addClass("highlighted");

	// 			i += 1;
	// 			setTimeout(highlight, 1000);
	// 		}
	// 	};

	// 	highlight();
	// }, [elements, path]);

	const cyStyle = {
		height: "100%",
		width: "100%"
	};

	return (
		<div className="graph-container">
			{/* <div id="cy" style={cyStyle} /> */}
			<CytoscapeComponent
				cy={(cy) => {
					let i = 0;
					const highlight = () => {
						if (i < path.length) {
							cy.$id(path[i]).addClass("highlighted");

							i += 1;
							setTimeout(highlight, 1000);
						}
					};

					highlight();
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
	path: []
};

Graph.propTypes = {
	rows: PropTypes.number,
	graph: PropTypes.arrayOf(PropTypes.object),
	path: PropTypes.arrayOf(PropTypes.string)
};

export default Graph;
