import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/userAction';
import LoginPage from '../../components/SignInSignUpPage';
import Spinner from '../../components/Spinner';
import './index.css'
import notification from '../../components/Notification/index';
import BootStrapModal from '../../components/Modal';
import { RouteComponentProps } from 'react-router';

interface LogInProps extends RouteComponentProps {
    user: {status:string, error:string},
    dispatch: Function
}
interface LoginState {
    showSpinder: boolean,
    user: {status:string, error:string},
    showModal: boolean,
    modalMessage: string
}
 class LogIn extends React.Component<LogInProps, LoginState> {

    constructor(props : LogInProps){
        super(props)
        this.state = {showSpinder: false,
                     user: this.props.user,
                     showModal: false,
                     modalMessage: ''
        }
    }

    handleSubmit = (value :{username:string, password:string}) => {
        const {username, password} = value;
        this.props.dispatch(userLogin({username, password}));
    }

    handleClose = () => {
        this.setState({showModal: false, modalMessage: ''});
        this.props.history.push('/');
    }

    componentDidUpdate(prevProps: LogInProps, prevState: LoginState){
        if(this.props.user !== prevProps.user){
            const {error, status} = this.props.user;
            switch(status) {
                case 'loading':
                    this.setState({showSpinder: true});
                    break;
                case 'failed':
                    this.setState({showSpinder: false});
                    notification(error, 'warn');
                    break;
                case 'success':
                    this.setState({showSpinder: false, showModal: true, modalMessage: 'login successfully.'}); 
                    break;
                default:
                    this.setState({showSpinder: false});

            }
        }
    }
    render(){
        return (
            <div className="login">
                {this.state.showSpinder && <Spinner/>}
                <BootStrapModal show={this.state.showModal}
                         message={this.state.modalMessage}
                         handleClose={this.handleClose}
                         hasConfirm={false}
                 />
                <LoginPage  submit={this.handleSubmit} {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    return {user: state.user}
}

export default connect(mapStateToProps)(LogIn)