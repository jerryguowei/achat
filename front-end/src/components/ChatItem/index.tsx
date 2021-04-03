import React, { useEffect, useState } from 'react';
import UserAvatar from 'react-avatar';
import './index.css';
import ImageViewer from 'react-simple-image-viewer';
import WebSocket from '../../requests/WebSocket';
import 'react-circular-progressbar/dist/styles.css';
import {CircularProgressbar } from 'react-circular-progressbar';

interface ChatItemProps {
    isMe: boolean,
    username: string,
    time: string,
    msg: string,
    attachments: string,
    tempImageValue?:string,
    status?:string,
    percent?:number
}

const ChatItem = (props: ChatItemProps) => {

    const [showViewer, setshowViewer] = useState(false);
    const [images, setImages] =  useState<Array<string>>([]);
    const [showProgressBar, setShowProgressBar] = useState(false);
    useEffect(() => {
        if(props.status === 'processing'){
            setShowProgressBar(true);
        } else {
            setShowProgressBar(false);
        }
    }, [props.status])


    const textRender = (msg: string) => {
        return (
            <div>
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
            let src:string;
            if(props.status==='processing') {
                src = props.tempImageValue as string;
            } else {
                src = '/files/' + splitedInfo[2];
            }
            return (<div>
                <img style={{ maxWidth: '200px' }} 
                src={src} 
                alt={msg} 
                onClick={() => handleImageClick(src)} />
            </div>)
        }  
        return <div>
                 <a href={ serverURL + '/files/' + splitedInfo[2]} download>{filename}</a>
                </div>
    }
    const handleImageClick = (url: string) => {
        setImages([url]);
        setshowViewer(true);
    }

    let { isMe, username, time, msg, attachments } = props;
    username = username ? username : 'U';
    let percent = props.percent || 0;
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
                    <div className="msg-render">
                        {showProgressBar &&
                            <div style={{ width: '30px', position: 'absolute', left: '-40px', bottom: '5px' }}>
                                <CircularProgressbar value={percent} text={`${percent}%`} />
                            </div>
                        }
                    {props.attachments ? binaryRender(msg, attachments) : textRender(msg)}
                    </div>
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
                    <div className="msg-render">
                        {showProgressBar &&
                            <div style={{ width: '30px', position: 'absolute', right: '-40px', bottom: '5px' }}>
                                <CircularProgressbar value={percent} text={`${percent}%`} />
                            </div>
                        }
                    {props.attachments ? binaryRender(msg, attachments) : textRender(msg)}
                    </div>
                </div>)}
        </div>
    );
}

export default ChatItem;