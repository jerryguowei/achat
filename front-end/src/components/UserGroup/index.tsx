import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from 'react-avatar';
import './index.css';

interface UserGroupProps {
    message :string,
    name: string,
    handleClick: Function,
    notViewedCount: number,
    datetime: string
}

export default class UserGroup extends React.Component<UserGroupProps, any> {

    render() {
        let message = this.props.message;
        message = message ? message : 'no message';
        message = message.substring(0, 17) + '...';


        return (
            <Link  className="link" to={'/private-chat/' + this.props.name} onClick={()=>{this.props.handleClick(this.props.name)}} >
                <div className='user-group'>
                    <div className='user-icon'>
                        <UserAvatar size="50"
                            name={this.props.name || 'U' }
                            round = {true}
                        />
                        {this.props.notViewedCount > 0 ? (<span className="unread" >{this.props.notViewedCount}</span>) : null }
                    </div>
                    <div className='user-content'>
                        <div className="name-date">
                            <span>{this.props.name}</span>
                            <span className="user-date">{this.props.datetime}</span>
                        </div>
                        <div className="message">{message}</div>
                    </div>
                </div>
            </Link>
        )
    }
}