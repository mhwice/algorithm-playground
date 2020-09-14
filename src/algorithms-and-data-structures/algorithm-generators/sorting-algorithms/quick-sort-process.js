function* quicksortProcess(array) {
	if (array.length <= 1) {
		return array;
	}

	const leftSize = array[0][2];
	const pivotIndex = array.length - 1;
	const pivotElement = array[pivotIndex];
	const leftArray = [];
	const rightArray = [];

	const animations = [[], [], []];

	array.forEach((element, index) => {
		if (index !== pivotIndex) {
			if (element[0] <= pivotElement[0]) {
				const newLeftIndex = leftArray.length + leftSize;
				animations[0].push([element[1], newLeftIndex - element[2]]);
				leftArray.push([element[0], element[1], newLeftIndex]);
			} else {
				rightArray.push(element);
			}
		}
	});

	for (let i = 0; i < rightArray.length; i += 1) {
		const element = rightArray[i];
		const newRightIndex = leftArray.length + leftSize + 1 + i;
		animations[2].push([element[1], newRightIndex - element[2]]);
		rightArray[i][2] = newRightIndex;
	}

	const newPivotIndex = leftSize + leftArray.length;
	animations[1].push([pivotElement[1], newPivotIndex - pivotElement[2]]);
	array[pivotIndex][2] = newPivotIndex;

	yield animations;

	const sortedLeftArray = yield* quicksortProcess(leftArray);
	const sortedRightArray = yield* quicksortProcess(rightArray);

	return [...sortedLeftArray, pivotElement, ...sortedRightArray];
}

export { quicksortProcess as default };
