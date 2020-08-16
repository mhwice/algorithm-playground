import React from "react";
import PropTypes from "prop-types";
import EditorItem from "./EditorItem";

const Editor = ({ list, addEdge, removeEdge, updateEdge, startNode, endNode, updateStartNode, updateEndNode }) => {
	return (
		<div>
			<h1>Editor</h1>
			<p>Start Node: </p>
			<input onChange={(e) => updateStartNode(e.target.value)} type="text" value={startNode} required />
			<p>End Node: </p>
			<input onChange={(e) => updateEndNode(e.target.value)} type="text" value={endNode} required />
			{list.map((item) => {
				return (
					<EditorItem
						key={item.originalIndex}
						fromNode={item.source}
						toNode={item.target}
						weight={item.weight}
						removeEdge={removeEdge}
						updateEdge={updateEdge}
						id={item.originalIndex}
					/>
				);
			})}
			<button onClick={() => addEdge()} type="button">
				Add edge
			</button>
		</div>
	);
};

Editor.defaultProps = {
	list: []
};

Editor.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object),
	addEdge: PropTypes.func.isRequired,
	removeEdge: PropTypes.func.isRequired,
	updateEdge: PropTypes.func.isRequired,
	startNode: PropTypes.string.isRequired,
	endNode: PropTypes.string.isRequired,
	updateStartNode: PropTypes.func.isRequired,
	updateEndNode: PropTypes.func.isRequired
};

export default Editor;
