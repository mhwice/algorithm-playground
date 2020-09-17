const merge = (leftArray, rightArray) => {
	const newArray = [];
	while (leftArray.length > 0 && rightArray.length > 0) {
		if (leftArray[0] < rightArray[0]) {
			newArray.push(leftArray.shift());
		} else {
			newArray.push(rightArray.shift());
		}
	}
	return leftArray.length === 0 ? newArray.concat(rightArray) : newArray.concat(leftArray);
};

const mergeSort = (unsortedArray) => {
	if (unsortedArray.length <= 1) {
		return unsortedArray;
	}

	const middle = Math.floor(unsortedArray.length / 2);
	const unsortedLeftArray = unsortedArray.slice(0, middle);
	const unsortedRightArray = unsortedArray.slice(middle);

	const sortedLeftArray = mergeSort(unsortedLeftArray);
	const sortedRightArray = mergeSort(unsortedRightArray);

	const mergedArray = merge(sortedLeftArray, sortedRightArray);
	return mergedArray;
};

export { mergeSort as default };

const unsortedArray = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]; // [2, 6, 5, 3, 8, 7, 1, 0];
const sortedArray = mergeSort(unsortedArray);
console.log(JSON.stringify(sortedArray, null, 2));
