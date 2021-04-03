import { UserRequest } from '../Model/StateModel';
import { UserInfo } from '../Model/UserInfoModel';
import { axioClient } from '../utils/RequestUtil';


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


export async function logout() {
    const response = await axioClient.get('/logout');
    return response;
}

export async function searchFriend(friendUsername:string) {    
    const response = await axioClient.get(`api/user/search/${friendUsername}`);
    return response;
}


export async function addFriend(userRequest:UserRequest) {
    const response = await axioClient.request({
        url: '/api/user/add',
        method: 'post',
        data : userRequest
    });
    return response;
}


export async function sendMessage(message:any, proressFun: Function) {

    const response = await axioClient.request({
        url: 'api/user/message',
        method:'post',
        data: message,
        onUploadProgress: (e) => proressFun(e)
    });
    return response;
}


export async function sendMessageWithFile(message:any, file: File, proressFun: Function) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("message", new Blob([JSON.stringify(message)], {type : "application/json"}));
    const response = await axioClient.request({
        url: 'api/user/message/file',
        method:'post',
        data: formData,
        onUploadProgress: (e) => proressFun(e)
    });
    return response;
}

export async function getMoreMesssage(data:any) {

    const response = await axioClient.request({
        url: '/api/user/add',
        method: 'post',
        data : data
    });
    return response;
}