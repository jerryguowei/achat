import { combineReducers } from "redux";
import { LOGIN_TYPE } from "../actions/userAction";

const userInfoReducer = (prevState={}, action: {type:string, payload:any, error?: string}) => {
    switch(action.type) {
        case LOGIN_TYPE.LOGIN_SUCCESS:
            return action.payload;
        case LOGIN_TYPE.LOGOUT:
            return {};
        default:
            return prevState;
    }
}

const statusReducer = (prevState = "", action: {type:string, payload:any, error?:string}) => {
    switch(action.type){
        case LOGIN_TYPE.LOGIN_START:
            return 'loading';
        case LOGIN_TYPE.LOGIN_SUCCESS:
            return 'success';
        case LOGIN_TYPE.LOGIN_FAILED:
            return 'failed';
        case LOGIN_TYPE.LOGOUT:
                return "";
        default:
            return prevState;
    }
}
const errorReducer = (prevState="", action: {type:string, error?:string, payload:any}) => {
    switch(action.type){
        case LOGIN_TYPE.LOGIN_FAILED:
            return action.error;
        case LOGIN_TYPE.LOGIN_START :
        case LOGIN_TYPE.LOGIN_SUCCESS :
        case LOGIN_TYPE.LOGOUT :
            return "";
        default:
            return prevState;
    }
}

export default combineReducers({user_info: userInfoReducer, status: statusReducer, error: errorReducer});