import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import './index.css';
import UserAvatar from 'react-avatar';

interface LoginPageProps extends RouteComponentProps {
    submit: Function
}

const LoginPage = (props: LoginPageProps) => {
    
    const [formValues, setFormValues] = useState({
                username: '',
                password: '',
                email: ''
    });

    const {register, handleSubmit, errors} = useForm({mode:'onBlur'});
    const handleChange = (name:string, value:string) => {
        setFormValues({...formValues, [name]: value});
    }
    const onSubmit = (data:any) => {
        props.submit(data);
    }

    const {match} = props;
    const isLogin = match.path==='/login';
    const buttonName =  isLogin ?'Log In': 'Sign Up';
    const loginClassName = isLogin ?  'active' : 'inactive';
    const signUpClassName = isLogin ? 'inactive': 'active';
    const emailComponent = isLogin ?  null :(
        <div className="form-row">
            <div className="col-12 mb-4 position-relative">
                <input type="email"
                    name="email"
                    className="form-control"
                    ref={register({ required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    placeholder='smith@example.com'
                />
                {errors.email &&
                    <div className="invalid-tooltip left-auto d-block">
                        Email is not valid.
                    </div>}
            </div>
        </div>
    );
    return (
        <div className="login-form">
            <Link to='/login'>
                <span className={loginClassName}>Log In</span>
            </Link>
            <Link to='/signup'>
                <span className={signUpClassName}>Sign Up</span>
            </Link>
            <UserAvatar size="100" name={formValues.username || 'U'} className='avatar' round={true} />

            <form noValidate autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="col-12 mb-4 position-relative">
                        <input type="text"
                            name="username"
                            className={"form-control"}
                            onChange={(e) => handleChange('username', e.target.value)}
                            ref={register({required:true})}
                            placeholder='username'
                            required
                        />
                        {errors.username &&  
                        <div className="invalid-tooltip left-auto d-block">
                            Username is required
                        </div>}                      
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-12 mb-4 position-relative">
                        <input type="password"
                            name="password"
                            className="form-control"
                            ref={register({required:true})}
                            placeholder='password'
                            required
                        />
                        {errors.password &&  
                        <div className="invalid-tooltip left-auto d-block">
                            Password is required
                        </div>}  
                    </div>
                </div>
                {emailComponent}
                <input type="submit"
                    className="btn btn-primary"
                    value={buttonName} />
            </form>
        </div>
    )
}

export default LoginPage;