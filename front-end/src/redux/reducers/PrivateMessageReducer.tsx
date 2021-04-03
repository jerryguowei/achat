import { combineReducers } from "redux";
import { PrivateMessage } from "../../Model/MessageModel";
import { Action } from "../../Model/StateModel";
import { messageReverseSortComparator } from "../../utils/GlobalUtils";
import { PRIVATE_MESSAGE_TYPE } from "../actions/messageAction";
import values from 'lodash/values';
import omit from 'lodash/omit';


function notViewCountReducer(state=0, action: Action) {
    switch(action.type) {
        case PRIVATE_MESSAGE_TYPE.NOT_VIEW_COUNT:
            return action.payload;
        default:
            return state;
    }
}

const byUserMessageReducer = (state={}, action: Action)=> {
    switch(action.type) {
        case PRIVATE_MESSAGE_TYPE.ADD_MESSAGE:
            return copeAddMessage(state, action.payload);
        default:
            return state;
    }
    

}
function copeAddMessage(prevState={} as {[username:string]: Array<PrivateMessage>}, 
    userMessageList:{[username:string]: Array<PrivateMessage>}) {
    let newState = {...prevState};
    for(let username in userMessageList){
        if(username in newState) {
            let stateToMessage = newState[username].reduce((accumulator, msg) => {
                accumulator[msg.state] = msg;
                return accumulator;
            }, {} as any);
            for(let msg  of userMessageList[username]){
                //processing or failed status never update no status or success status
                if(msg.status === 'processing' || msg.status === 'failed'){
                    let currentMessage = stateToMessage[msg.state];
                    if(currentMessage && (!currentMessage.status || currentMessage.status === '' || currentMessage.status === 'success')){
                        continue;
                    }
                }
                stateToMessage[msg.state] = msg;
            }
            
            newState[username] = values(stateToMessage);
        } else {
            newState[username] = userMessageList[username];
        }

        //we need to sort the message again.
        newState[username].sort(messageReverseSortComparator)
    }
    return newState;
}

const hasMoreMessageReducer = (state = {}, action: Action)=> {
    switch(action.type){
        case PRIVATE_MESSAGE_TYPE.HAS_MORE_MESSAGE:
               return  Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
const tempImageReducer = (state = {}, action: Action) => {
    switch(action.type) {
        case PRIVATE_MESSAGE_TYPE.SAVE_TEMP_IMAGE:
            return Object.assign({}, state, {[action.payload.state] : action.payload.value});
        case PRIVATE_MESSAGE_TYPE.REMOVE_TEMP_IMAGE:
            return omit(state, [action.payload])
        default:
            return state;
    }
}

export default combineReducers({
    byUsers: byUserMessageReducer,
    hasMoreMessageByUser: hasMoreMessageReducer,
    notViewCount: notViewCountReducer,
    tempImage: tempImageReducer,
});