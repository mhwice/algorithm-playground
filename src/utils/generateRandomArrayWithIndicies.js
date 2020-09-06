const getRandomNumber = (min = 50, max = 500) => Math.floor(Math.random() * (max - min + 1) + min);

const generateArrayWithIndicies = (maxSize) => {
	const randomArray = [];
	for (let i = 0; i < 8; i += 1) {
		randomArray.push([getRandomNumber(28, maxSize), i, i]);
	}
	return randomArray;
};

const generatePercentageArrayWithIndicies = () => {
	const randomArray = [];
	for (let i = 0; i < 8; i += 1) {
		randomArray.push([getRandomNumber(1, 100) / 100, i, i]);
	}
	// return [
	// 	[0.7, 0, 0],
	// 	[0.5, 1, 1],
	// 	[0.8, 2, 2],
	// 	[0.4, 3, 3]
	// ];
	return randomArray;
};

export { generateArrayWithIndicies as default, generatePercentageArrayWithIndicies };
