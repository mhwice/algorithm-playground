import React from "react";
import PropTypes from "prop-types";
import EditorItem from "./EditorItem";
import NodeSelector from "./NodeSelector";

const Editor = ({ list, addEdge, removeEdge, updateEdge, updateStartNode, updateEndNode, isWeighted }) => {
	return (
		<div className="editor-wrapper">
			<div className="editor-header">
				<h3 className="editor-title">Graph Editor</h3>
				<div className="node-selector-wrapper">
					<div className="selector-box">
						<span className="selector-text">Start: </span>
						<NodeSelector
							onSelect={updateStartNode}
							initialValue={list.nodes.filter((node) => node.isStart)[0].originalIndex}
							nodes={list.nodes}
						/>
					</div>
					<div className="selector-box">
						<span className="selector-text">End: </span>
						<NodeSelector
							onSelect={updateEndNode}
							initialValue={list.nodes.filter((node) => node.isEnd)[0].originalIndex}
							nodes={list.nodes}
						/>
					</div>
				</div>
			</div>
			<div className="editor-body">
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
			{/* <div className="node-selector-wrapper">
				<div className="selector-box">
					<span className="selector-text">Start Node: </span>
					<NodeSelector
						onSelect={updateStartNode}
						initialValue={list.nodes.filter((node) => node.isStart)[0].originalIndex}
						nodes={list.nodes}
					/>
				</div>
				<div className="selector-box">
					<span className="selector-text">End Node: </span>
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
			</div> */}
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
