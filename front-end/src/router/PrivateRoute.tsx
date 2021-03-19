import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { ReduxState } from '../Model/StateModel';
import { userLogin } from '../redux/actions/userAction';



interface PrivateRouteState {
    Component? : any
}

class PrivateRoute extends React.Component<any, PrivateRouteState> {
    constructor(props:any) {
        super(props);
        this.state = {
            Component: null,
        };
    }
    componentDidMount() {
        const {user, component:Component} = this.props;
        const {user_info} = user;
        if(user_info && user_info.username) {
            this.setState({Component: <Component />})
        } else {
            let userInfo = JSON.parse(localStorage.getItem('user_info') as any);
            if(userInfo && userInfo.username) {
                this.props.dispatch(userLogin(userInfo));
            } else {
                this.setState({Component: (<Redirect to={{
                    pathname: '/login',
                    state: {from: this.props.location}
                }}/>
                )})
            }
        }
    }
    componentDidUpdate(prevProps: any) {
        if(prevProps.user !== this.props.user){
            const {user, component:Component } = this.props;
            const {status} = user;
            if(status=== 'loading') {
                this.setState({Component: null})
            } else if(status === 'success') {
                this.setState({Component: <Component/>})
            } else if(status === 'failed') {
                this.setState({Component: (<Redirect to={{
                    pathname: '/login',
                    state: {from: this.props.location}
                }}/>
                )})
            }
        }
    }
    render() {   
        const {Component, ...rest} = this.state;
        if(!Component) {
            return null;
        }
        return (
            <Route
                {...rest}
                render={(props) => 
                   Component
                }
            >
            </Route>
        );
    }
}
function mapStateToProps(state:ReduxState) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PrivateRoute)