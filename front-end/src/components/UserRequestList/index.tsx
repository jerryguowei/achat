import RequestHeader from './RequestHeader';
import './index.css'
import { UserRequest } from '../../Model/StateModel';
import UserRequestItem from './UserRequestItem';
import RequestModal from './RequestModal';
import { useRef, useState } from 'react';
import { UserRequestActionType } from '../../Model/UserRequest';
import WebSocket from '../../modules/WebSocket';
import OnlineSearch from './OnlineSearch';

interface RequestProps {
    userRequests : Array<UserRequest>

}

const UserRequestList = (props:RequestProps)=> {

   const [show, setShow] = useState(false);
   const [currentRequest, setCurrentRequest] = useState<UserRequest>();
   const [searchValue, setSearchValue] = useState<string>();

   const onlineSearchRef = useRef<any>();

   const handleClick = (userRequest: UserRequest)=>{
        setShow(true);
        setCurrentRequest(userRequest);
        viewRequest(userRequest);

    }

    const viewRequest = (userRequest:UserRequest) => {
        if(userRequest.viewed === 1){
            return;
        }
        if((userRequest.status === 'PENDING' && userRequest.type === 'TO')
            || ((userRequest.status ==='REJECT' || userRequest.status === 'ACCEPT')
                && userRequest.type === 'FROM')) {
            let data = {action: UserRequestActionType.VIEW, userRequestDTO: userRequest};
            WebSocket.copeRequest(data);
        }
    }
    
    const handleModalClose = ()=> {
        setShow(false);
    }
    const handleReject = (userRequest?:UserRequest) => {
        setShow(false);
    }

    const handleAccept = (userRequest?:UserRequest) => {
        setShow(false);
        if(!userRequest) return;
        let data = {action: UserRequestActionType.ACCEPT, userRequestDTO: userRequest};
        WebSocket.copeRequest(data);
    }
    let requestList = props.userRequests 
    .filter((item) => {
        if(!searchValue) return true;
        let username = item.type === 'FROM' ? item.toUsername : item.fromUsername;
        return username.match(searchValue);
    })      
    .map((item, index) => {
        return <UserRequestItem userRequest={item} key={item.id}
                handleClick={handleClick} />
    });

    const handleSearchChange = (value?:string) => {
        setSearchValue(value);
    }

    const handleSearchSubmit = ()=> {
        if(onlineSearchRef){
            onlineSearchRef.current.doSerach();
        }
    }

    let listClassName = searchValue ? "show-search-list" : "";
    return (<div className="list-wrapper">
        <RequestModal 
                userRequest = {currentRequest} 
                show = {show} 
                handleClose={handleModalClose} 
                handleAccept={handleAccept}
                handleReject={handleReject}/>
        <RequestHeader 
            handleChange={handleSearchChange}
            handleSubmit={handleSearchSubmit}/>
            <div className= {"request-list " + listClassName }>
                {requestList}
            </div>
            {searchValue ? <OnlineSearch ref={onlineSearchRef} searchValue={searchValue}/> : ''}
        </div>);
}


export default UserRequestList;