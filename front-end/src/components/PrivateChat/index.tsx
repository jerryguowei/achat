import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { PrivateMessage } from '../../Model/MessageModel';
import WebSocket from '../../requests/WebSocket';
import {sendMessageWithFile } from '../../requests/UserRequest';
import ChatContentList from '../ChatContentList';
import ChatHeader from '../ChatHeader';
import InputArea from '../InputArea';
import { v4 as uuidv4 }from 'uuid';
import './index.css'
import { addMessage, removeTempImage, saveTempImage } from '../../redux/actions/messageAction';
import { tempImageType } from '../../Model/StateModel';
interface RouteParams {
    username : string
}

interface PrivateChatProps extends RouteComponentProps<RouteParams> {
    messageList: Array<PrivateMessage>,
    hasMoreMessage: boolean,
    loginUsername: string,
    dispatch: Function,
    tempImages: tempImageType
}

export default class PrivateChat extends Component<PrivateChatProps, any> {

    constructor(props: PrivateChatProps) {
        super(props);
        this.state = {
            showAlert: false,
            error: ''
        }
    }

    handleSubmit = (value: string, file:File) => {
        const username =  this.props.match.params.username;
        const data: PrivateMessage = {
            toUsername: username,
            fromUsername: this.props.loginUsername,
            message: value,
            type: 'FROM',
            viewed: 0,
            time: new Date().toISOString(),
            state : uuidv4(),
            status: 'processing',
            percent:0,
        }
        if(file && file.type) {
            data.attachments = file.name + ':' + file.type + ':';
        }
        this.handleSaveTempImage(file, data.state);
        this.props.dispatch(addMessage([Object.assign({}, data)]));
        const handleProcess = (event: ProgressEvent) => {
            let percentage =  Math.round(event.loaded / event.total * 100);       
            if(percentage){
                var newData = Object.assign({}, data);
                newData.percent = percentage;
                this.props.dispatch(addMessage([newData]))
            }
        }
        sendMessageWithFile(data, file, handleProcess).then((responseData)=> {
                console.log(responseData);
                this.setState({percentage: 0})
                this.handleRemoveTempImage(file, data.state);
        }).catch((error)=> {
                console.log(error.response);
                let message = (error.response && error.response.data && error.response.data.error) || 'failed to send message';
                var newData = Object.assign({}, data);
                newData.status = 'failed';
                newData.error = message;
                console.log(message);
                this.props.dispatch(addMessage([newData]));
                this.handleRemoveTempImage(file, data.state);
            })
    }

    handleSaveTempImage = (file:File, state:string) => {
        if(!file || !file.type || !file.type.match(/^image/)){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = event => {
           let value = event.target?.result as string;
           this.props.dispatch(saveTempImage(value, state));
        }
        fileReader.readAsDataURL(file);
    }

    handleRemoveTempImage = (file: File, state:string) => {
        if(!file || !file.type || !file.type.match(/^image/)){
            return;
        }
        this.props.dispatch(removeTempImage(state));
    }


    handleShowAlert =(error:string) => {
        this.setState({showAlert : true, error});
    }
    handleCloseAlert = () => {
        this.setState({showAlert : false, error: ''});
    }

    handleView = (messageList: Array<PrivateMessage>, username:string) =>{
        const notViewedMessages = messageList.filter(msg => (msg.viewed === 0 && msg.toUsername!==username)); //toUsername == loginUsername.
        if(notViewedMessages.length > 0){
            WebSocket.viewMessage(JSON.stringify(notViewedMessages));
        }   
    }

    render() {
        const {match, messageList, hasMoreMessage} = this.props;
        const username = match.params.username;
        const localMessages = messageList;

        return (
            <div className= "chat-wrapper" onClick={() => this.handleView(localMessages, username)}>
              <ChatHeader username={username}/>
              <Alert show={this.state.showAlert} variant="danger" onClose={()=>this.handleCloseAlert()} className="message-alert"  dismissible>
                        <p>{this.state.error}</p>
             </Alert>   
               <ChatContentList 
                    messages={localMessages}
                    hasMoreMessage = {hasMoreMessage}
                    tempImages = {this.props.tempImages}
                />
                <InputArea handleSubmit = {this.handleSubmit} handleAlert={this.handleShowAlert}/>
            </div>
        );
    }
}