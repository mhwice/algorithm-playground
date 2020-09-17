import React from "react";
import PropTypes from "prop-types";

const OverviewTable = ({ headings, data }) => {
	return (
		<table className="overview-table">
			<thead>
				<tr>
					{headings.map((heading, idx) => {
						return <th key={idx}>{heading}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{data.map((rowData, rowIdx) => {
					return (
						<tr key={rowIdx}>
							{rowData.map((cellData, cellIdx) => {
								if (cellData === "O(n^2)") {
									return (
										<td key={cellIdx}>
											O(n<sup>2</sup>)
										</td>
									);
								}
								return <td key={cellIdx}>{cellData}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

OverviewTable.propTypes = {
	headings: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export { OverviewTable as default };
