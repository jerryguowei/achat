import React from 'react';
import UserAvatar from 'react-avatar';
import { UserInfo } from '../../Model/UserInfoModel';
import './index.css';
interface ProfileProps {
    userInfo: UserInfo
}
const Profile = (props : ProfileProps)=> {

    let userInfo = props.userInfo;
    return (<div className='profile'>
        <UserAvatar 
            size="36" 
            name={userInfo.username || 'U'}  
            className= 'avatar'
            round={true}/>       
    </div>)
}

export default Profile;