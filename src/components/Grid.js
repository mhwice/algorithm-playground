import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridCell from "./GridCell";

const createMatrix = (rows, columns) => {
	if (rows < 1 || columns < 1) {
		return [[0]];
	}
	const matrix = [];
	for (let i = 0; i < rows; i += 1) {
		const row = [];
		for (let j = 0; j < columns; j += 1) {
			row.push(i * columns + j);
		}
		matrix.push(row);
	}
	return matrix;
};

const Grid = ({ rows, columns }) => {
	const [matrix, setMatrix] = useState([[]]);

	useEffect(() => {
		setMatrix(createMatrix(rows, columns));
	}, []);

	return (
		<div className="grid">
			{matrix.map((row, rowIndex) => {
				return (
					// It is safe to use the index as a key here since the rows are static and will never change
					<div className="row" key={`row${rowIndex}`}>
						{row.map((column) => (
							<GridCell key={column} />
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

export { createMatrix, Grid as default };
