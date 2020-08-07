import React, { useState } from "react";
import Grid from "./Grid";
import runAlgorithm from "../algorithms/algorithm";
import GridContext from "../context/grid-context";

const ShortestPathVisualizer = () => {
	const [grid, setGrid] = useState([]);

	const numRows = 3;
	const numColumns = 3;

	const animatePath = (path) => {
		const newGrid = grid.map((arr) => {
			return arr.slice();
		});
		path.forEach((node) => {
			const { x, y } = JSON.parse(node);
			newGrid[x][y].visited = true;
		});
		setGrid(newGrid);
	};

	const getShortestPath = () => {
		const startNode = { x: 0, y: 0 };
		const endNode = { x: numRows - 1, y: numColumns - 1 };
		const { path } = runAlgorithm("dfs", grid, startNode, endNode);
		animatePath(path);
	};

	return (
		<GridContext.Provider value={{ grid, setGrid }}>
			<button className="run-button" onClick={getShortestPath} type="button">
				Run Algorithm
			</button>
			<Grid rows={numRows} columns={numColumns} />
		</GridContext.Provider>
	);
};

export default ShortestPathVisualizer;
