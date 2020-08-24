import React, { useEffect, useState } from "react";
import mergeSort from "../algorithms/merge-sort";
import mergeSortEfficient from "../algorithms/merge-sort-efficient";

// ! STEP 1) Display bars with different heights

const SortingAlgorithmsVisualizerPage = () => {
	const getRandomNumber = (min = 1, max = 1000) => Math.floor(Math.random() * (max - min + 1) + min);

	const generateRandomArray = () => {
		const randomArray = [];
		for (let i = 0; i < 10; i += 1) {
			randomArray.push(getRandomNumber());
		}
		return randomArray;
	};

	const [bars, setBars] = useState([]);

	useEffect(() => {
		setBars(generateRandomArray());
	}, []);

	const sortBars = () => {
		const t0 = performance.now();
		const res1 = mergeSort(bars);
		console.log("res1", res1);
		const t1 = performance.now();
		console.log(`Call to mergeSort took ${Math.round((t1 - t0 + Number.EPSILON) * 100) / 100} milliseconds.`);

		// t0 = performance.now();
		// mergeSortEfficient(bars, new Array(bars.length), 0, bars.length - 1);
		// t1 = performance.now();
		// console.log(`Call to efficient mergeSort took ${Math.round((t1 - t0 + Number.EPSILON) * 100) / 100} milliseconds.`);
	};

	return (
		<div>
			<button className="run-button" onClick={sortBars} type="button">
				Run Algorithm
			</button>
			<div className="bar-container">
				{bars.map((bar, barIndex) => {
					return (
						<div className="bar" key={barIndex} style={{ height: bar }}>
							{bar}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { SortingAlgorithmsVisualizerPage as default };
