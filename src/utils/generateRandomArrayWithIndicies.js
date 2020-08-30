const getRandomNumber = (min = 50, max = 500) => Math.floor(Math.random() * (max - min + 1) + min);

const generateArrayWithIndicies = (maxSize) => {
	const randomArray = [];
	for (let i = 0; i < 8; i += 1) {
		randomArray.push([getRandomNumber(28, maxSize), i, i]);
	}
	return randomArray;
	// return [
	// 	[1, 0, 0],
	// 	[2, 1, 1],
	// 	[28, 2, 2],
	// 	[0, 3, 3],
	// 	[maxSize, 4, 4]
	// ];
};

export { generateArrayWithIndicies as default };
