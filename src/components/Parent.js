import React, { useState } from "react";

function* someProcess(someValue) {
	console.log("Creating someProcess");
	for (let i = 0; i < someValue; i += 1) {
		yield i;
	}
}

const process = someProcess(10);

const Parent = () => {
	// A generator function that yields the numbers 1 through 10

	// Getting an instance of the generator
	// const process = someProcess(10);

	// const [process] = useState(someProcess(10));

	// Some state for the count
	const [count, setCount] = useState(0);

	// onClick handler to get the next yield value and set the count state to that value
	const getNextYieldValue = () => {
		const nextValue = process.next().value;
		console.log("nextValue", nextValue);
		setCount(nextValue);
	};

	return (
		<div>
			<button onClick={getNextYieldValue} type="button">
				Get Next Value
			</button>
			<h1>{count}</h1>
		</div>
	);
};

export default Parent;
