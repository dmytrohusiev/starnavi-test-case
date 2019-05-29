import { put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import * as actionTypes from "../actions/types";

// Game Settings fetching
function* fetchGameSettings() {
	try {
		const response = yield axios.get("/game-settings");
		yield put({
			type: actionTypes.GAME_SETTINGS_FETCHED,
			gameSettings: response.data
		});
	} catch (error) {
		yield put({ type: actionTypes.GET_ERRORS, error: error.response.data });
	}
}

function* fetchGameSettingsWatcher() {
	yield takeLatest(actionTypes.FETCH_GAME_SETTINGS_START, fetchGameSettings);
}

// Winners fetching
function* fetchWinners() {
	try {
		const response = yield axios.get("/winners");
		yield put({ type: actionTypes.FETCH_WINNERS_SUCCESS, winners: response.data });
	} catch (error) {
		yield put({ type: actionTypes.GET_ERRORS, error: error.response.data });
	}
}

function* fetchWinnersWatcher() {
	yield takeLatest(actionTypes.FETCH_WINNERS_START, fetchWinners);
}

// Send winner to server
function* sendWinner(action) {
	try {
		const response = yield axios.post("/winners", {
			winner: action.winner,
			date: new Date().toLocaleString()
		});
		yield put({ type: actionTypes.FETCH_WINNERS_SUCCESS, winners: response.data });
	} catch (error) {
		yield put({ type: actionTypes.GET_ERRORS, error: error.response.data });
	}
}

function* sendWinnerWatcher() {
	yield takeLatest(actionTypes.GAME_OVER, sendWinner);
}
export default function* rootSaga() {
	yield all([fetchGameSettingsWatcher(), fetchWinnersWatcher(), sendWinnerWatcher()]);
}
