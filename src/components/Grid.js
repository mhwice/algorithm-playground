import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridCell from "./GridCell";

// ! Temporary values for the coordinates of the start and end nodes
const startX = 0;
const startY = 0;
const endX = 6;
const endY = 6;

const createGrid = (rows, columns) => {
	if (rows < 1 || columns < 1) {
		return [[0]];
	}
	const grid = [];
	for (let i = 0; i < rows; i += 1) {
		const row = [];
		for (let j = 0; j < columns; j += 1) {
			row.push({
				isStart: i === startX && j === startY,
				isEnd: i === endX && j === endY
			});
		}
		grid.push(row);
	}
	return grid;
};

const Grid = ({ rows, columns }) => {
	const [grid, setGrid] = useState([]);

	useEffect(() => {
		setGrid(createGrid(rows, columns));
	}, []);

	return (
		<div className="grid">
			{grid.map((row, rowIndex) => {
				return (
					// It is safe to use the index as a key here since the rows are static and will never change
					<div className="row" key={`row${rowIndex}`}>
						{row.map((column, columnIndex) => (
							<GridCell
								isStart={column.isStart}
								isEnd={column.isEnd}
								key={`(${rowIndex}, ${columnIndex})`}
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
