import React, { useState } from "react";
import useInterval from "../hooks/useInterval";

const Timer = () => {
	const [doubleSeconds, setDoubleSeconds] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useInterval(() => {
		if (isActive) {
			setSeconds((prev) => prev + 1);
			setDoubleSeconds((seconds + 1) * 2);
		}
	}, 1000);

	// useEffect(() => {
	// 	if (isActive) {
	// 		useInterval(() => {
	// 			setSeconds((prev) => prev + 1);
	// 			dispatch({ type: "SET", seconds });
	// 		}, 1000);
	// 	}
	// }, [isActive]);

	// useEffect(() => {
	// 	let interval = null;
	// 	if (isActive) {
	// 		interval = setInterval(() => {
	// 			console.log("Creating Interval");
	// 			setSeconds((prev) => prev + 1);
	// 			dispatch({ type: "SET", seconds });
	// 		}, 1000);
	// 	} else {
	// 		clearInterval(interval);
	// 	}
	// 	return () => {
	// 		console.log("Destroying Interval");
	// 		clearInterval(interval);
	// 	};
	// }, [isActive]);

	return (
		<div className="app">
			<button onClick={() => setIsActive((prev) => !prev)} type="button">
				{isActive ? "Pause Timer" : "Play Timer"}
			</button>
			<h3>Seconds: {seconds}</h3>
			<h3>Seconds x2: {doubleSeconds}</h3>
		</div>
	);
};

export { Timer as default };
