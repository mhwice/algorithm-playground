function* two(a, b, c, d) {
	yield {
		d
	};

	const result = two(a, b, c, d);
	if (result) {
		return result;
	}
}

function* one(a, b, c) {
	const d = "someValue";
	yield* two(a, b, c, d);
}

const iterator = one(a, b, c);
iterator.next().value; // I want this to be 'd'

const data = [
	[27, { previousIndex: 3, newIndex: 1 }],
	[50, { previousIndex: 1, newIndex: 3 }],
	[51, { previousIndex: 0, newIndex: 1 }],
	[74, { previousIndex: 2, newIndex: 3 }]
];
