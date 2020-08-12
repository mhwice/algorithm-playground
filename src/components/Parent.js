import React, { useState } from "react";
import Child from "./Child";

const Parent = () => {
	const [state, setState] = useState([
		{ name: "Bob", age: 10 },
		{ name: "Sue", age: 15 },
		{ name: "Harry", age: 32 }
	]);

	const buttonClicked = () => {
		setState((prev) => [prev[0], prev[1], { name: "Harry", age: 333 }]);
	};

	return (
		<div>
			<button onClick={buttonClicked} type="button">
				Click me
			</button>
			<Child person={state[0]} />
			<Child person={state[1]} />
			<Child person={state[2]} />
		</div>
	);
};

export default Parent;
