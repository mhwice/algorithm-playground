import { useReducer } from "react";

const reducer = (state, action) => {
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

const useHistory = (initialPresent) => {
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		present: initialPresent,
		future: []
	});

	const canRedoHistory = state.future.length > 0;
	const canUndoHistory = state.past.length > 0;

	const redoHistory = () => {
		if (canRedoHistory) {
			dispatch({ type: "REDO" });
		}
	};

	const undoHistory = () => {
		if (canUndoHistory) {
			dispatch({ type: "UNDO" });
		}
	};

	const setHistory = (newPresent) => {
		dispatch({ type: "SET", newPresent });
	};

	const resetHistory = (newPresent) => {
		dispatch({ type: "RESET", newPresent });
	};

	return [state, { redoHistory, undoHistory, canRedoHistory, canUndoHistory, setHistory, resetHistory }];
};

export { useHistory as default };
