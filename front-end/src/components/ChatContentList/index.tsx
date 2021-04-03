import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PrivateMessage } from '../../Model/MessageModel';
import { tempImageType } from '../../Model/StateModel';
import { toNormalTime } from '../../utils/GlobalUtils';
import ChatItem from '../ChatItem';
import './index.css';

interface Props {
    messages: Array<PrivateMessage>
    hasMoreMessage: boolean, 
    tempImages: tempImageType
    loadMoreMessage: Function,
};
const ChatContentList = (props: Props) => {

    const { messages, hasMoreMessage, tempImages } = props;
    const reverseMessages = messages.slice();
    const listItems = reverseMessages.map((item, index) => {
        let isMe = item.type === 'FROM' ? true : false;
        let message = item.message;
        let attachments = item.attachments || '';
        let time = toNormalTime(item.time);
        let username = item.fromUsername;
        let state = item.state;
        let tempImageValue = tempImages[state];
        let percent = item.percent;
        return (
            <li key={index}>
                <ChatItem
                    isMe={isMe}
                    username={username}
                    msg={message}
                    time={time}
                    attachments={attachments}
                    tempImageValue={tempImageValue}
                    status={item.status}
                    percent={percent}
                />
            </li>
        );
    });
    return (
        <div className="chat-content-wrapper">
            <ul className="chat-content-list" id="scrollableDiv">
                <InfiniteScroll
                    dataLength={reverseMessages.length}
                    next={() => props.loadMoreMessage()}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    inverse={true}
                    hasMore={hasMoreMessage}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv">
                    {listItems}
                </InfiniteScroll>
            </ul>
        </div>
    )
}


export default ChatContentList;