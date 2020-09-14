function* selectionSortProcess(unsortedArray) {
	const array = [...unsortedArray];
	for (let i = 0; i < array.length; i += 1) {
		const animations = [];
		let minimumIndex = i;
		for (let j = i; j < array.length; j += 1) {
			if (array[j][0] < array[minimumIndex][0]) {
				minimumIndex = j;
				animations.push([array[j][1], array[j][2]]);
			} else if (j === i) {
				animations.push([array[j][1], array[j][2]]);
			} else {
				animations.push([array[j][1]]);
			}
		}
		if (animations.length > 0) {
			yield animations;
		}

		const tmp = array[i];
		array[i] = [array[minimumIndex][0], array[minimumIndex][1], array[i][2]];
		array[minimumIndex] = [tmp[0], tmp[1], array[minimumIndex][2]];
	}

	return array;
}

export { selectionSortProcess as default };
