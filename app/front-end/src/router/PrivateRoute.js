import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import Spinner from '../components/Spinner';


const PrivateRoute = props => {
    const user = useSelector(state=>state.user);
    const {component:Component} = props;
    let renderComponent;
    if(user.status === 'loading'){
        renderComponent = <Spinner/>
    } else if(user.status === 'success' && user.userInfo) {
        renderComponent = <Route render= {props => <Component {...props} />} />;
    } else {
        renderComponent = <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
        }}/>
    }

    return renderComponent;
}
export default PrivateRoute;



