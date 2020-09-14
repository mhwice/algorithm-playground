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
			const idx = this.queue.findIndex((x) => x.node === newItem.node);
			if (idx !== -1) {
				this.queue[idx] = newItem;
			} else {
				this.insert(newItem, this.queue);
			}
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
