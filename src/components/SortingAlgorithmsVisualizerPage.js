import React, { useState } from "react";
import $ from "jquery";
import "jquery-ui";
import mergeSort from "../algorithms/merge-sort";
import generateArrayWithIndicies from "../utils/generateRandomArrayWithIndicies";

const SortingAlgorithmsVisualizerPage = () => {
	const initialBars = () => generateArrayWithIndicies();
	const [bars] = useState(initialBars);
	const initialAlgorithmProcess = () => mergeSort(bars);
	const [algorithmProcess] = useState(initialAlgorithmProcess);

	const animateBarsUp = (indicies) => {
		indicies.forEach((index) => {
			$(".bar").eq(index).animate(
				{
					top: "-=70px"
				},
				1000
			);
			$(".bar").eq(index).animate(
				{
					backgroundColor: "red"
				},
				500
			);
		});
	};

	const animateBarsDown = (transitionDownAnimations, transitionUpIndicies) => {
		if (transitionDownAnimations.length > 0) {
			const [index, steps] = transitionDownAnimations[0];
			$.when(
				$(".bar").eq(index).animate(
					{
						backgroundColor: "green"
					},
					500
				),
				$(".bar")
					.eq(index)
					.animate(
						{
							left: `+=${steps * 70}px`,
							top: "+=70px"
						},
						1000
					)
			).done(() => {
				if (transitionDownAnimations.length > 1) {
					animateBarsDown(transitionDownAnimations.slice(1), transitionUpIndicies);
				} else {
					animateBarsUp(transitionUpIndicies);
				}
			});
		}
	};

	const doneFunc = (index, finalIndex, transitionDownAnimations, transitionUpIndicies) => {
		if (index === finalIndex) {
			animateBarsDown(transitionDownAnimations, transitionUpIndicies);
		}
	};

	const animateBarsStartColor = (transitionDownAnimations, transitionUpIndicies, startColorIndicies) => {
		startColorIndicies.forEach((barIndex, index) => {
			$(".bar")
				.eq(barIndex)
				.animate(
					{
						backgroundColor: "green"
					},
					{
						duration: 500,
						complete: doneFunc(index, startColorIndicies.length - 1, transitionDownAnimations, transitionUpIndicies)
					}
				);
		});

		// if (startColorIndicies.length > 0) {
		// 	const index = startColorIndicies[0];
		// 	$.when(
		// 		$(".bar").eq(index).animate(
		// 			{
		// 				backgroundColor: "green"
		// 			},
		// 			{
		// 				duration: 500,
		// 				queue: true
		// 			}
		// 		)
		// 	).done(() => {
		// 		if (startColorIndicies.length > 1) {
		// 			animateBarsStartColor(transitionDownAnimations, transitionUpIndicies, startColorIndicies.slice(1));
		// 		} else {
		// 			animateBarsDown(transitionDownAnimations, transitionUpIndicies);
		// 		}
		// 	});
		// }
	};

	const animateBars = (transitionDownAnimations, transitionUpIndicies, startColorIndicies) => {
		animateBarsStartColor(transitionDownAnimations, transitionUpIndicies, startColorIndicies);
	};

	const sortBars = () => {
		const result = algorithmProcess.next();
		if (!result.done) {
			const { value: animations } = result;
			const indicies = animations.map((animation) => animation[0]);
			animateBars(animations, indicies, [...indicies]);
		} else {
			console.log(`Final Result: ${result.value}`);
		}
	};

	return (
		<div>
			<button className="run-button" onClick={sortBars} type="button">
				Run Algorithm
			</button>
			<div className="bar-container">
				{bars.map((bar, barIndex) => {
					return (
						<div className="bar" key={barIndex}>
							{bar[0]}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { SortingAlgorithmsVisualizerPage as default };

// style={{ height: bar[0] }}
