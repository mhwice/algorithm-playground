import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import OverviewTable from "./OverviewTable";

const SortingAlgorithmsOverviewPage = () => {
	const getHeadings = () => {
		let headings = [
			"Algorithm",
			"Best-Case Time Complexity",
			"Average-Case Time Complexity",
			"Worst-Case Time Complexity",
			"Worst-Case Space Complexity",
			"When to use"
		];

		const width = $(window).width();
		if (width !== undefined) {
			if (width < 500) {
				headings = headings.slice(0, -1);
			}
		}

		return headings;
	};

	const getData = () => {
		let data = [
			["Bubble Sort", "O(n)", "O(n^2)", "O(n^2)", "O(1)", "Almost never used"],
			["Selection Sort", "O(n^2)", "O(n^2)", "O(n^2)", "O(1)", "Almost never used"],
			["Insertion Sort", "O(n)", "O(n^2)", "O(n^2)", "O(1)", "Used when array length is short (10-20 elements)"],
			[
				"Merge Sort",
				"O(n log n)",
				"O(n log n)",
				"O(n log n)",
				"O(n)",
				"Useful for arrays with a large number of elements"
			],
			[
				"Quick Sort",
				"O(n log n)",
				"O(n log n)",
				"O(n^2)",
				"O(1)",
				"Useful for arrays with a large number of elements (very memory efficient)"
			]
		];

		const width = $(window).width();
		if (width !== undefined) {
			if (width < 500) {
				data = data.map((row) => row.slice(0, -1));
			}
		}

		return data;
	};

	return (
		<>
			<h2 className="overview-title">Sorting Algorithms Overview</h2>
			<div className="algorithm-table-container">
				<OverviewTable headings={getHeadings()} data={getData()} />
			</div>
			<div className="action-button-container">
				<a href="https://github.com/mhwice/algorithm-playground/tree/master/src/algorithms-and-data-structures/algorithms/sorting-algorithms">
					<button className="btn-si btn-github" type="button">
						View Code on Github
					</button>
				</a>
				<Link to="/sorting-algorithms/visualizer">
					<button className="btn-si btn-sorting-algorithm" type="button">
						Visualize Algorithms
					</button>
				</Link>
			</div>
		</>
	);
};
export default SortingAlgorithmsOverviewPage;
