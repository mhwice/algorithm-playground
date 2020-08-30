import React, { useState, useEffect } from "react";
import $ from "jquery";
import mergeSort from "../algorithms/merge-sort";
import generateArrayWithIndicies from "../utils/generateRandomArrayWithIndicies";
import MediaButtons from "./MediaButtons";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import animateBars, { undoAnimations, clearAnimations } from "../utils/animations";
import SelectBox from "./SelectBox";
import SortingEditor from "./SortingEditor";

const INITIAL_HISTORY = [];
const MIN_BAR_SIZE = 28;
const MAX_BAR_SIZE = Math.round($(window).height() / 3);
const SortingAlgorithmsVisualizerPage = () => {
	const initialBars = () => generateArrayWithIndicies(MAX_BAR_SIZE);
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

	// useEffect(() => {
	// 	if (isEditing) {
	// 		resetAll();
	// 	}
	// }, [isEditing]);

	const editBars = () => {
		console.log("editBars");
		setIsEditing((prev) => !prev);
	};

	const containsInvalidCharacters = (str) => !str.match(/^[0-9, ]*$/);

	const hasEmptyItems = (str) =>
		str
			.split(",")
			.slice(1, -1)
			.filter((item) => item.length === 0).length !== 0;

	const containsInvalidNumbers = (str, min, max) =>
		str.split(",").filter((item) => item < min || item > max).length !== 0;

	const getValidString = (str) => {
		if (containsInvalidCharacters(str)) {
			return undefined;
		}

		if (hasEmptyItems(str)) {
			return undefined;
		}

		if (containsInvalidNumbers(str, 28, MAX_BAR_SIZE)) {
			return undefined;
		}

		return str;
	};

	const formatBars = (input) => {
		return input.split(",").map((height, index) => [Number(height), index, index]);
	};

	const barInputChanged = (e) => {
		const input = e.target.value;
		const validString = getValidString(input);
		if (validString) {
			setBars(formatBars(validString));
		}
	};

	return (
		<div className="wrapper">
			<SelectBox className="header" handleClick={handleClick} items={["Merge Sort"]} />
			<div className="content">
				{isEditing && (
					<SortingEditor
						currentBars={bars.map((bar) => bar[0])}
						barInputChanged={barInputChanged}
						minHeight={MIN_BAR_SIZE}
						maxHeight={MAX_BAR_SIZE}
					/>
				)}
				<div className="bar-wrapper">
					<div className="bars">
						{bars.map((bar, barIndex) => {
							return (
								<div className="bar" key={barIndex} style={{ height: `${bar[0]}px` }}>
									<p className="bar-text">{bar[0]}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<MediaButtons
				className="footer"
				moveBackward={moveBackward}
				playPauseToggle={playPauseToggle}
				moveForward={moveForward}
				resetAll={resetAll}
				editorToggle={editBars}
				isEditing={isEditing}
				isPlaying={isPlaying}
				additionalButtonCallback={() => {}}
			/>
		</div>
	);
};

export { SortingAlgorithmsVisualizerPage as default };
