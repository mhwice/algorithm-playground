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
