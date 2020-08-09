import React from "react";
import PropTypes from "prop-types";

const Child = ({ count }) => <h1>The count is: {count}</h1>;

Child.defaultProps = {
	count: 0
};

Child.propTypes = {
	count: PropTypes.number
};

export default Child;
