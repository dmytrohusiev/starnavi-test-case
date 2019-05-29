import * as actionTypes from "./types";

export const fetchGameSettings = () => ({ type: actionTypes.FETCH_GAME_SETTINGS_START });

export const setGameSettings = settings => ({
	type: actionTypes.SET_GAME_SETTINGS,
	payload: settings
});

export const startGame = name => ({ type: actionTypes.START_GAME, name });

export const gameOver = winner => ({
	type: actionTypes.GAME_OVER,
	winner
});

export const fetchWinners = () => ({ type: actionTypes.FETCH_WINNERS_START });
