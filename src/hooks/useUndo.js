import { useReducer, useCallback } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

const initialState = {
	past: [],
	present: null,
	future: []
};

const undoReducer = (state, action) => {
	const { past, present, future } = state;

	switch (action.type) {
		case UNDO:
			return {
				past: past.slice(0, past.length - 1),
				present: past[past.length - 1],
				future: [present, ...future]
			};

		case REDO:
			return {
				past: [...past, present],
				present: future[0],
				future: future.slice(1)
			};

		case SET:
			if (action.newPresent === present) {
				return state;
			}
			return {
				past: [...past, present],
				present: action.newPresent,
				future: []
			};

		case RESET:
			return {
				past: [],
				present: action.newPresent,
				future: []
			};

		default:
			return state;
	}
};

const useUndo = (initialPresent) => {
	const [state, dispatch] = useReducer(undoReducer, {
		...initialState,
		present: initialPresent
	});

	const canUndo = state.past.length !== 0;
	const canRedo = state.future.length !== 0;

	const undo = useCallback(() => {
		if (canUndo) {
			dispatch({ type: UNDO });
		}
	}, [canUndo]);

	const redo = useCallback(() => {
		if (canRedo) {
			dispatch({ type: REDO });
		}
	}, [canRedo]);

	// whats the extra argument?
	const set = useCallback((newPresent) => dispatch({ type: SET, newPresent }), []);
	const reset = useCallback((newPresent) => dispatch({ type: RESET, newPresent }), []);

	return [state, { set, reset, undo, redo, canUndo, canRedo }];
};

export default useUndo;
