const merge = (leftArray, rightArray) => {
	const newArray = [];

	while (leftArray.length > 0 && rightArray.length > 0) {
		newArray.push(leftArray[0] < rightArray[0] ? leftArray.shift() : rightArray.shift());
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

	return merge(sortedLeftArray, sortedRightArray);
};

export { mergeSort as default };

// ! mergeSort needs to actually return the sorted array...does it?
