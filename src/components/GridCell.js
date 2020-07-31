import React from "react";
import PropTypes from "prop-types";

const GridCell = ({ isStart, isEnd }) => {
	let classModifierName;
	if (isStart) {
		classModifierName = "grid-cell-start";
	} else if (isEnd) {
		classModifierName = "grid-cell-end";
	} else {
		classModifierName = "";
	}

	// ! If possible, should refactor so that there is not a space after grid-cell for regular cells
	return <div className={`grid-cell ${classModifierName}`} />;
};

GridCell.defaultProps = {
	isStart: false,
	isEnd: false
};

GridCell.propTypes = {
	isStart: PropTypes.bool,
	isEnd: PropTypes.bool
};

export { GridCell as default };
