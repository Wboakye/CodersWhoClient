import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import authReducer from '../reducers/auth-reducer';
import userReducer from '../reducers/user-reducer';


const rootReducer = combineReducers({user: userReducer, auth: authReducer})


const store = createStore(rootReducer, {}, applyMiddleware(thunk));
export default store;