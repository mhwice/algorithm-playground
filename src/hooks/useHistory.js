import { useReducer, useCallback } from "react";

const historyReducer = (state, action) => {
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
				present: [...action.newPresent],
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
	const [state, dispatch] = useReducer(historyReducer, {
		past: [],
		present: initialPresent,
		future: []
	});

	const canRedoHistory = state.future.length > 0;
	const canUndoHistory = state.past.length > 0;

	const undoHistory = useCallback(() => {
		if (canUndoHistory) {
			dispatch({ type: "UNDO" });
		}
	}, [canUndoHistory]);

	const redoHistory = useCallback(() => {
		if (canRedoHistory) {
			dispatch({ type: "REDO" });
		}
	}, [canRedoHistory]);

	const setHistory = useCallback((newPresent) => dispatch({ type: "SET", newPresent }), []);
	const resetHistory = useCallback((newPresent) => dispatch({ type: "RESET", newPresent }), []);

	return [state, { redoHistory, undoHistory, canRedoHistory, canUndoHistory, setHistory, resetHistory }];
};

export { useHistory as default };
