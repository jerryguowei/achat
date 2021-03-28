import { PrivateMessage } from '../../Model/MessageModel';
import WebSocket from '../../modules/WebSocket'
import { notViwedCount } from '../../redux/actions/friendAction';
import { toNormalTime } from '../../utils/GlobalUtils';
import UserGroup from '../UserGroup';
import './index.css';
import React, {Component} from 'react';
import { FriendState, FriendAllMessages, FriendMessageInfo } from '../../Model/StateModel';

interface UserListDefaultProd {
    dispatch: Function,
    friends : FriendState,
    message: any
}
export default class UserList extends Component<UserListDefaultProd, any> {
    totalCount: number = 0;

    componentDidUpdate(){
        this.props.dispatch(notViwedCount(this.totalCount));
    }

    friendList = () =>{
        const friendList = this.props.friends.friendList ? this.props.friends.friendList : {};
        const friendAllMessages: FriendAllMessages  = this.props.friends.allMessages ? this.props.friends.allMessages : {};
        const usrGroupList = [];
        this.totalCount = 0;


        for(const username in friendList){
            const friendMessageInfo : FriendMessageInfo = friendAllMessages[username];
            const messageList =  friendMessageInfo && friendMessageInfo.messageList ? friendMessageInfo.messageList : [];
            const count = messageList && messageList.length > 0 ? 
            messageList.reduce((accumulater: number, item: PrivateMessage)=> {
                if(item.viewed === 0 && item.type === 'TO'){
                    accumulater += 1;
                }
                return accumulater;
            }, 0) :0
            let latestMessage = messageList.length > 0 ? messageList[0].message : ''; 
            let latestMessageId = messageList.length > 0 ? messageList[0].messageId : -1; 
            latestMessage  = latestMessage.replace('$[', '').replace(']$', '');
            const time = messageList.length > 0  ? toNormalTime(messageList[0].time) : '';     
            const list =  <UserGroup key={username}  
                            handleClick={this.viewMessage} 
                            name={username} 
                            message={latestMessage} 
                            datetime={time}
                            notViewedCount={count}/>

            const temp = {id: latestMessageId, list};               
            usrGroupList.push(temp);
            this.totalCount += count;
        }

        usrGroupList.sort((a, b) => {
            return a.id - b.id;
        })
        let userArray: Array<JSX.Element> = [];
        usrGroupList.map(item => item.list).forEach(item => userArray.push(item));
        return  userArray;
    }

    viewMessage = (username:string) => {
        const friendAllMessages: FriendAllMessages  = this.props.friends.allMessages ? this.props.friends.allMessages : {};
        const messageList = friendAllMessages[username] ? friendAllMessages[username].messageList : [];
        const notViewedMessages = messageList.filter((msg: PrivateMessage )=> (msg.viewed === 0 && msg.toUsername!==username)); //toUsername == login User name
        if(notViewedMessages.length > 0){
            WebSocket.viewMessage(JSON.stringify(notViewedMessages));
        }   
    }

    render() {
        return (
            <div className="user-list-wrapper">
                <div className="user-list-header" onClick={()=>{console.log("click")}}>
                    header
                </div>
                 <div className="user-list">
                    {this.friendList()}
                </div>
            </div>
        );

    }
}