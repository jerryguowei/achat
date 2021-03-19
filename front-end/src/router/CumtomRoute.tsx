import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import store from '../redux/store';
import { userLogin } from '../redux/actions/userAction';
import { UserInfo } from '../Model/UserInfoModel';

export function NonProtectRoute({component: Component, ...rest} : any) {
    let auth = getAuth();
    return (
        <Route
            {...rest}
            render={(props) => 
                !(auth && auth.username) ? 
                <Component {...props} />:
                (<Redirect to={{
                    pathname: '/',
                    state: {from: props.location, id: 'id'}
                }}/>
                )              
            }
        >
        </Route>
    );
}

function getAuth() {
    let userInfo:UserInfo = JSON.parse(localStorage.getItem('user_info') as any);
    if(userInfo && userInfo.username) {
            store.dispatch(userLogin(userInfo) as any);
    }
    return userInfo;
}