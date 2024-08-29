 import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import createSagaMiiddleware  from "redux-saga";
import rootReducer from "./Reducer/index";
import rootSaga from "./Saga/index";

const saga = createSagaMiiddleware();

const composrEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const store = createStore(
  rootReducer,
  composrEnhancers(applyMiddleware(saga))
);

saga.run(rootSaga);
