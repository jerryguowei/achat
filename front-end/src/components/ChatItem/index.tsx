import React, { useState } from 'react';
import UserAvatar from 'react-avatar';
import './index.css';
import ImageViewer from 'react-simple-image-viewer';
import WebSocket from '../../modules/WebSocket';


interface ChatItemProps {
    isMe: boolean,
    username: string,
    time: string,
    msg: string,
    attachments: string,
}

const ChatItem = (props: ChatItemProps) => {

    const [showViewer, setshowViewer] = useState(false);
    const [images, setImages] =  useState<Array<string>>([]);

    const textRender = (msg: string) => {
        return (
            <div className="msg-render">
                {msg}
            </div>
        )
    }

    let serverURL = WebSocket.SERVER_URL;

    const binaryRender = (msg: string, attachments: string) => {
        let filename = msg.replace('$[', '').replace(']$', '');

        if (!attachments) {
            return textRender(filename);
        }
        let splitedInfo = attachments.split(':');
        if (!splitedInfo || splitedInfo.length !== 3) {
            return textRender(filename);
        }

        if (splitedInfo[1].startsWith('image')) {
            return (<div className="img-render">
                <img style={{ maxWidth: '200px' }} src={'/files/' + splitedInfo[2]} alt={msg} onClick={() => handleImageClick('/files/' + splitedInfo[2])} />
            </div>)
        }
        
        return <div className="msg-render">
             <a href={ serverURL + '/files/' + splitedInfo[2]} download>{filename}</a>
        </div>
    }

    const handleImageClick = (url: string) => {
        setImages([url]);
        setshowViewer(true);
    }

    let { isMe, username, time, msg, attachments } = props;
    username = username ? username : 'U';
    return (
        <div className="chat-item">
            {showViewer && (
                <ImageViewer src={images} 
                     currentIndex={0}
                     backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)",
                        zIndex:'100'
                      }}
                      onClose ={()=> { setshowViewer(false)}}
                />
            )}
            {isMe ?
                (<div className="my-chat">
                    <UserAvatar
                        size="36"
                        name={username}
                        className='avatar'
                        round={true} />
                    <div className="name-time">
                        {time && <span>{time}</span>}
                        {username && <span>{username}</span>}
                    </div>
                    {props.attachments ? binaryRender(msg, attachments) : textRender(msg)}

                </div>)
                : (<div className="other-chat">
                    <UserAvatar
                        size="36"
                        name={username}
                        className='avatar'
                        round={true} />
                    <div className="name-time">
                        {username && <span>{username}</span>}
                        {time && <span>{time}</span>}
                    </div>
                    {props.attachments ? binaryRender(msg, attachments) : textRender(msg)}
                </div>)}
        </div>
    );
}

export default ChatItem;