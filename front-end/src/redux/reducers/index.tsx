import {combineReducers} from 'redux';
import FriendReducer from './FriendReducer';
import PrivateMessageReducer from './PrivateMessageReducer';
import UserReducer from './UserReducer';
import userRequestReducer from './UserRequestReducer';

export default combineReducers({
    user: UserReducer,
    friends: FriendReducer,
    privateMessages: PrivateMessageReducer,
    userRequests: userRequestReducer
});