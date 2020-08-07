const arraycopy = (sourceArray, sourceIndex, targetArray, targetIndex, length) => {
	targetArray.splice(targetIndex, length, ...sourceArray.slice(sourceIndex, sourceIndex + length));
};

const merge = (array, temp, leftStart, rightEnd) => {
	const leftEnd = (rightEnd + leftStart) / 2;
	const rightStart = leftEnd + 1;
	const size = rightEnd - leftStart + 1;

	let left = leftStart;
	let right = rightStart;
	let index = leftStart;

	while (left <= leftEnd && right <= rightEnd) {
		if (array[left] <= array[right]) {
			temp[index] = array[left];
			left += 1;
		} else {
			temp[index] = array[right];
			right += 1;
		}
		index += 1;
	}

	arraycopy(array, left, temp, index, leftEnd - left + 1);
	arraycopy(array, right, temp, index, rightEnd - right + 1);
	arraycopy(temp, leftStart, array, leftStart, size);
};

const mergeSortEfficient = (array, temp, leftStart, rightEnd) => {
	if (leftStart < rightEnd) {
		return;
	}

	const middle = (leftStart + rightEnd) / 2;
	mergeSortEfficient(array, temp, leftStart, middle);
	mergeSortEfficient(array, temp, middle + 1, rightEnd);

	merge(array, temp, leftStart, rightEnd);
};

export { mergeSortEfficient as default };
