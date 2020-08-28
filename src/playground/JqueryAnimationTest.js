import $ from "jquery";
import "jquery-ui";
import React from "react";

const JqueryAnimationTest = () => {
	const two = () => {
		return new Promise((resolve) => {
			$(".bar")
				.eq(2)
				.animate(
					{
						top: "+=70px"
					},
					{
						duration: 3000,
						complete: () => {
							resolve();
						}
					}
				);
		});
	};

	const one = () => {
		return new Promise((resolve) => {
			$(".bar")
				.eq(1)
				.animate(
					{
						right: "+=70px"
					},
					{
						duration: 3000,
						complete: () => {
							two().then(() => {
								resolve();
							});
						}
					}
				);
		});
	};

	const doAnimation = () => {
		one().then(() => {
			console.log("Finished Animating");
		});
	};

	return (
		<div>
			<button type="button" onClick={doAnimation}>
				Animate
			</button>
			<div className="bar-container">
				<div className="bar">1</div>
				<div className="bar">2</div>
				<div className="bar">3</div>
				<div className="bar">4</div>
			</div>
		</div>
	);
};

export default JqueryAnimationTest;
