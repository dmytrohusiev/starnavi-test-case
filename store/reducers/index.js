import * as actionTypes from "../actions/types";

export const initialState = {
	gameSettings: [],
	isPlaying: false,
	isGameOver: false,
	field: null,
	delay: null,
	name: "",
	winner: null,
	winnersLoading: false,
	winners: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GAME_SETTINGS_START:
			return { ...state, loading: true };
		case actionTypes.GAME_SETTINGS_FETCHED:
			return { ...state, loading: false, gameSettings: action.gameSettings };
		case actionTypes.SET_GAME_SETTINGS:
			return { ...state, ...action.payload };
		case actionTypes.START_GAME:
			return { ...state, isPlaying: true, isGameOver: false, name: action.name, winner: null };
		case actionTypes.GAME_OVER:
			return {
				...state,
				isPlaying: false,
				isGameOver: true,
				winner: action.winner,
				winnersLoading: true
			};
		case actionTypes.FETCH_WINNERS_START: {
			return { ...state, winnersLoading: true };
		}
		case actionTypes.FETCH_WINNERS_SUCCESS:
			return { ...state, winners: action.winners, winnersLoading: false };
		default:
			return state;
	}
};
export default reducer;
