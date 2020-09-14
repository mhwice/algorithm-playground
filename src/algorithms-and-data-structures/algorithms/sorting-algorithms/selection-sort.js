const selectionSort = (unsortedArray) => {
	const array = [...unsortedArray];
	for (let i = 0; i < array.length; i += 1) {
		let minimumIndex = i;
		for (let j = i; j < array.length; j += 1) {
			if (array[j] < array[minimumIndex]) {
				minimumIndex = j;
			}
		}
		[array[i], array[minimumIndex]] = [array[minimumIndex], array[i]];
	}

	return array;
};

export { selectionSort as default };
