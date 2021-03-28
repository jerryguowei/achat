import React from 'react';
import { RouteComponentProps } from 'react-router';
import { userLogout } from '../../redux/actions/userAction';
import { logout } from '../../requests/UserRequest';
import BootStrapModal from '../Modal';
import './index.css';

interface SettingProps extends RouteComponentProps{
    dispatch: Function,
}

export default class Setting extends React.Component<SettingProps, any> {
    constructor(props: SettingProps){
        super(props);
        this.state = {
            showLogout: false
        }
    }
    logout = () => {
        this.setState({showLogout: true});
    }
    confirmLogout = () =>{
        this.setState({showLogout: false});
        localStorage.removeItem('user_info');
        logout();
        this.props.dispatch(userLogout())
        this.props.history.push('/login');
    }
    render() {
        return (<div className='setting'>
                         <BootStrapModal show={this.state.showLogout}
                         message='Are you sure to log out?'
                         handleClose={()=> this.setState({showLogout: false})}
                         hasConfirm={true}
                         confirm={this.confirmLogout}
                        />
                    <div className='setting-title'>
                            <h6>aChat Setting</h6>
                    </div>
                     <div className='setting-part'>
                        <button className='btn btn-primary'
                            onClick={this.logout}>Log Out</button>
                    </div>
                </div>)
    }
}