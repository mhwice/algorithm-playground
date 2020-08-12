const one = (arrayOfObjects) => {
	const newPriorityQueueTableBody = [];
	arrayOfObjects.forEach((item) => {
		newPriorityQueueTableBody.push([item.node, item.priority]);
	});
	return newPriorityQueueTableBody;
};

const two = (arrayOfObjects) => {
	return arrayOfObjects.map((obj) => Object.keys(obj).map((key) => obj[key]));
};

const dummyData = [
	{ node: "A", priority: "1" },
	{ node: "B", priority: "2" },
	{ node: "C", priority: "2" }
];

console.log(JSON.stringify(one(dummyData), null, 4));

console.log(JSON.stringify(two(dummyData), null, 4));
