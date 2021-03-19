import { PrivateMessage } from "./MessageModel";
import { UserInfo } from "./UserInfoModel";

export interface ReduxState {
    user: UserState
    friends: FriendState

}

export interface UserState {
    user_info: UserInfo,
    status: string,
    error: string
}


export interface FriendState {
    friendList: Array<UserInfo>,
    allMessages: FriendAllMessages,
    notViewCount:number,
}

export interface FriendAllMessages {
    [username: string] : FriendMessageInfo
}

export interface FriendMessageInfo {
    minMsgId: number,
    messageList : Array<PrivateMessage>
}