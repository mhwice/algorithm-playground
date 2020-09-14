const bubbleSort = (array) => {
	for (let i = array.length; i > 0; i -= 1) {
		for (let j = 1; j < i; j += 1) {
			if (array[j - 1] > array[j]) {
				const tmp = array[j];
				array[j] = array[j - 1];
				array[j - 1] = tmp;
			}
		}
	}
	return array;
};

export { bubbleSort as default };
