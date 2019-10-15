import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
//import logger from 'redux-logger';
import authReducer from "../reducers/auth-reducer";
import userReducer from "../reducers/user-reducer";

const rootReducer = combineReducers({ user: userReducer, auth: authReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
