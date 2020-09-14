const binarySearch = (array, element, left, right) => {
	if (right >= left) {
		const middle = left + (right - left) / 2;

		if (array[middle] === element) {
			return middle;
		}

		if (array[middle] > element) {
			return binarySearch(array, element, left, middle - 1);
		}

		return binarySearch(array, element, middle + 1, right);
	}

	return -1;
};

// const array = [3, 4, 5, 7, 7, 8, 10];
// array.forEach((element) => {
// 	const index = binarySearch(array, element, 0, array.length - 1);
// 	console.log(
// 		`The element ${element} is ${index !== -1 ? "in" : "NOT in"} the array ${array} ${
// 			index !== -1 && "and is at the index"
// 		} ${index}`
// 	);
// });

export { binarySearch as default };
