import { UserRequest } from "../../Model/StateModel";

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

export const updateUserRequest = (requests: Array<UserRequest>) => {
    return {
        type : UPDATE_USER_REQUEST,
        payload: requests
    }
}