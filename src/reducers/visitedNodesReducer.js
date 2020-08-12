export default (state, action) => {
	switch (action.type) {
		case "ADD_NODES":
			return [...state, ...action.nodes];
		case "REMOVE_NODES":
			return state.filter((node) => !action.nodes.includes(node));
		case "RESET":
			return [];
		default:
			return state;
	}
};
