import { UserInfo } from '../Model/UserInfoModel';
import {axioClient} from '../utils/RequestUtil';


interface Header {
    [header:string] : string
}
export async function login(userInfo: UserInfo) {

    const headers:Header = {};
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
    return response;
}


export async function register(userInfo: Header){

    const response = await axioClient.request({
        url: 'api/user/register',
        method : 'post',
        data : userInfo
    });

    return response;
}