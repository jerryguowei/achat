import { Redirect, Route } from 'react-router-dom';
import useAuth from './UseAuth';

export function NonProtectRoute({component: Component, ...rest} : any) {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => 
                !(auth && auth.username) ? 
                <Component {...props} />:
                (<Redirect to={{
                    pathname: '/',
                    state: {from: props.location, id: 'id'}
                }}/>
                )              
            }
        >
        </Route>
    );
}