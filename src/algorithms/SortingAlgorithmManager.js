import mergeSort from "./merge-sort";
import { insertionSortProcess } from "./insertion-sort";
import animateBars, { undoAnimations, clearAnimations } from "../utils/merge-sort-animations";
import doInsertionSortAnimation, { undoInsertionSortAnimations } from "../utils/insertion-sort-animations";
import quicksortProcess from "./quicksort";
import doQuickSortAnimation, { undoQuickSortAnimations } from "../utils/quicksort-animations";
import bubbleSortProcess from "./bubble-sort";
import doBubbleSortAnimation, { undoBubbleSortAnimations } from "../utils/bubble-sort-animations";
import selectionSortProcess from "./selection-sort";
import doSelectionSortAnimation, { undoSelectionSortAnimations } from "../utils/selection-sort-animations";

class SortingAlgorithmManager {
	constructor(algorithm, array) {
		switch (algorithm) {
			case "merge-sort": {
				this.algorithm = "merge-sort";
				this.process = mergeSort(array);
				break;
			}
			case "insertion-sort": {
				this.algorithm = "insertion-sort";
				this.process = insertionSortProcess(array);
				break;
			}
			case "quick-sort": {
				this.algorithm = "quick-sort";
				this.process = quicksortProcess(array);
				break;
			}
			case "bubble-sort": {
				this.algorithm = "bubble-sort";
				this.process = bubbleSortProcess(array);
				break;
			}
			case "selection-sort": {
				this.algorithm = "selection-sort";
				this.process = selectionSortProcess(array);
				break;
			}
			default:
		}
	}

	// I can format the algorithm output here
	next() {
		const iterable = this.process.next();
		if (this.algorithm === "merge-sort") {
			if (!iterable.done) {
				const { value: animations } = iterable;
				const indicies = animations.map((animation) => animation[0]);
				const animationData = [animations, indicies, [...indicies]];
				return { done: false, animations: animationData };
			}
			return { done: true };
		}

		if (this.algorithm === "insertion-sort") {
			if (!iterable.done) {
				return { done: false, animations: iterable.value };
			}
			return { done: true };
		}

		if (this.algorithm === "quick-sort") {
			if (!iterable.done) {
				return { done: false, animations: iterable.value };
			}
			return { done: true };
		}

		if (this.algorithm === "bubble-sort") {
			if (!iterable.done) {
				return { done: false, animations: iterable.value };
			}
			return { done: true };
		}

		if (this.algorithm === "selection-sort") {
			if (!iterable.done) {
				return { done: false, animations: iterable.value };
			}
			return { done: true };
		}

		return "algorithm not found";
	}

	doAnimation = (animation) => {
		switch (this.algorithm) {
			case "merge-sort": {
				return animateBars(animation);
			}
			case "insertion-sort": {
				return doInsertionSortAnimation(animation);
			}
			case "quick-sort": {
				return doQuickSortAnimation(animation);
			}
			case "bubble-sort": {
				return doBubbleSortAnimation(animation);
			}
			case "selection-sort": {
				return doSelectionSortAnimation(animation);
			}
			default:
		}
	};

	undoAnimation = (history) => {
		switch (this.algorithm) {
			case "merge-sort": {
				const barsUsed = [];
				history.past.forEach((past) => {
					const pastAnimations = past[0];
					pastAnimations.forEach((animation) => {
						const barId = animation[0];
						if (!barsUsed.includes(barId)) {
							barsUsed.push(barId);
						}
					});
				});
				return undoAnimations([history.present[0], barsUsed]);
			}
			case "insertion-sort": {
				return undoInsertionSortAnimations(history.present);
			}
			case "quick-sort": {
				return undoQuickSortAnimations(history.present);
			}
			case "bubble-sort": {
				const newAnimations = {};
				history.present.forEach((animation) => {
					const [bar1, bar2, shouldSwap] = animation;
					if (shouldSwap) {
						if (Object.prototype.hasOwnProperty.call(newAnimations, bar1)) {
							newAnimations[bar1] += 1;
						} else {
							newAnimations[bar1] = 1;
						}
						if (Object.prototype.hasOwnProperty.call(newAnimations, bar2)) {
							newAnimations[bar2] -= 1;
						} else {
							newAnimations[bar2] = -1;
						}
					}
				});

				const coloredItems = [];
				if (history.present.length === 0) {
					return undoBubbleSortAnimations([], coloredItems);
				}

				const lastAnimation = history.present[history.present.length - 1];
				const [bar1, bar2, shouldSwap] = lastAnimation;
				const coloredBar = shouldSwap ? bar1 : bar2;
				coloredItems.push(coloredBar);
				if (history.present.length === 1) {
					coloredItems.push(!shouldSwap ? bar1 : bar2);
				}

				return undoBubbleSortAnimations(
					Object.keys(newAnimations).map((key) => [key, newAnimations[key]]),
					coloredItems
				);
			}
			case "selection-sort": {
				return undoSelectionSortAnimations(history.present);
			}
			default:
		}
	};

	clear = () => {
		clearAnimations();
	};
}

export { SortingAlgorithmManager as default };
