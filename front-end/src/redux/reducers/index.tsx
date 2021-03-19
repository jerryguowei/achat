import {combineReducers} from 'redux';
import FriendReducer from './FriendReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    user: UserReducer,
    friends: FriendReducer
});