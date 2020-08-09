import React from "react";
import PropTypes from "prop-types";

const Table = ({ titles, data }) => {
	return (
		<table>
			<thead>
				<tr>
					{titles.map((title, titleIndex) => (
						<th key={titleIndex}>{title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, rowIndex) => {
					return (
						<tr key={rowIndex}>
							{row.map((item, itemIndex) => {
								return <td key={itemIndex}>{item}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

Table.defaultProps = {
	titles: [],
	data: []
};

Table.propTypes = {
	titles: PropTypes.arrayOf(PropTypes.string),
	data: PropTypes.arrayOf(PropTypes.array)
};

export { Table as default };
