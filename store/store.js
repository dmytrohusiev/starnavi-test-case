import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer, { initialState } from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const devTools =
	(typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		process.env.NODE_ENV !== "production" &&
		window.__REDUX_DEVTOOLS_EXTENSION__()) ||
	compose;

const composedMiddlewares = compose(
	applyMiddleware(sagaMiddleware),
	devTools
);

const makeStore = (state = initialState) => {
	const store = createStore(reducer, state, composedMiddlewares);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default makeStore;
