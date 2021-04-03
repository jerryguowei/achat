import SocketJS from 'sockjs-client';
import Stomp, { Client, Subscription } from 'webstomp-client';
import { PrivateMessage } from '../Model/MessageModel';
import { SoketUserRequestDTO } from '../Model/UserRequest';
import { updateFriendList, removeFriends } from '../redux/actions/friendAction';
import { addMessage, initHasMoreMessage, initMessageList } from "../redux/actions/messageAction";
import { updateUserRequest } from '../redux/actions/UserRequestAction';
import store from '../redux/store';
import { parseJson } from '../utils/GlobalUtils';


class WebSocket {
    SERVER_URL: string = '';
    userInfo: any;
    isConnected: boolean;
    stompClient?: Client;
    requestSubscription?: Subscription;
    messageSubscription?: Subscription;
    initSubscription?: Subscription;
    userSubscription?: Subscription;


    constructor() {
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_HOST_URL) {
            this.SERVER_URL = process.env.REACT_APP_HOST_URL;
        }

        this.userInfo = store.getState().user.userInfo;
        this.isConnected = false;
    }

    init = () => {
        if (!this.isConnected) {
            this.connectSocket();
        }
    }

    close = () => {
        if (this.isConnected) {
            this.disconnectSocket();
        }
    }

    connectSocket = () => {
        let socket = new SocketJS(this.SERVER_URL + "/connect");
        this.stompClient = Stomp.over(socket, {debug : false}); //{debug : false}

        this.stompClient.connect({}, (frame) => {
            this.isConnected = true;
            this.initSubscript();
            this.subscribeMessage();
            this.subscribeRequest();
            this.subscribeUser();
        })
    }

    disconnectSocket = () => {
        this.requestSubscription && this.requestSubscription.unsubscribe();
        this.messageSubscription && this.messageSubscription.unsubscribe();
        this.userSubscription && this.userSubscription.unsubscribe();
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('disconnected.');
                this.isConnected = false;
            })
        }
    }

    initSubscript = () => {
        if (!this.stompClient) return;
        this.initSubscription = this.stompClient.subscribe('/app/init', message => {
            const jsonMessage = parseJson(message.body);
            console.log(jsonMessage.friends);
            store.dispatch(updateFriendList(jsonMessage.friends));
            store.dispatch(initMessageList(jsonMessage.privateMessage));
            store.dispatch(initHasMoreMessage(jsonMessage.privateMessage));
            store.dispatch(updateUserRequest(jsonMessage.addingRequest));
            if (!this.initSubscription) return;
            this.initSubscription.unsubscribe();
        })
    }
    subscribeRequest = () => {
        if(!this.stompClient) return;
        this.requestSubscription = this.stompClient.subscribe('/user/queue/request', message => {
            const jsonMessage = parseJson(message.body)
            console.log(jsonMessage);
            store.dispatch(updateUserRequest(jsonMessage));
        });
    }

    subscribeMessage = () => {
        if(!this.stompClient) return;
        this.messageSubscription = this.stompClient.subscribe('/user/queue/message', (message) => {
            const jsonMessage: Array<PrivateMessage> = parseJson(message.body);
            store.dispatch(addMessage(jsonMessage));
        });
    }

    subscribeUser = () => {
        if(!this.stompClient) return;
        this.userSubscription = this.stompClient.subscribe('/user/queue/user', (message) => {
            const jsonMessage = parseJson(message.body);
            // store.dispatch(addMessage(jsonMessage))
            if(jsonMessage && jsonMessage.type === 'UPDATE'){
                 store.dispatch(updateFriendList([jsonMessage.userDTO]))
            } else if(jsonMessage && jsonMessage.type === 'REMOVE'){
                store.dispatch(removeFriends([jsonMessage.userDTO]))
            }
        });
    }
    
    viewMessage = (body: string) => {
        if(!this.stompClient) return;
        this.stompClient.send('/app/view', body);
    }

    copeRequest = (body: SoketUserRequestDTO) => {
        if(!this.stompClient) return;
        this.stompClient.send('/app/request', JSON.stringify(body));
    }
}
export default new WebSocket();