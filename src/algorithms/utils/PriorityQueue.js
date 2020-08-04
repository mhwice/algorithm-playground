/*

	Format:

	queue = [
		{ node: "A", priority: 1 },
		{ node: "A", priority: 3 },
		{ node: "A", priority: 5 },
		{ node: "A", priority: 8 }
	]

	Usage:

	const priorityQueue = new PriorityQueue();
	priorityQueue.enqueue({ node: "A", priority: 2 });
	priorityQueue.enqueue({ node: "B", priority: 3 });
	priorityQueue.enqueue({ node: "C", priority: 1 });
	priorityQueue.enqueue({ node: "D", priority: 6 });
	priorityQueue.enqueue({ node: "E", priority: 2 });
	const { node, priority } = priorityQueue.dequeue();

*/

class PriorityQueue {
	constructor() {
		this.queue = [];
	}

	locationOf = (array, value) => {
		let low = 0;
		let high = array.length;

		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (array[mid].priority < value.priority) {
				low = mid + 1;
			} else {
				high = mid;
			}
		}
		return low;
	};

	insert = (item, array) => {
		const index = this.locationOf(array, item);
		array.splice(index, 0, item);
	};

	enqueue = (newItem) => {
		if (this.isEmpty()) {
			this.queue.push(newItem);
		} else {
			this.insert(newItem, this.queue);
		}
	};

	dequeue = () => {
		return this.queue.shift();
	};

	isEmpty = () => {
		return this.queue.length === 0;
	};

	toString = () => {
		console.log("queue", JSON.parse(JSON.stringify(this.queue)));
	};
}

export { PriorityQueue as default };
