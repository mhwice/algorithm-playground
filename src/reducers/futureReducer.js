export default (state, action) => {
	switch (action.type) {
		case "PUSH":
			return [...state, action.historyItem];
		case "POP":
			return state.splice(0, state.length - 1);
		case "RESET":
			return [];
		default:
			return state;
	}
};
