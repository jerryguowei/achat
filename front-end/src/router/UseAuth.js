import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userAction";

const useAuth = props => {
    const [first, setFirst] = useState(true);
    const auth = useSelector(state=>state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        let userInfo:UserInfo = JSON.parse(localStorage.getItem('user_info'));
        if(!(auth.userInfo && auth.status ==='success') && userInfo && userInfo.username && first){
                console.log('use auth dispatch');
                dispatch(userLogin(userInfo));
                setFirst(false);
        }
    },[dispatch, auth, first]);
    if(auth.userInfo && auth.status ==='success'){
        return auth.userInfo;
    }
    return auth;
};

export default useAuth;