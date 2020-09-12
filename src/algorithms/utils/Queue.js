import binarySearch from "../binary-search";

/*

	Format:

	queue = [ 
    "A",
    "B",
    "C",
    "D"
	]

	Usage:

	const queue = new Queue();
	queue.enqueue("A");
	queue.enqueue("B");
	queue.enqueue("C");
	const node = queue.dequeue();

*/

class Queue {
	constructor() {
		this.queue = [];
	}

	locationOf = (array, value) => {
		return binarySearch(array, value, 0, array.length - 1);
	};

	enqueue = (newItem) => {
		this.queue.push(newItem);
	};

	dequeue = () => {
		return this.queue.pop();
	};

	isEmpty = () => {
		return this.queue.length === 0;
	};

	toString = () => {
		console.log("queue", JSON.parse(JSON.stringify(this.queue)));
	};
}

export { Queue as default };
