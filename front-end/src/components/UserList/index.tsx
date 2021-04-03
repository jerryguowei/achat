import React, { useEffect, useState } from 'react';
import { PrivateMessage } from '../../Model/MessageModel';
import { ByUserMessageType, FriendState } from '../../Model/StateModel';
import WebSocket from '../../requests/WebSocket';
import { notViwedCount } from "../../redux/actions/messageAction";
import { messageReverseSortComparator, toNormalTime } from '../../utils/GlobalUtils';
import UserGroup from '../UserGroup';
import './index.css';

interface UserListDefaultProp {
    dispatch: Function,
    friends : FriendState,
    byUserMessages: ByUserMessageType
}
const UserList = (props: UserListDefaultProp) => {

    const [totalCount, setTotalCount] = useState(0);
    const {dispatch} = props;
    useEffect(() => {
        let localTotalCount = 0;
        for(const username in props.friends){
            const messageList = props.byUserMessages[username] || [];
            const count = messageList && messageList.length > 0 ? 
            messageList.reduce((accumulater: number, item: PrivateMessage)=> {
                if(item.viewed === 0 && item.type === 'TO'){
                    accumulater += 1;
                }
                return accumulater;
            }, 0) :0
            localTotalCount += count;
        }
        setTotalCount(localTotalCount);
    },[props.byUserMessages, props.friends])

    useEffect(()=>{
        dispatch(notViwedCount(totalCount));
    }, [totalCount, dispatch])

    const friendList = () =>{
        console.log("update");
        const friends = props.friends;
        const byUserMessages = props.byUserMessages;
        const usrGroupList = [];
        for(const username in friends){
            const messageList = byUserMessages[username] || [];
            const count = messageList && messageList.length > 0 ? 
            messageList.reduce((accumulater: number, item: PrivateMessage)=> {
                if(item.viewed === 0 && item.type === 'TO'){
                    accumulater += 1;
                }
                return accumulater;
            }, 0) :0
            let latestMessage = messageList.length > 0 ? messageList[0].message : ''; 
            latestMessage  = latestMessage.replace('$[', '').replace(']$', '');
            const time = messageList.length > 0  ? toNormalTime(messageList[0].time) : '';     
            const list =  <UserGroup key={username}  
                            handleClick={viewMessage} 
                            name={username} 
                            message={latestMessage} 
                            datetime={time}
                            notViewedCount={count}/>

            const temp = {latestMessage:  messageList[0], list};               
            usrGroupList.push(temp);
        }
        usrGroupList.sort((a1, a2)=> {
            return messageReverseSortComparator(a1.latestMessage, a2.latestMessage);
        })
        let userArray: Array<JSX.Element> = [];
        usrGroupList.map(item => item.list).forEach(item => userArray.push(item));
        return  userArray;
    }

    const viewMessage = (username:string) => {
        const messageList = props.byUserMessages[username] || [];
        const notViewedMessages = messageList.filter((msg: PrivateMessage )=> (msg.viewed === 0 && msg.toUsername!==username)); //toUsername == login User name
        if(notViewedMessages.length > 0){
            WebSocket.viewMessage(JSON.stringify(notViewedMessages));
        }   
    }

        return (
            <div className="user-list-wrapper">
                <div className="user-list-header" onClick={()=>{console.log("click")}}>
                    header
                </div>
                 <div className="user-list">
                    {friendList()}
                </div>
            </div>
        );
}

export default UserList;