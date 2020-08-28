import React, { useState } from "react";
import $ from "jquery";
import mergeSort from "../algorithms/merge-sort";
import generateArrayWithIndicies from "../utils/generateRandomArrayWithIndicies";
import MediaButtons from "./MediaButtons";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import animateBars, { undoAnimations } from "../utils/animations";

const INITIAL_HISTORY = [];
const MAX_BAR_SIZE = Math.round($(window).height() / 4);
const SortingAlgorithmsVisualizerPage = () => {
	const initialBars = () => generateArrayWithIndicies(MAX_BAR_SIZE);
	const [bars] = useState(initialBars);
	const initialAlgorithmProcess = () => mergeSort(bars);
	const [algorithmProcess] = useState(initialAlgorithmProcess);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isEditing] = useState(false);
	const [history, { redoHistory, undoHistory, canRedoHistory, canUndoHistory, setHistory, resetHistory }] = useHistory([
		INITIAL_HISTORY
	]);

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
		console.log(history);
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

	return (
		<div>
			<MediaButtons
				moveBackward={moveBackward}
				playPauseToggle={playPauseToggle}
				moveForward={moveForward}
				resetAll={resetAll}
				isEditing={isEditing}
				isPlaying={isPlaying}
			/>
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
	);
};

export { SortingAlgorithmsVisualizerPage as default };

// style={{ height: bar[0] }}
