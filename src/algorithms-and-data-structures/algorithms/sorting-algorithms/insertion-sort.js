const insertionSort = (array) => {
	// Loop over array
	for (let i = 1; i < array.length; i += 1) {
		// Point to an item
		const current = array[i];
		let j = i - 1;

		// If the item to the left is bigger than the current item, move the left item to the current items spot
		// Loop until this is not the case
		while (array[j] > current) {
			array[j + 1] = array[j];
			j -= 1;
		}

		// Then insert the current item in its new sorted spot
		array[j + 1] = current;
	}

	return array;
};

export { insertionSort as default };
