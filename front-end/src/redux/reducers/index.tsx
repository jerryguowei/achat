import {combineReducers} from 'redux';
import FriendReducer from './FriendReducer';
import UserReducer from './UserReducer';
import userRequestReducer from './UserRequestReducer';

export default combineReducers({
    user: UserReducer,
    friends: FriendReducer,
    userRequests: userRequestReducer
});