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

function* insertionSortProcess(array) {
	const arrayCopy = [...array];

	// Loop over array
	for (let i = 1; i < arrayCopy.length; i += 1) {
		const animations = [];

		// Point to an item
		const current = arrayCopy[i];
		animations.push(current[1]);
		animations.push(arrayCopy.slice(0, i).map((item) => item[1]));

		let j = i - 1;

		// If the item to the left is bigger than the current item, move the left item to the current items spot
		// Loop until this is not the case
		const biggerItems = [];
		while (j >= 0 && arrayCopy[j][0] > current[0]) {
			biggerItems.push(arrayCopy[j][1]);
			arrayCopy[j + 1] = arrayCopy[j];
			j -= 1;
		}

		animations.push(biggerItems);

		// Then insert the current item in its new sorted spot
		arrayCopy[j + 1] = current;
		yield animations;
	}

	return arrayCopy;
}

export { insertionSort as default, insertionSortProcess };
