import { FriendAllMessages } from "../../Model/StateModel"

export const FRIEND_TYPE = {
    UPDATE_LIST : 'FRIEND_UPDATE_LIST',
    REMOVE_LIST : 'FRIEND_REMOVE_LIST'
}

export const PRIVATE_MESSAGE_TYPE = {
    INIT_LIST : 'PRIVATE_INIT_LIST',
    ADD_LIST : 'PRIVATE_ADD_LIST',
    REMOVE_LIST : 'PRIVATE_REMOVE_LIST',
    NOT_VIEW_COUNT: 'PRIVATE_NOT_VIEW_COUNT'
}
export const updateFriendList = (friendList:any) =>({
    type : FRIEND_TYPE.UPDATE_LIST,
    payload: friendList
})

export const removeFriends = (removedFriendList: any) => (
    {
        type: FRIEND_TYPE.REMOVE_LIST,
        payload : removedFriendList
    }
)


export const initMessageList = (friendAllMessages: FriendAllMessages) => (
    {
        type : PRIVATE_MESSAGE_TYPE.INIT_LIST,
        payload : friendAllMessages
    }
)


export const addMessage = (messageList:any) => (
    {
        type : PRIVATE_MESSAGE_TYPE.ADD_LIST,
        payload : messageList,
    }
)


export const notViwedCount = (totalcount:any) => (
    {
        type : PRIVATE_MESSAGE_TYPE.NOT_VIEW_COUNT,
        payload : totalcount,
    }
)