import React, { useState } from "react";
import { generatePercentageArrayWithIndicies } from "../utils/generateRandomArrayWithIndicies";
import MediaButtons from "./MediaButtons";
import useHistory from "../hooks/useHistory";
import useInterval from "../hooks/useInterval";
import SelectBox from "./SelectBox";
import SortingEditor from "./SortingEditor";
import SortingAlgorithmManager from "../algorithms/SortingAlgorithmManager";

const getSettings = (val) => {
	switch (val) {
		case "1":
			return "merge-sort";
		case "2":
			return "insertion-sort";
		case "3":
			return "quick-sort";
		case "4":
			return "bubble-sort";
		default:
	}
};

const INITIAL_HISTORY = [];
const SortingAlgorithmsVisualizerPage = () => {
	const [selected, setSelected] = useState("4");
	const initialBars = () => generatePercentageArrayWithIndicies();
	const [bars, setBars] = useState(initialBars);
	const initialAlgorithmProcess = () => new SortingAlgorithmManager(getSettings(selected), bars);
	const [algorithmProcess, setAlgorithmProcess] = useState(initialAlgorithmProcess);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [history, { redoHistory, undoHistory, canRedoHistory, canUndoHistory, setHistory, resetHistory }] = useHistory([
		INITIAL_HISTORY
	]);

	// const dummyStep = () => {
	// 	const result = algorithmProcess.next();
	// 	console.log("result", JSON.stringify(result, null, 2));
	// 	if (!result.done) {
	// 		const { animations } = result;
	// 		setHistory(animations);
	// 		algorithmProcess.doAnimation(animations).then(() => {
	// 			setIsAnimating(false);
	// 		});
	// 	}
	// };

	const takeStep = () => {
		const result = algorithmProcess.next();
		if (!result.done) {
			const { animations } = result;
			setHistory(animations);
			algorithmProcess.doAnimation(animations).then(() => {
				setIsAnimating(false);
			});
		} else {
			setIsPlaying(false);
			setIsAnimating(false);
		}
	};

	const redoStep = () => {
		algorithmProcess.doAnimation(history.future[0]).then(() => {
			setIsAnimating(false);
		});
		redoHistory();
	};

	const undoStep = () => {
		if (canUndoHistory) {
			algorithmProcess.undoAnimation(history).then(() => {
				setIsAnimating(false);
			});
		}
		undoHistory();
	};

	const resetAll = () => {
		if (!isAnimating) {
			algorithmProcess.clear();
			setAlgorithmProcess(initialAlgorithmProcess);
			resetHistory(INITIAL_HISTORY);
		}
	};

	const moveBackward = () => {
		if (!isAnimating) {
			setIsAnimating(true);
			undoStep();
		}
	};

	// Moves forward one step
	const moveForward = () => {
		if (!isAnimating) {
			setIsAnimating(true);
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
		if (isPlaying) {
			moveForward();
		}
	}, 0);

	const handleClick = (radio) => {
		const { value } = radio.target;
		if (value !== selected) {
			setSelected(value);
			setAlgorithmProcess(new SortingAlgorithmManager(getSettings(value), bars));
			algorithmProcess.clear();
			resetHistory(INITIAL_HISTORY);
		}
	};

	const editBars = () => {
		if (!isAnimating) {
			resetAll();
			setIsEditing((prev) => !prev);
		}
	};

	const isNotNumber = (str) => !str.match(/^\d+$/);

	const isNotValidNumber = (str) => Number(str) < 1 || Number(str) > 100;

	const getValidString = (str) => {
		if (isNotNumber(str)) {
			return undefined;
		}

		if (isNotValidNumber(str)) {
			return undefined;
		}

		return str;
	};

	const formatNumber = (str) => Number(str) / 100;

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
			<SelectBox handleClick={handleClick} items={["Merge Sort", "Insertion Sort", "Quick Sort", "Bubble Sort"]} />
			<div className="sorting-visualizer-content">
				{isEditing && (
					<SortingEditor currentBars={bars.map((bar) => Math.round(bar[0] * 100))} barInputChanged={barInputChanged} />
				)}
				<div className="bar-wrapper">
					<div className="bars">
						{bars.map((bar, barIndex) => {
							return (
								<div className="bar" key={barIndex} style={{ height: `${bar[0] * 100}%` }}>
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
				isViewingTable={false}
			/>
		</div>
	);
};

export { SortingAlgorithmsVisualizerPage as default };
