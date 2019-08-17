import { createStore } from "redux";

const initialState = {
	darkTheme: false,
	mobileOpen: false,
	season: "current"
};

const actionTypes = {
	DARKTHEME: "DARK_THEME",
	MOBILEOPEN: "MOBILE_OPEN"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DARKTHEME:
			return { ...state, darkTheme: !state.darkTheme };
		case actionTypes.MOBILEOPEN:
			return { ...state, mobileOpen: !state.mobileOpen };
		default:
			return state;
	}
};

export const toggleDarkTheme = () => {
	return { type: actionTypes.DARKTHEME };
};

export const toggleMobileOpen = () => {
	return { type: actionTypes.MOBILEOPEN };
};

const makeStore = (state = initialState, options) => {
	return createStore(reducer, state);
};

export default makeStore;
