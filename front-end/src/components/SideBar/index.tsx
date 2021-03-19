import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { UserInfo } from '../../Model/UserInfoModel';
import WebSocket from '../../modules/WebSocket';
import Icon from '../Icons';
import Profile from '../Profile';
import './index.css';

interface SideBarProps extends RouteComponentProps {
    userInfo : UserInfo
    notViewCount : number
}

export default class SideBar extends React.Component<SideBarProps, any> {
    componentDidMount(){
        WebSocket.init();
        window.addEventListener('beforeunload', this.componentCleanup);
    }
    componentWillUnmount(){
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentCleanup = () => {
        WebSocket.close();
    }
    
    render() {
        const {url} = this.props.match;
        const messageIcon = url === '/' || (url && url.match(/\/private-chat/))
        return (
            <div className="sidebar-wrapper">
                  <div className="tab">
                <Profile userInfo = {this.props.userInfo} />
                </div>
                <div className="tab">
                    <Link to="/">
                        <Icon size='30' color={ messageIcon ? '#66b3ef' :'#8a8a8a'}  name='left-chat' />
                    </Link>
                    {this.props.notViewCount > 0 ?<span className="unread">{this.props.notViewCount}</span> : null}                
                </div>
                <div className="tab">
                    <Link to="/request">
                        <Icon size='30' color={ url=== '/request' ? '#66b3ef' :'#8a8a8a'}  name='person-plus' /> 
                    </Link>
                </div>
                <div className="tab">
                    <Link to='/setting'>
                    <Icon size='30' color= {url === '/setting' ? '#66b3ef' :'#8a8a8a' }  name='gear' /> 
                    </Link>
                </div>
            </div>
        );
    }
}