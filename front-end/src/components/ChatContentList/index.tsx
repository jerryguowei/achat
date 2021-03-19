import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PrivateMessage } from '../../Model/MessageModel';
import WebSocket from '../../modules/WebSocket';
import { toNormalTime } from '../../utils/GlobalUtils';
import ChatItem from '../ChatItem';
import './index.css';

interface Props {
    messages: Array<PrivateMessage>
    minMsgId: number
};
export default class ChatContentList extends Component<Props, any> {
    scrollBottomRef:any;
    scrollTopRef: any;
    lastLoadTime : number = 0;
    executeLoading: boolean = false;
    hasMoreMessage: boolean = false;

    constructor(props: Props){
        super(props);
        this.scrollBottomRef = React.createRef();
        this.scrollTopRef = React.createRef();
    }
    
    loadMoreMessage = () => {
        this.executeLoading = true;
        const { messages} = this.props;
        const page = Math.floor(messages.length / 20);
        console.log("start loading")
        if(page > 0){
            let targetUsername = messages[0].type === 'FROM' ? messages[0].toUsername : messages[0].fromUsername;
            const data = {
                page : page,
                pageSize : 20,
                username : targetUsername
            }
            console.log(data);
            WebSocket.getMoreMessage(JSON.stringify(data));
        }  
        this.lastLoadTime = new Date().getTime();
        this.executeLoading = false;
    }

    handleScroll = (event : any) =>{
       const {scrollTop, scrollHeight, clientHeight} = event &&  event.target;
       if(this.lastLoadTime && (new Date().getTime() - this.lastLoadTime) < 1000)
       {
           console.log("scroll in 2 seconds.");
           return;
       }
       if((scrollTop - clientHeight) === 0 && scrollHeight !== clientHeight && !this.executeLoading) {
           this.loadMoreMessage();
       }
    }

    render() {
        const {messages, minMsgId} = this.props;
        if(minMsgId > 0  && messages.length > 0  &&  minMsgId < messages[messages.length - 1].messageId){
            this.hasMoreMessage = true;
        } else {
            this.hasMoreMessage = false;
        }

        const reverseMessages = messages.slice();
        const listItems =  reverseMessages.map((item, index) => {
            let isMe = item.type === 'FROM' ? true : false;
            let message = item.message;
            let time = toNormalTime(item.time);
            let username = item.fromUsername;
            return (
                <li key={index}>
                    <ChatItem 
                      isMe = {isMe}
                      username={username}
                      msg={message}
                      time={time}
                      />
                </li>
            );
        });
        return (
            <div className = "chat-content-wrapper">
                <ul className="chat-content-list" id="scrollableDiv">
                     <InfiniteScroll
                        dataLength={reverseMessages.length}
                        next={this.loadMoreMessage}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        inverse={true}
                        hasMore={this.hasMoreMessage}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv">
                  {listItems}
                  </InfiniteScroll>
              
                </ul>
            </div>
        )
    }
}