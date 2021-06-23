import { FriendState } from "../../Model/StateModel";
import { UserInfo } from "../../Model/UserInfoModel";
import { FRIEND_TYPE } from '../actions/friendAction';
import { LOGIN_TYPE } from "../actions/userAction";


const friendReducer = (prevState:FriendState = {} , action:{type:string, payload:any, error?:string}) => {
    switch (action.type) {
        case LOGIN_TYPE.LOGOUT:
            return {};
        case FRIEND_TYPE.UPDATE_LIST:
            return copeUpdateFriend(action.payload, prevState);
        case FRIEND_TYPE.REMOVE_LIST:
            return copeRemoveFriend(action.payload, prevState);
        default: 
            return prevState;
    }
}

const copeUpdateFriend = (friendList: Array<UserInfo>, prevState: FriendState) => {
     const newState = {...prevState}
     for(let friend of friendList){
        newState[friend.username] = friend;
     }
     return newState;
}

const copeRemoveFriend = (friendList: Array<UserInfo>, prevState: FriendState) => {
    const newState = {...prevState}
    for(let friend of friendList){
        delete newState[friend.username];
     }
     return newState;
}

export default friendReducer;