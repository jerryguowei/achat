import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import combineReducer from './reducers';

const store = createStore(combineReducer,
     composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;