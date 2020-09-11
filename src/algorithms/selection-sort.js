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

// const unsortedArray = [7, 8, 7, 4, 10, 3, 5];
// const sortedArray = selectionSort(unsortedArray);
// console.log(JSON.stringify(unsortedArray, null, 2));
// console.log(JSON.stringify(sortedArray, null, 2));

// const process = selectionSortProcess(unsortedArray);
// let result = process.next();
// while (!result.done) {
// 	console.log(JSON.stringify(result.value, null, 2));
// 	result = process.next();
// }

export { selectionSortProcess as default };
