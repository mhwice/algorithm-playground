import React from "react";
import PropTypes from "prop-types";

const AlgorithmListItem = ({ algorithm, description, isDirected, isWeighted }) => (
	<div className="list-item-container">
		<div className="list-item-header">
			<h1>{algorithm}</h1>
			<div className="tag tag-directed">{isDirected ? "Directed" : "Undirected"}</div>
			<div className="tag tag-weighted">{isWeighted ? "Weighted" : "Unweighted"}</div>
		</div>
		<p>{description}</p>

		{/* <button className="btn-si btn-github" type="button">
			View Code on Github
		</button> */}
	</div>
);

AlgorithmListItem.propTypes = {
	algorithm: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	isDirected: PropTypes.bool.isRequired,
	isWeighted: PropTypes.bool.isRequired
};

export default AlgorithmListItem;
