const merge = (leftArray, rightArray) => {
	const newArray = [];

	const startIndex = leftArray[0][2] < rightArray[0][2] ? leftArray[0][2] : rightArray[0][2];
	while (leftArray.length > 0 && rightArray.length > 0) {
		if (leftArray[0][0] < rightArray[0][0]) {
			const val = leftArray.shift();
			const positionToInsertAt = startIndex + newArray.length;
			const numSpaces = positionToInsertAt - val[2];
			val[2] += numSpaces;
			newArray.push(val);
		} else {
			const val = rightArray.shift();
			const positionToInsertAt = startIndex + newArray.length;
			const numSpaces = positionToInsertAt - val[2];
			val[2] += numSpaces;
			newArray.push(val);
		}
	}

	let added = 0;
	if (leftArray.length === 0) {
		rightArray.forEach((item) => {
			const numSpaces = startIndex + newArray.length + added - item[2];
			item[2] += numSpaces;
			added += 1;
		});
	} else {
		leftArray.forEach((item) => {
			const numSpaces = startIndex + newArray.length + added - item[2];
			item[2] += numSpaces;
			added += 1;
		});
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
