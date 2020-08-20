import React from "react";
import PropTypes from "prop-types";
import EditorItem from "./EditorItem";
import NodeSelector from "./NodeSelector";

const Editor = ({ list, addEdge, removeEdge, updateEdge, updateStartNode, updateEndNode, isWeighted }) => {
	return (
		<div>
			<h1>Graph Editor</h1>
			<div className="selectors">
				<div className="selector-box">
					<p>Start Node: </p>
					<NodeSelector
						onSelect={updateStartNode}
						initialValue={list.nodes.filter((node) => node.isStart)[0].originalIndex}
						nodes={list.nodes}
					/>
				</div>
				<div className="selector-box">
					<p>End Node: </p>
					<NodeSelector
						onSelect={updateEndNode}
						initialValue={list.nodes.filter((node) => node.isEnd)[0].originalIndex}
						nodes={list.nodes}
					/>
				</div>
			</div>
			<div className="editor-item-container">
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
							isWeighted={isWeighted}
						/>
					);
				})}
				<button className="add-edge-button" onClick={() => addEdge()} type="button">
					Add edge
				</button>
			</div>
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
	updateStartNode: PropTypes.func.isRequired,
	updateEndNode: PropTypes.func.isRequired,
	isWeighted: PropTypes.bool.isRequired
};

export default Editor;
