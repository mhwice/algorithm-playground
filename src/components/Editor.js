import React from "react";
import PropTypes from "prop-types";
import EditorItem from "./EditorItem";
import NodeSelector from "./NodeSelector";

const Editor = ({ list, addEdge, removeEdge, updateEdge, startNode, endNode, updateStartNode, updateEndNode }) => {
	return (
		<div>
			<h1>Editor</h1>
			<p>Start Node: </p>

			<NodeSelector
				onSelect={updateStartNode}
				initialValue={list.nodes.filter((node) => node.isStart)[0].originalIndex}
				nodes={list.nodes}
			/>

			<p>End Node: </p>
			<NodeSelector
				onSelect={updateEndNode}
				initialValue={list.nodes.filter((node) => node.isEnd)[0].originalIndex}
				nodes={list.nodes}
			/>

			{list.edges.map((item) => {
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
	list: {}
};

Editor.propTypes = {
	list: PropTypes.objectOf(PropTypes.array),
	addEdge: PropTypes.func.isRequired,
	removeEdge: PropTypes.func.isRequired,
	updateEdge: PropTypes.func.isRequired,
	startNode: PropTypes.string.isRequired,
	endNode: PropTypes.string.isRequired,
	updateStartNode: PropTypes.func.isRequired,
	updateEndNode: PropTypes.func.isRequired
};

export default Editor;
