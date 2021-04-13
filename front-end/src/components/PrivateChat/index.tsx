import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { PrivateMessage } from '../../Model/MessageModel';
import { tempImageType } from '../../Model/StateModel';
import { getMoreMesssage, handleSubmitMesage } from '../../redux/actions/messageAction';
import WebSocket from '../../requests/WebSocket';
import ChatContentList from '../ChatContentList';
import ChatHeader from '../ChatHeader';
import InputArea from '../InputArea';
import './index.css';
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
    ref:React.RefObject<HTMLDivElement>
    constructor(props: PrivateChatProps) {
        super(props);
        this.state = {
            showAlert: false,
            error: ''
        }
        this.ref = React.createRef();
    }
    componentDidMount() {
        if(this.ref.current){
            this.updateSize();
            window.addEventListener('resize', this.updateSize)
        }
    }
    componentWillUnmount() {
        if(this.ref.current) {
            window.removeEventListener('resize', this.updateSize)
        }
    }
    updateSize = () => {
        this.setState({width: this.ref.current?.offsetWidth})
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
        this.props.dispatch(handleSubmitMesage(data, file));
    }

    loadMoreMessage = () => {
        const { messageList } = this.props;
        const page = Math.floor(messageList.length / 20);
        console.log("start loading")
        if (page > 0) {
            let targetUsername = messageList[0].type === 'FROM' ? messageList[0].toUsername : messageList[0].fromUsername;
            const data = {
                page: page,
                pageSize: 20,
                username: targetUsername
            }
           this.props.dispatch(getMoreMesssage(data));
        }
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
            <div className= "chat-wrapper" onClick={() => this.handleView(localMessages, username)} ref={this.ref}>
              <ChatHeader username={username}/>
              <Alert show={this.state.showAlert} variant="danger" onClose={()=>this.handleCloseAlert()} className="message-alert"  dismissible>
                        <p>{this.state.error}</p>
             </Alert>   
               <ChatContentList 
                    messages={localMessages}
                    hasMoreMessage={hasMoreMessage}
                    tempImages={this.props.tempImages}
                    loadMoreMessage={this.loadMoreMessage}
                />
                <InputArea width= {this.state.width} handleSubmit = {this.handleSubmit} handleAlert={this.handleShowAlert}/>
            </div>
        );
    }
}