import React from "react";
import PropTypes from "prop-types";

const Table = ({ title, headings, data }) => {
	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						<th id="table-title" colSpan={headings.length}>
							{title}
						</th>
					</tr>
					<tr>
						{headings.map((heading, headingIndex) => (
							<th key={headingIndex}>{heading}</th>
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
		</div>
	);
};

Table.defaultProps = {
	title: "",
	headings: [],
	data: []
};

Table.propTypes = {
	title: PropTypes.string,
	headings: PropTypes.arrayOf(PropTypes.string),
	data: PropTypes.arrayOf(PropTypes.array)
};

export { Table as default };
