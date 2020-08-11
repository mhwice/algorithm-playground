import React, { useState } from "react";

const generateRandomNumber = (min = 1, max = 10) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomObject = (ofLength = 5) => {
	const obj = {};
	for (let i = 0; i < ofLength; i += 1) {
		obj[i] = generateRandomNumber();
	}
	return obj;
};

const Demo = () => {
	const [history, setHistory] = useState([]);

	const update = () => {
		const newRandomObject = generateRandomObject();
		setHistory((previousHistory) => {
			console.log(previousHistory);
			return [...previousHistory, newRandomObject];
		});
	};

	return (
		<div className="app">
			<button onClick={update} type="button">
				Update
			</button>
		</div>
	);
};

export { Demo as default };
