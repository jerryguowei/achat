import { PrivateMessage } from "../../Model/MessageModel";
import mapValues from 'lodash/mapValues';
import { getFriendUsernameFromMessage } from "../../utils/GlobalUtils";

export const PRIVATE_MESSAGE_TYPE = {
    ADD_MESSAGE : 'PRIVATE_ADD_MESSAGE',
    REMOVE_MESSAGE : 'PRIVATE_REMOVE_MESSAGE',
    NOT_VIEW_COUNT: 'PRIVATE_NOT_VIEW_COUNT',
    HAS_MORE_MESSAGE: 'NO_MORE_MESSAGE',
    SAVE_TEMP_IMAGE: 'SAVE_TEMP_IMAGE',
    REMOVE_TEMP_IMAGE: 'REMOVE_TEMP_IMAGE'
}


export const initMessageList = (friendAllMessages: {[username:string]: {hasMoreMessage: boolean, messageList: Array<PrivateMessage>}}) =>{
   const byUsernameMessages = mapValues(friendAllMessages, (item)=>item.messageList);
   return {
       type: PRIVATE_MESSAGE_TYPE.ADD_MESSAGE,
       payload: byUsernameMessages
   }
}

export const addMessage = (messageList: Array<PrivateMessage>) => {
    const byUsernameMessages = messageList.reduce((accumulatator, item) => {
        let username = getFriendUsernameFromMessage(item);
        accumulatator[username] = accumulatator[username] || [];
        accumulatator[username].push(item);
        return accumulatator;
    }, {} as {[username:string]: Array<PrivateMessage>})
    return {
        type: PRIVATE_MESSAGE_TYPE.ADD_MESSAGE,
        payload: byUsernameMessages
    }
}

export const initHasMoreMessage = (friendAllMessages: {[username:string]: {hasMoreMessage: boolean, messageList: Array<PrivateMessage>}}) => {
    const byUsernameHasMoreMessage = mapValues(friendAllMessages, (item)=>item.hasMoreMessage);
    return {
        type: PRIVATE_MESSAGE_TYPE.HAS_MORE_MESSAGE,
        payload: byUsernameHasMoreMessage
    }
}

export const updateHasMoreMessage = (username:string, hasMoreMessge: false)=> ({
    type: PRIVATE_MESSAGE_TYPE.HAS_MORE_MESSAGE,
    payload: {username, hasMoreMessge}
})


export const notViwedCount = (totalcount: any) => (
    {
        type: PRIVATE_MESSAGE_TYPE.NOT_VIEW_COUNT,
        payload: totalcount,
    }
);

// export const requireMoreMessage = (data: any) => {
//     const response = getMoreMesssage(data);
//     response.then(rsp => {
//         const data = rsp.data;

//     }).catch();
// };

export const saveTempImage = (value:string, state: string) =>{
    return {
        type: PRIVATE_MESSAGE_TYPE.SAVE_TEMP_IMAGE,
        payload: {
            value,
            state
        }
    }
}

export const removeTempImage = (state: string) =>{
    return {
        type: PRIVATE_MESSAGE_TYPE.REMOVE_TEMP_IMAGE,
        payload: state
    }
}
