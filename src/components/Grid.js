import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import GridContext from "../context/grid-context";

const createGrid = (rows, columns) => {
	if (rows < 1 || columns < 1) {
		return [[0]];
	}
	const grid = [];
	for (let i = 0; i < rows; i += 1) {
		const row = [];
		for (let j = 0; j < columns; j += 1) {
			row.push({
				row: i,
				column: j
			});
		}
		grid.push(row);
	}
	return grid;
};

const Grid = ({ rows, columns }) => {
	const { grid, setGrid } = useContext(GridContext);

	useEffect(() => {
		setGrid(createGrid(rows, columns));
	}, []);

	return (
		<div className="grid">
			{grid.map((row, rowIndex) => {
				return (
					<div className="row" key={rowIndex}>
						{row.map((node) => (
							<Node
								row={node.row}
								column={node.column}
								isStart={node.row === 0 && node.column === 0}
								isEnd={node.row === rows - 1 && node.column === columns - 1}
								isVisited={node.visited}
								key={`(${node.row}, ${node.column})`}
							/>
						))}
					</div>
				);
			})}
		</div>
	);
};

Grid.defaultProps = {
	rows: 1,
	columns: 1
};

Grid.propTypes = {
	rows: PropTypes.number,
	columns: PropTypes.number
};

export { createGrid, Grid as default };
