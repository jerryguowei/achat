import { UserInfo } from "../../Model/UserInfoModel";
import { axioClient } from "../../utils/RequestUtil";

export const LOGIN_TYPE = {
    LOGIN_START : 'login/start',
    LOGIN_SUCCESS : 'login/success',
    LOGIN_FAILED : 'login/failed',
    LOGOUT: 'login/logout'
}


export const loginStart = () => (
    {
        type: LOGIN_TYPE.LOGIN_START
    }
);

export const loginSuccess = (userDetail: UserInfo) => (
    {
        type: LOGIN_TYPE.LOGIN_SUCCESS,
        payload: userDetail
    }
);

export const loginFailed = (error:string) => (
    {
        type: LOGIN_TYPE.LOGIN_FAILED,
        error
    }
)

export const userLogin = (userInfo: UserInfo) => {
    return  async (dispatch:Function) => {
        dispatch(loginStart());
        try {
            const headers:any = {};
            if(userInfo.password && userInfo.username){
                const authData = window.btoa(userInfo.username + ':' + userInfo.password);
                headers.Authorization = 'Basic ' + authData;
            }
           
            const response = await axioClient.request({
                url: 'api/user/login',
                method: 'post',
                data: {},
                headers: headers
            });
           dispatch(loginSuccess(response.data));
           localStorage.setItem('user_info', JSON.stringify(response.data));
        } catch(err){
            let message = (err.response && err.response.data && err.response.data.message) || 'failed to login';
            localStorage.removeItem('user_info');
            dispatch(loginFailed(message))
        }
    }
}

export const userLogout = () => {
    return {
        type: LOGIN_TYPE.LOGOUT
    }
}