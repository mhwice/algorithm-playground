export const objectToArray = (obj) => Object.keys(obj).map((key) => [key, obj[key]]);
export const arrayOfObjectsToArrayOfArrays = (arrayOfObjects) =>
	arrayOfObjects.map((obj) => Object.keys(obj).map((key) => obj[key]));
