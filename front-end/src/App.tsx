import { HashRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import HomePageList from './containers/UserList';
import Login from './containers/Login';
import SideBar from './containers/SideBar';
import SignUp from './containers/SignUp';
import {NonProtectRoute} from './router/CumtomRoute';
import './index.css';
import Setting from './containers/Setting';
import PrivateRoute from './router/PrivateRoute';
import PrivateChatPage from './containers/PrivateChatPage';
import UserRequestList from './containers/UserRequestList';


function LeftView() {
    let location = useLocation();
    let className = '';
    if(location.pathname.match(/\/private-chat/)){
        className = 'layout-left-mobile';
    }
    return (
        <div className={'layout-left ' + className}>
            <Route component= {SideBar}/>
            <Route path={['/', '/private-chat/:username']} exact component={HomePageList}/>
            <Route path='/setting' exact component={Setting}/>
            <Route path='/request' exact component={UserRequestList}/>
        </div>
    );
}

function RightView() {
    let location = useLocation();
    let className = '';
    if(!location.pathname.match(/\/private-chat/)){
        className = 'layout-right-mobile';
    }
    return (
        <div className={'layout-right ' + className}> 
            <Route path = '/private-chat/:username'  component= {PrivateChatPage}/>
            <Route path = {["/", "/request", "/setting"]} exact render = {()=><div>Welcome</div> }/>
        </div>
    );
}

function MainView(){

    return (<>
        <Route exact path={FUNCTION_ROUTERS} component={LeftView}/>
        <Route exact path={FUNCTION_ROUTERS} component={RightView}/>
    </>)
}

const FUNCTION_ROUTERS = [
    '/',
    '/private-chat/:username',
    '/setting',
    '/request'
  ];

const App = () => (
    <Router>
        <div className="layout-wrapper">
            <Switch>           
                <NonProtectRoute exact path='/login'  component={Login}/>
                <NonProtectRoute exact path='/signup' component={SignUp}/>
                <PrivateRoute exact path={FUNCTION_ROUTERS} component={MainView} />
                {/* <PrivateRoute exact path={FUNCTION_ROUTERS} component={RightView} /> */}
            </Switch>
        </div>
    </Router>
);
export default App;