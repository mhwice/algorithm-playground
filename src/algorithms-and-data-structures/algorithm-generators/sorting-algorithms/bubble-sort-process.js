function* bubbleSortProcess(unsortedArray) {
	const array = [...unsortedArray];
	for (let i = array.length; i > 0; i -= 1) {
		const animations = [];
		for (let j = 1; j < i; j += 1) {
			if (array[j - 1][0] > array[j][0]) {
				animations.push([array[j - 1][1], array[j][1], true]);
				const tmp = array[j];
				array[j] = array[j - 1];
				array[j - 1] = tmp;
			} else {
				animations.push([array[j - 1][1], array[j][1], false]);
			}
		}
		if (animations.length > 0) {
			yield animations;
		}
	}
	return array;
}

export { bubbleSortProcess as default };
