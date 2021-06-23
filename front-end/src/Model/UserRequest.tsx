import { UserRequest } from "./StateModel";

export enum UserRequestActionType {
    REQUEST = "REQUEST",
    ACCEPT = "ACCEPT",
    REJECT = "REJECT",
    VIEW = "VIEW",
}


export interface SoketUserRequestDTO {
    action : UserRequestActionType,
    userRequestDTO : UserRequest
} 