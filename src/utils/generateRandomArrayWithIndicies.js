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
	return randomArray;
};

export { generateArrayWithIndicies as default, generatePercentageArrayWithIndicies };
