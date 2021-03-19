import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './index.css';
import UserAvatar from 'react-avatar';

interface LoginPageProps extends RouteComponentProps {
    submit: Function
}

interface LoginPageState {
    username: string,
    password: string,
    email :string,
    showSpinner: boolean
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            showSpinner: true,
        };
        //this bind is necessary as handleClick has to access to this.
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {target} = event;
        this.setState({[target.name]  : target.value} as any);
    }

    handleClick() {
        this.props.submit(this.state);
    }

    render() {
        const {match} = this.props;
        const isLogin = match.path==='/login';
        const buttonName =  isLogin ?'Log In': 'Sign Up';
        const loginClassName = isLogin ?  'active' : 'inactive';
        const signUpClassName = isLogin ? 'inactive': 'active';
        const emailComponent = isLogin ?  null :(
            <div className="form-group">
            <input type="email"
                 name="email"
                 className="form-control"
                 value={this.state.email}
                 onChange={this.handleChange}
                placeholder='smith@example.com'
            />
         </div> 
        );
        return (
            <div className="login-form">
                <Link to='/login'>
                    <span className= {loginClassName}>Log In</span>
                </Link>
                <Link to='/signup'>
                <span className= {signUpClassName}>Sign Up</span>
                </Link>
                <UserAvatar size="100" name={this.state.username || 'U'} className= 'avatar'  round={true}/>
                <div className="form-group">
                    <input type="text"
                       name="username"
                       className="form-control"
                       value={this.state.username}
                       onChange={this.handleChange}
                       placeholder='username'
                    />
                </div>
                <div className="form-group">
                    <input type="password"
                           name="password"
                           className="form-control"
                           value={this.state.password}
                           onChange={this.handleChange}
                           placeholder='password'
                    />
                </div> 
                {emailComponent}
                <input type="button" 
                       className="btn btn-primary"
                       onClick={this.handleClick}
                       value={buttonName}/>
            </div>
        )
    }
}
export default LoginPage;