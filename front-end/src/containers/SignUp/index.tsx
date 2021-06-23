import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import notification from '../../components/Notification';
import LoginPage from '../../components/SignInSignUpPage';
import { userLogin } from '../../redux/actions/userAction';
import { register } from '../../requests/UserRequest';
import './index.css';

interface SignUpProps extends RouteComponentProps{
    dispatch: Function,
}
class SignUp extends React.Component<SignUpProps, any> {

    handleSubmit = (value: {username: string, password: string, email: string}) => {
        const {username, password, email} = value;
        const data = {
            username: username,
            password: password,
            email: email
        }
       register(data)
       .then(response=> {
             this.props.dispatch(userLogin({username, password}));
             this.props.history.push("/");
       }).catch(error => {
        console.log(error);
        let message = (error.response && error.response.data && error.response.data.error) || 'failed to creat user';
        notification(message, 'warn');  
       });
    }

    render() {
        return (  <div className="login">
        <LoginPage  submit={this.handleSubmit} {...this.props}/>
     </div>);
    }
}

export default connect()(SignUp)