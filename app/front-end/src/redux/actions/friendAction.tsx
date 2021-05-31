
export const FRIEND_TYPE = {
    UPDATE_LIST : 'FRIEND_UPDATE_LIST',
    REMOVE_LIST : 'FRIEND_REMOVE_LIST'
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


