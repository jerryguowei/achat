import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PrivateMessage } from '../../Model/MessageModel';
import { FriendAllMessages, FriendMessageInfo } from '../../Model/StateModel';
import WebSocket from '../../modules/WebSocket';
import ChatContentList from '../ChatContentList';
import ChatHeader from '../ChatHeader';
import InputArea from '../InputArea';
import './index.css'

interface RouteParams {
    username : string
}

interface PrivateChatProps extends RouteComponentProps<RouteParams> {
    friendAllMessages: FriendAllMessages
}

export default class PrivateChat extends Component<PrivateChatProps, any> {

    handleSubmit = (value: string) => {

        const username =  this.props.match.params.username;
        const data = {
            toUsername: username,
            message: value
        }
        WebSocket.sendMessage(JSON.stringify(data));
    }

    handleView = (messageList: Array<PrivateMessage>, username:string) =>{
        const notViewedMessages = messageList.filter(msg => (msg.viewed === 0 && msg.toUsername!==username)); //toUsername == loginUsername.
        if(notViewedMessages.length > 0){
            WebSocket.viewMessage(JSON.stringify(notViewedMessages));
        }   
    }

    render() {
        const {match, friendAllMessages} = this.props;
        const username = match.params.username;
        let friendMessageInfo: FriendMessageInfo = friendAllMessages[username];
        const localMessages = friendMessageInfo ? friendMessageInfo.messageList : [];
        const minMsgId =  friendMessageInfo ? friendMessageInfo.minMsgId : -1;

        return (
            <div className= "chat-wrapper" onClick={() => this.handleView(localMessages, username)}>
              <ChatHeader username={username}/>
               <ChatContentList 
                    messages={localMessages}
                    minMsgId = {minMsgId}
                />
                <InputArea handleSubmit = {this.handleSubmit}/>
            </div>
        );
    }
}