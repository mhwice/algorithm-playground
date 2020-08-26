import React, { useState } from "react";
import $ from "jquery";
import mergeSort from "../algorithms/merge-sort";
import generateArrayWithIndicies from "../utils/generateRandomArrayWithIndicies";

const SortingAlgorithmsVisualizerPage = () => {
	const initialBars = () => generateArrayWithIndicies();
	const [bars] = useState(initialBars);
	const initialAlgorithmProcess = () => mergeSort(bars);
	const [algorithmProcess] = useState(initialAlgorithmProcess);

	// const animateBars = (index1, index2) => {
	// 	console.log(`Index #1 = ${index1}`);
	// 	console.log(`Index #2 = ${index2}`);
	// 	const div1 = $(".bar").eq(index1);
	// 	const div2 = $(".bar").eq(index2);
	// 	const div3 = $(".bar").eq(index1 + 1);
	// 	const distance = div1.offset().left - div2.offset().left;

	// 	$.when(
	// 		div1.animate(
	// 			{
	// 				left: -distance
	// 			},
	// 			1000
	// 		),
	// 		div2.animate(
	// 			{
	// 				left: distance
	// 			},
	// 			1000
	// 		)
	// 	).done(() => {
	// 		div2.css("left", "0px");
	// 		div1.css("left", "0px");
	// 		if (index2 - index1 === 1) {
	// 			div2.insertBefore(div1);
	// 		} else if (index2 - index1 > 1) {
	// 			div2.insertBefore(div3);
	// 		}
	// 	});
	// };

	// const animateBar = (fromIndex, toIndex) => {
	// 	const div1 = $(".bar").eq(fromIndex);
	// 	const div2 = $(".bar").eq(toIndex);
	// 	const distance = div1.offset().left - div2.offset().left;

	// 	$.when(
	// 		div1.animate(
	// 			{
	// 				left: -distance
	// 			},
	// 			1000
	// 		)
	// 	).done(() => {
	// 		div1.css("left", "0px");
	// 		div2.insertBefore(div1);
	// 	});
	// };

	// https://jsfiddle.net/jksefc24/3/

	const animateBars = (animations) => {
		animations.forEach((animation) => {
			if (animation[1] !== 0) {
				const fromDiv = $(".bar").eq(animation[0]);
				fromDiv.animate(
					{
						left: `+=${animation[1] * 70}px`
					},
					1000
				);
			}
		});
	};

	const sortBars = () => {
		const result = algorithmProcess.next();
		if (!result.done) {
			const { value } = result;
			// console.log(value);
			animateBars(value);
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
