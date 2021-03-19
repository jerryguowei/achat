import React , {Component} from 'react';
import UserAvatar from 'react-avatar';
import './index.css';

interface ChatItemProps {
    isMe :boolean,
    username : string,
    time : string,
    msg : string
}

class ChatItem extends Component<ChatItemProps, any> {

    textRender = (msg:string) => {
        return (
            <div className="msg-render">
                {msg}
            </div>
        )
    }
    render() {
        let {isMe, username, time , msg} = this.props;
        username = username ? username : 'U';
        return (
            <div className="chat-item">
                {isMe ? 
                    (<div className="my-chat">
                         <UserAvatar
                            size="36" 
                            name={username}  
                            className= 'avatar'
                            round={true}/>
                         <div className= "name-time">
                            {time && <span>{time}</span>}
                            {username && <span>{username}</span>}
                        </div>
                        {this.textRender(msg)}

                        </div>)
                :(<div className = "other-chat">
                      <UserAvatar
                        size="36" 
                        name={username}  
                        className= 'avatar'
                        round={true}/>
                      <div className= "name-time">
                           {username && <span>{username}</span>}
                           {time && <span>{time}</span>}
                      </div>
                      {this.textRender(msg)}
                  </div>)}
            </div>
        );
    }
}

export default ChatItem;