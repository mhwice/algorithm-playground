import React from "react";
import PropTypes from "prop-types";

const EditorItem = ({ fromNode, toNode, weight, removeEdge, updateEdge, id }) => {
	return (
		<div className="list-item">
			<p>From:</p>
			<input
				onChange={(e) => updateEdge({ fromNode: e.target.value, toNode, weight, id })}
				type="text"
				value={fromNode}
				required
			/>
			<p>To:</p>
			<input
				onChange={(e) => updateEdge({ fromNode, toNode: e.target.value, weight, id })}
				type="text"
				value={toNode}
				required
			/>
			<p>Weight:</p>
			<input
				onChange={(e) => updateEdge({ fromNode, toNode, weight: e.target.value, id })}
				type="text"
				value={weight}
				required
			/>
			<button onClick={() => removeEdge(id)} type="button">
				Remove Edge
			</button>
		</div>
	);
};

EditorItem.defaultProps = {
	weight: 0
};

EditorItem.propTypes = {
	fromNode: PropTypes.string.isRequired,
	toNode: PropTypes.string.isRequired,
	weight: PropTypes.number,
	removeEdge: PropTypes.func.isRequired,
	updateEdge: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired
};

export default EditorItem;
