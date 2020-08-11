import React, { useState, useEffect } from "react";

const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);

	const toggle = () => {
		setIsActive(!isActive);
	};

	const reset = () => {
		setSeconds(0);
		setIsActive(false);
	};

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds((previousSeconds) => previousSeconds + 1);
			}, 1000);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval); // reset pressed
		}
		return () => clearInterval(interval);
	}, [isActive, seconds]);

	return (
		<div className="app">
			<div className="time">{seconds}s</div>
			<div className="row">
				<button
					onClick={toggle}
					className={`button button-primary button-primary-${isActive ? "active" : "inactive"}`}
					type="button"
				>
					{isActive ? "Pause" : "Start"}
				</button>
				<button onClick={reset} className="button-secondary" type="button">
					Reset
				</button>
			</div>
		</div>
	);
};

export { Timer as default };
