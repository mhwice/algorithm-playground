import React from "react";

const Child = ({ person }) => {
	return (
		<div>
			{console.log(`re-rendering with ${JSON.stringify(person)}`)}
			<h1>{JSON.stringify(person)}</h1>
		</div>
	);
};

export default Child;
