import React from "react";

const SortingEditor = () => {
	return (
		<div className="sorting-editor">
			<h3 className="sorting-editor-title">Sorting Editor</h3>
			<p className="sorting-editor-body-text">All bars must have a height, and all heights must be between 1 and 100</p>
			<p className="sorting-editor-body-text">Highlight (select) a height and type a new number to change it</p>
		</div>
	);
};

export default SortingEditor;
