import React from "react";
import PropTypes from "prop-types";

const SortingEditor = ({ currentBars, barInputChanged, minHeight, maxHeight }) => {
	return (
		<div className="sorting-editor">
			<h1>Sorting Editor</h1>
			<p>Please enter the heights of the bars separated by commas</p>
			<p>
				All heights must be between {minHeight} and {maxHeight}
			</p>
			<input className="bar-input" type="text" value={currentBars.join(",")} onChange={(e) => barInputChanged(e)} />
		</div>
	);
};

SortingEditor.propTypes = {
	currentBars: PropTypes.arrayOf(PropTypes.number).isRequired,
	barInputChanged: PropTypes.func.isRequired,
	minHeight: PropTypes.number.isRequired,
	maxHeight: PropTypes.number.isRequired
};

export default SortingEditor;
