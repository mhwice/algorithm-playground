const quicksort = (array) => {
	if (array.length <= 1) {
		return array;
	}

	const pivotIndex = Math.floor(array.length / 2);
	const pivotElement = array[pivotIndex];
	const leftArray = [];
	const rightArray = [];

	array.forEach((element, index) => {
		if (index !== pivotIndex) {
			if (element <= pivotElement) {
				leftArray.push(element);
			} else {
				rightArray.push(element);
			}
		}
	});

	const sortedLeftArray = quicksort(leftArray);
	const sortedRightArray = quicksort(rightArray);

	return [...sortedLeftArray, pivotElement, ...sortedRightArray];
};

export { quicksort as default };

// const unsortedArray = [1, 3, 2]; // [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]; // [2, 6, 5, 3, 8, 7, 1, 0];
// const sortedArray = quicksort(unsortedArray);
// console.log(JSON.stringify(sortedArray, null, 2));
