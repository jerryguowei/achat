import SocketJS from 'sockjs-client';
import Stomp, { Client, Subscription } from 'webstomp-client';
import { addMessage, updateFriendList, initMessageList } from '../redux/actions/friendAction';
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


    constructor() {
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_HOST_URL) {
            this.SERVER_URL = process.env.REACT_APP_HOST_URL;
        }

        this.userInfo = store.getState().user.user_info;
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
        this.stompClient = Stomp.over(socket, { debug: false }); //{debug : false}

        this.stompClient.connect({}, (frame) => {
            this.isConnected = true;
            this.initSubscript();
            this.subscribeMessage();
            this.subscribeRequest();
        })
    }

    disconnectSocket = () => {
        this.requestSubscription && this.requestSubscription.unsubscribe();
        this.messageSubscription && this.messageSubscription.unsubscribe();
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
            const jsonMessage = parseJson(message.body)
            store.dispatch(updateFriendList(jsonMessage.friends))
            store.dispatch(initMessageList(jsonMessage.privateMessage))

            if (!this.initSubscription) return;
            this.initSubscription.unsubscribe();
        })
    }
    subscribeRequest = () => {
        if(!this.stompClient) return;
        this.requestSubscription = this.stompClient.subscribe('/user/queue/request', message => {
            const jsonMessage = parseJson(message.body)
            console.log(jsonMessage);
        });
    }

    subscribeMessage = () => {
        if(!this.stompClient) return;
        this.messageSubscription = this.stompClient.subscribe('/user/queue/message', (message) => {
            const jsonMessage = parseJson(message.body);
            store.dispatch(addMessage(jsonMessage))
        });
    }

    sendMessage = (body: string) => {
        if(!this.stompClient) return;
        this.stompClient.send('/app/message', body);
    }

    viewMessage = (body: string) => {
        if(!this.stompClient) return;
        this.stompClient.send('/app/view', body);
    }

    getMoreMessage = (body: string) => { //body: {page, pageSize, username}
        if(!this.stompClient) return;
        this.stompClient.send('/app/more/message', body);
    }

}
export default new WebSocket();