import { combineReducers } from "redux"
import { PrivateMessage } from "../../Model/MessageModel";
import { FriendAllMessages } from "../../Model/StateModel";

import {FRIEND_TYPE, PRIVATE_MESSAGE_TYPE} from '../actions/friendAction'
import { LOGIN_TYPE } from "../actions/userAction";

const friendReducer = (prevState = {} , action:{type:string, payload:any, error?:string}) => {
    switch (action.type) {
        case LOGIN_TYPE.LOGOUT:
            return {};
        case FRIEND_TYPE.UPDATE_LIST:
            return Array.isArray(action.payload) ? 
                  action.payload.reduce((accumulator, item) => {
                    accumulator[item.username] = item;
                    return accumulator;
                  }, {} )
            : {};
        default: 
            return prevState;
    }
}

const messageReducer = (prevState = {}, action : {type:string, payload:any, error?:string}) => {
    switch(action.type) {
        case LOGIN_TYPE.LOGOUT:
            return {};
        case PRIVATE_MESSAGE_TYPE.INIT_LIST:
            return action.payload ? action.payload : {};
        case PRIVATE_MESSAGE_TYPE.ADD_LIST:
            return copeAddingMessage(action.payload, prevState);
            default:
                return prevState;
    }
}

function copeAddingMessage (messageList: [PrivateMessage], prevState: FriendAllMessages) {
    var newState:FriendAllMessages = {}; 
    for(let username in prevState){
        newState[username] =  { 
            "minMsgId" : prevState[username].minMsgId, 
            "messageList": [...prevState[username].messageList]};
    }

    for(let msg of messageList) {
        let username = msg.type !== 'FROM' ? msg.fromUsername : msg.toUsername;
        let existingUserMessages = username in newState ?  newState[username].messageList : []; 
        if(!(username in newState)){
            newState[username] = {"minMsgId": msg.messageId, "messageList" : existingUserMessages};
        }

        if(existingUserMessages.length === 0){
            existingUserMessages.push(msg);
            continue;
        }
        let insert = false;
        for(let i = 0 ; i < existingUserMessages.length; i++){
            let item = existingUserMessages[i];
            if(item.messageId === msg.messageId){
                existingUserMessages[i] = msg;
                insert = true;
                break;
            }
            if(msg.messageId > item.messageId) {
                existingUserMessages.splice(i, 0, msg);
                insert = true;
                break;
            }
        }
        if(!insert){
            existingUserMessages.push(msg);
        }
    }
    return newState;
}

function notViewCountReducer(prevState = 0, action: {type:string, payload:any, error?:string}){
    switch(action.type){
        case PRIVATE_MESSAGE_TYPE.NOT_VIEW_COUNT:
            return action.payload;
        default:
            return prevState;
    }
}

export default combineReducers(
    {
        friendList: friendReducer, 
        allMessages : messageReducer,
        notViewCount: notViewCountReducer
    })