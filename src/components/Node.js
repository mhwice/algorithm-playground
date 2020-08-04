import React from "react";
import PropTypes from "prop-types";

const GridCell = ({ isStart, isEnd, isVisited }) => {
	const getClassName = () => {
		let classModifierName;
		if (isStart) {
			classModifierName = "node-start";
		} else if (isEnd) {
			classModifierName = "node-end";
		} else if (isVisited) {
			classModifierName = "node-visited";
		} else {
			classModifierName = "";
		}
		return classModifierName;
	};

	// ! If possible, should refactor so that there is not a space after grid-cell for regular cells
	return <div className={`node ${getClassName()}`} />;
};

GridCell.defaultProps = {
	isStart: false,
	isEnd: false,
	isVisited: false
};

GridCell.propTypes = {
	isStart: PropTypes.bool,
	isEnd: PropTypes.bool,
	isVisited: PropTypes.bool
};

export { GridCell as default };
