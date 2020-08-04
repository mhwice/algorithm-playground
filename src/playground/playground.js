// const sortedIndex = (array, value) => {
// 	let low = 0;
// 	let high = array.length;

// 	while (low < high) {
// 		const mid = Math.floor((low + high) / 2);
// 		if (array[mid] < value) {
// 			low = mid + 1;
// 		} else {
// 			high = mid;
// 		}
// 	}
// 	return low;
// };

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const val = 11.99;
// console.log(sortedIndex(arr, val));

const sortedIndexObjects = (array, value) => {
	let low = 0;
	let high = array.length;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (array[mid].priority < value.priority) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}
	return low;
};

const arrayOfObjects = [
	{ node: "A", priority: 1 },
	{ node: "B", priority: 2 },
	{ node: "C", priority: 3 },
	{ node: "D", priority: 4 },
	{ node: "E", priority: 5 },
	{ node: "F", priority: 6 },
	{ node: "G", priority: 70 },
	{ node: "H", priority: 80 },
	{ node: "I", priority: 90 }
];
const newObject = { node: "Z", priority: 2 };
// console.log(sortedIndexObjects(arrayOfObjects, newObject));

const insertObject = (array, obj) => {
	const index = sortedIndexObjects(array, obj);
	array.splice(index, 0, obj);
	console.log(array);
};

insertObject(arrayOfObjects, newObject);
