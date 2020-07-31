import React from "react";
import Grid from "./Grid";

const ShortestPathVisualizer = () => {
	return (
		<div>
			<button className="run-button" type="button">
				Run Algorithm
			</button>
			<Grid rows={7} columns={7} />
		</div>
	);
};

export default ShortestPathVisualizer;
