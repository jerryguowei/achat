import { PrivateMessage } from "./MessageModel";
import { UserInfo } from "./UserInfoModel";

export interface ReduxState {
    user: UserState,
    friends: FriendState,
    userRequests : [UserRequest],
}

export interface UserState {
    user_info: UserInfo,
    status: string,
    error: string
}

export interface FriendState {
    friendList: {[username:string]: UserInfo},
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


export interface UserRequest {
    id?: number,
    type: string,
    toUsername: string,
    fromUsername: string,
    message?: string,
    status?:string,
    viewed:number,
    rejectMessage?:string,
    requestTime? :string
}

export interface Action {
    type: string,
    payload: any,
    error?: string
}