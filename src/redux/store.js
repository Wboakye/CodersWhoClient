import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers/auth-reducer';

const store = createStore(reducer, {}, applyMiddleware(thunk));
export default store;