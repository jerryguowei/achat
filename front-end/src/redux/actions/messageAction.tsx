import { PrivateMessage } from "../../Model/MessageModel";
import mapValues from 'lodash/mapValues';
import { getFriendUsernameFromMessage } from "../../utils/GlobalUtils";
import { axioClient } from "../../utils/RequestUtil";
import { sendMessageWithFile } from "../../requests/UserRequest";
import { userLogout } from "./userAction";

export const PRIVATE_MESSAGE_TYPE = {
    ADD_MESSAGE: 'PRIVATE_ADD_MESSAGE',
    REMOVE_MESSAGE: 'PRIVATE_REMOVE_MESSAGE',
    NOT_VIEW_COUNT: 'PRIVATE_NOT_VIEW_COUNT',
    HAS_MORE_MESSAGE: 'HAS_MORE_MESSAGE',
    SAVE_TEMP_IMAGE: 'SAVE_TEMP_IMAGE',
    REMOVE_TEMP_IMAGE: 'REMOVE_TEMP_IMAGE'
}


export const initMessageList = (friendAllMessages: { [username: string]: { hasMoreMessage: boolean, messageList: Array<PrivateMessage> } }) => {
    const byUsernameMessages = mapValues(friendAllMessages, (item) => item.messageList);
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
    }, {} as { [username: string]: Array<PrivateMessage> })
    return {
        type: PRIVATE_MESSAGE_TYPE.ADD_MESSAGE,
        payload: byUsernameMessages
    }
}

export const initHasMoreMessage = (friendAllMessages: { [username: string]: { hasMoreMessage: boolean, messageList: Array<PrivateMessage> } }) => {
    const byUsernameHasMoreMessage = mapValues(friendAllMessages, (item) => item.hasMoreMessage);
    return {
        type: PRIVATE_MESSAGE_TYPE.HAS_MORE_MESSAGE,
        payload: byUsernameHasMoreMessage
    }
}

export const updateHasMoreMessage = (username: string, hasMoreMessage: false) => ({
    type: PRIVATE_MESSAGE_TYPE.HAS_MORE_MESSAGE,
    payload: { [username]: hasMoreMessage }
})


export const notViwedCount = (totalcount: any) => (
    {
        type: PRIVATE_MESSAGE_TYPE.NOT_VIEW_COUNT,
        payload: totalcount,
    }
);


export const getMoreMesssage = (data: any) => {
    return async (dispatch: Function) => {
        try {
            const response = await axioClient.request({
                url: '/api/user/more/message',
                method: 'post',
                data: data
            });
            console.log(response);
            if (!response.data || response.data.length < 20) {
                dispatch(updateHasMoreMessage(data.username, false));
            }
            if (response.data && response.data.length > 0) {
                dispatch(addMessage(response.data))
            }
        } catch (err) {
            let message = (err.response && err.response.data && err.response.data.message) || 'failed to login';
            console.log(message);
        }
    }
}
export const saveTempImage = (value: string, state: string) => {
    return {
        type: PRIVATE_MESSAGE_TYPE.SAVE_TEMP_IMAGE,
        payload: {
            value,
            state
        }
    }
}

export const removeTempImage = (state: string) => {
    return {
        type: PRIVATE_MESSAGE_TYPE.REMOVE_TEMP_IMAGE,
        payload: state
    }
}

export const handleSubmitMesage = (data: PrivateMessage, file: File) => {
    return async (dispatch: Function) => {
        handleSaveTempImage(dispatch, file, data.state);
        dispatch(addMessage([Object.assign({}, data)]));
        const handleProcess = (event: ProgressEvent) => {
            let percentage = Math.round(event.loaded / event.total * 100);
            if (percentage) {
                var newData = Object.assign({}, data);
                newData.percent = percentage;
                dispatch(addMessage([newData]))
            }
        }
        sendMessageWithFile(data, file, handleProcess).then((responseData) => {
            handleRemoveTempImage(dispatch, file, data.state);
        }).catch((error) => {
            console.log(error.response);
            if(error.response && error.response.status === 401){
                console.log(error.response);
                dispatch(userLogout());
            }
            let message = (error.response && error.response.data && error.response.data.error) || 'failed to send message';
            var newData = Object.assign({}, data);
            newData.status = 'failed';
            newData.error = message;
            console.log(message);
            dispatch(addMessage([newData]));
            handleRemoveTempImage(dispatch, file, data.state);
        })
    }
}

const handleSaveTempImage = (dispatch: Function, file: File, state: string) => {
    if (!file || !file.type || !file.type.match(/^image/)) {
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = event => {
        let value = event.target?.result as string;
        dispatch(saveTempImage(value, state));
    }
    fileReader.readAsDataURL(file);
}

const handleRemoveTempImage = (dispatch: Function, file: File, state: string) => {
    if (!file || !file.type || !file.type.match(/^image/)) {
        return;
    }
    dispatch(removeTempImage(state));
}
