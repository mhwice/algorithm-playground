import React from "react";
import PropTypes from "prop-types";

const NodeSelector = ({ onSelect, initialValue, nodes }) => (
	<select onChange={(e) => onSelect({ id: e.target.value })} value={initialValue}>
		{nodes.map((node, idx) => (
			<option key={idx} value={node.originalIndex}>
				{node.id}
			</option>
		))}
	</select>
);

NodeSelector.propTypes = {
	onSelect: PropTypes.func.isRequired,
	initialValue: PropTypes.number.isRequired,
	nodes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NodeSelector;
