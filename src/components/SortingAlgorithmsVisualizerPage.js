import React, { useState } from "react";
import $ from "jquery";
import mergeSort from "../algorithms/merge-sort";
import generateArrayWithIndicies, {
	generatePercentageArrayWithIndicies
} from "../utils/generateRandomArrayWithIndicies";
import MediaButtons from "./MediaButtons";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import animateBars, { undoAnimations, clearAnimations } from "../utils/animations";
import SelectBox from "./SelectBox";
import SortingEditor from "./SortingEditor";

const INITIAL_HISTORY = [];
const SortingAlgorithmsVisualizerPage = () => {
	const initialBars = () => generatePercentageArrayWithIndicies();
	// const initialBars = () => generateArrayWithIndicies(MAX_BAR_SIZE);
	const [bars, setBars] = useState(initialBars);
	const initialAlgorithmProcess = () => mergeSort(bars);
	const [algorithmProcess] = useState(initialAlgorithmProcess);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [history, { redoHistory, undoHistory, canRedoHistory, canUndoHistory, setHistory, resetHistory }] = useHistory([
		INITIAL_HISTORY
	]);
	const [selected, setSelected] = useState("3");

	const takeStep = () => {
		const result = algorithmProcess.next();
		if (!result.done) {
			const { value: animations } = result;
			const indicies = animations.map((animation) => animation[0]);
			setHistory([animations, indicies, [...indicies]]);
			setIsAnimating(true);
			animateBars(animations, indicies, [...indicies]).then(() => {
				setIsAnimating(false);
			});
		} else {
			setIsPlaying(false);
			console.log(`Final Result: ${result.value}`);
		}
	};

	const redoStep = () => {
		setIsAnimating(true);
		animateBars(...history.future[0]).then(() => {
			setIsAnimating(false);
		});
		redoHistory();
	};

	const undoStep = () => {
		if (canUndoHistory) {
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
			setIsAnimating(true);
			undoAnimations(history.present[0], barsUsed).then(() => {
				setIsAnimating(false);
			});
		}
		undoHistory();
	};

	const resetAll = () => {
		clearAnimations();
		resetHistory(INITIAL_HISTORY);
	};

	const moveBackward = () => {
		if (!isAnimating) {
			undoStep();
		}
	};

	// Moves forward one step
	const moveForward = () => {
		if (!isAnimating) {
			if (canRedoHistory) {
				redoStep();
			} else {
				takeStep();
			}
		}
	};

	// Toggles the value of isPlaying
	const playPauseToggle = () => {
		setIsPlaying((prev) => !prev);
	};

	useInterval(() => {
		if (isPlaying && !isAnimating) {
			moveForward();
		}
	}, 500);

	const handleClick = (radio) => {
		const { value } = radio.target;
		if (value === selected) {
			setSelected(value);
			resetAll();
		}
	};

	const editBars = () => {
		setIsEditing((prev) => !prev);
	};

	// const containsInvalidCharacters = (str) => !str.match(/^[0-9, ]*$/);

	// const hasEmptyItems = (str) =>
	// 	str
	// 		.split(",")
	// 		.slice(1, -1)
	// 		.filter((item) => item.length === 0).length !== 0;

	// const containsInvalidNumbers = (str, min, max) =>
	// 	str.split(",").filter((item) => item < min || item > max).length !== 0;

	const isNotNumber = (str) => !str.match(/^\d+$/);

	const isNotValidNumber = (str) => Number(str) < 1 || Number(str) > 100;

	const getValidString = (str) => {
		// console.log("isNotNumber", isNotNumber(str));
		if (isNotNumber(str)) {
			return undefined;
		}

		// console.log("isNotValidNumber", isNotValidNumber(str));
		if (isNotValidNumber(str)) {
			return undefined;
		}
		// if (containsInvalidCharacters(str)) {
		// 	return undefined;
		// }

		// if (hasEmptyItems(str)) {
		// 	return undefined;
		// }

		// if (containsInvalidNumbers(str, 1, 100)) {
		// 	return undefined;
		// }

		return str;
	};

	const formatNumber = (str) => Number(str) / 100;

	// const formatBars = (input) => {
	// 	return input.split(",").map((height, index) => [Number(height), index, index]);
	// };

	const barInputChanged = (e) => {
		const { value } = e.target;
		const { id } = e.target;
		const validString = getValidString(value);
		if (validString) {
			setBars((prevBars) => {
				const newBars = [...prevBars];
				newBars[id] = [formatNumber(validString), newBars[id][1], newBars[id][2]];
				return newBars;
			});
		}
	};

	return (
		<div className="sorting-visualizer-wrapper">
			<SelectBox handleClick={handleClick} items={["Merge Sort"]} />
			<div className="sorting-visualizer-content">
				{isEditing && (
					<SortingEditor currentBars={bars.map((bar) => Math.round(bar[0] * 100))} barInputChanged={barInputChanged} />
				)}
				<div className="bar-wrapper">
					<div className="bars">
						{bars.map((bar, barIndex) => {
							return (
								<div className="bar" key={barIndex} style={{ height: `${bar[0] * 100}%` }}>
									{/* <p className="bar-text">{Math.round(bar[0] * 100)}</p> */}
									<input
										id={barIndex}
										className={isEditing ? "bar-text bar-text-editable" : "bar-text"}
										type="number"
										value={Math.round(bar[0] * 100)}
										onChange={(e) => barInputChanged(e)}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<MediaButtons
				moveBackward={moveBackward}
				playPauseToggle={playPauseToggle}
				moveForward={moveForward}
				resetAll={resetAll}
				editorToggle={editBars}
				isEditing={isEditing}
				isPlaying={isPlaying}
				addAdditionalButton={false}
				additionalButtonCallback={() => {}}
			/>
		</div>
	);
};

export { SortingAlgorithmsVisualizerPage as default };
