import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Icon from '../Icons';
import './index.css';

interface HeaderProps extends RouteComponentProps {
    username: string
}

class ChatHeader extends Component<HeaderProps, any> {

    clickBack = () =>{
        this.props.history.push('/');
    }

    render() {
        return (<div className= "chat-header">
            <div onClick={this.clickBack}>
                <Icon name="chevron-left" color="#007bff" size="25"/>
            </div>
                <div className="name-wrapper">
                    {this.props.username}
                </div>     
            </div>)
    }
}

export default withRouter(ChatHeader);