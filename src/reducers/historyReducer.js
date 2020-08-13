export default (state, action) => {
	const { past, present, future } = state;
	switch (action.type) {
		case "UNDO": {
			return {
				past: past.slice(0, past.length - 1),
				present: past[past.length - 1],
				future: [present, ...future]
			};
		}
		case "REDO": {
			return {
				past: [...past, present],
				present: future[0],
				future: future.slice(1)
			};
		}
		case "SET": {
			if (action.newPresent === present) {
				return state;
			}
			return {
				past: [...past, present],
				present: action.newPresent,
				future: []
			};
		}
		case "RESET":
			return {
				past: [],
				present: action.newPresent,
				future: []
			};
		default: {
			return state;
		}
	}
};
