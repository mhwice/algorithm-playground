function* merge(leftArray, rightArray) {
	const newArray = [];
	const animations = [];

	const startIndex = leftArray[0][2] < rightArray[0][2] ? leftArray[0][2] : rightArray[0][2];
	while (leftArray.length > 0 && rightArray.length > 0) {
		if (leftArray[0][0] < rightArray[0][0]) {
			const val = leftArray.shift();
			const barId = val[1];
			const positionToInsertAt = startIndex + newArray.length;
			const numSpaces = positionToInsertAt - val[2];
			val[2] += numSpaces;
			animations.push([barId, numSpaces]);
			newArray.push(val);
		} else {
			const val = rightArray.shift();
			const barId = val[1];
			const positionToInsertAt = startIndex + newArray.length;
			const numSpaces = positionToInsertAt - val[2];
			val[2] += numSpaces;
			animations.push([barId, numSpaces]);
			newArray.push(val);
		}
	}

	let added = 0;
	if (leftArray.length === 0) {
		rightArray.forEach((item) => {
			const numSpaces = startIndex + newArray.length + added - item[2];
			item[2] += numSpaces;
			animations.push([item[1], numSpaces]);
			added += 1;
		});
	} else {
		leftArray.forEach((item) => {
			const numSpaces = startIndex + newArray.length + added - item[2];
			item[2] += numSpaces;
			animations.push([item[1], numSpaces]);
			added += 1;
		});
	}
	yield animations;

	return leftArray.length === 0 ? newArray.concat(rightArray) : newArray.concat(leftArray);
}

function* mergeSort(unsortedArray) {
	if (unsortedArray.length <= 1) {
		return unsortedArray;
	}

	const middle = Math.floor(unsortedArray.length / 2);
	const unsortedLeftArray = unsortedArray.slice(0, middle);
	const unsortedRightArray = unsortedArray.slice(middle);

	const sortedLeftArray = yield* mergeSort(unsortedLeftArray);
	const sortedRightArray = yield* mergeSort(unsortedRightArray);

	const mergedArray = yield* merge(sortedLeftArray, sortedRightArray);
	return mergedArray;
}

export { mergeSort as default };
