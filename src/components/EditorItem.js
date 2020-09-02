import React from "react";
import PropTypes from "prop-types";

const EditorItem = ({ fromNode, toNode, weight, removeEdge, updateEdge, id, isWeighted }) => {
	return (
		<div className="list-item">
			<span className="tag-text">From:</span>
			<input
				className="editor-item-input"
				onChange={(e) => updateEdge(id, { fromNode: e.target.value, toNode, weight })}
				type="text"
				value={fromNode}
				required
			/>
			<span className="tag-text">To:</span>
			<input
				className="editor-item-input"
				onChange={(e) => updateEdge(id, { fromNode, toNode: e.target.value, weight })}
				type="text"
				value={toNode}
				required
			/>
			{isWeighted && (
				<>
					<span className="tag-text">Weight:</span>
					<input
						className="editor-item-input"
						onChange={(e) => updateEdge(id, { fromNode, toNode, weight: e.target.value })}
						type="text"
						value={weight}
						required
					/>
				</>
			)}

			<button className="remove-button" onClick={() => removeEdge(id)} type="button">
				<i className="fas fa-trash" />
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
	id: PropTypes.number.isRequired,
	isWeighted: PropTypes.bool.isRequired
};

export default EditorItem;
