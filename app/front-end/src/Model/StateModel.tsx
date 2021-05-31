import { PrivateMessage } from "./MessageModel";
import { UserInfo } from "./UserInfoModel";

export interface ReduxState {
    user: UserState,
    friends: FriendState,
    privateMessages: PrivateMessageWrapper,
    userRequests : [UserRequest],
}

export interface UserState {
    userInfo: UserInfo,
    status: string,
    error: string
}

export interface FriendState {
    [username:string]: UserInfo
}


export interface PrivateMessageWrapper {
    byUsers: ByUserMessageType,
    hasMoreMessageByUser: {[ussername:string]: boolean},
    notViewCount: number,
    tempImage : tempImageType
}

export interface tempImageType {
    [state:string]:string
}

export interface ByUserMessageType {
    [username: string] : Array<PrivateMessage>
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