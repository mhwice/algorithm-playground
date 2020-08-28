const getRandomNumber = (min = 50, max = 500) => Math.floor(Math.random() * (max - min + 1) + min);

const generateArrayWithIndicies = (maxSize) => {
	const randomArray = [];
	for (let i = 0; i < 25; i += 1) {
		randomArray.push([getRandomNumber(maxSize / 10, maxSize), i, i]);
	}
	return randomArray;
	// return [
	// 	[70, 0, 0],
	// 	[50, 1, 1],
	// 	[30, 2, 2],
	// 	[10, 3, 3]
	// ];
};

export { generateArrayWithIndicies as default };
