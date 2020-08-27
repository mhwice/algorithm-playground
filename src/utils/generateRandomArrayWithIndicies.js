const getRandomNumber = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);

const generateArrayWithIndicies = () => {
	const randomArray = [];
	for (let i = 0; i < 8; i += 1) {
		randomArray.push([getRandomNumber(), i, i]);
	}
	return randomArray;
};

export { generateArrayWithIndicies as default };
