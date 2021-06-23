import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Alert, Button, ListGroup } from 'react-bootstrap';
import { UserRequest } from '../../../Model/StateModel';
import { UserInfo } from '../../../Model/UserInfoModel';
import { addFriend, searchFriend } from '../../../requests/UserRequest';
import AddModal from './AddModal';
import './index.css';


interface OnlineSearchProp {
    searchValue:string
    ref:any
}
const OnlineSearch = React.forwardRef((props: OnlineSearchProp, ref) => {
    const [searchUserList, setSearchUserList] = useState<Array<UserInfo>>();
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState<string>();
    const [user, setUser] = useState<UserInfo>();
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        setSearchUserList([]);
        setError('');
        setShowAlert(false);
    }, [props.searchValue])
    
    const handleSearch=()=>{
        const response = searchFriend(props.searchValue);
        response.then((rsp: any)=>{
            console.log(rsp.data)
            setSearchUserList(rsp.data);
            setError('');
            setShowAlert(false);
            if(!rsp.data || rsp.data.length === 0){
                setError('no user found.');
                setShowAlert(true);
            }
        }
        ).catch(err => {
            let errorMesage = (err.response && err.response.data && err.response.data.error) || 'no data';
            console.log(errorMesage);
            setSearchUserList([]);
            setError(errorMesage);
            setShowAlert(true);
        });
    }

    useImperativeHandle(ref, () => ({
        doSerach() {
            handleSearch();
        }
    
      }));
     const handleModalClose = () => {
        setModalShow(false);
     }
     const handleClickUser = (user: UserInfo) => {
        setUser(user);
        setModalShow(true);
     }

    const handleSubmit = (user: UserInfo, message: string) => {
        let data: UserRequest = {
            type: 'FROM',
            toUsername: user.username,
            fromUsername: '',
            message: message,
            viewed: 0
        };
        addFriend(data)
            .then(respones => {
                console.log(data);
            }).catch(err => {
                let errorMesage = (err.response && err.response.data && err.response.data.error) || 'failed to addd friend.';
                setError(errorMesage);
                setShowAlert(true);
            })
        setModalShow(false);
    }

    const buildUserList= () =>{
        if(!searchUserList || searchUserList.length === 0) return <></>;

        var list =  searchUserList.map((item, index)=> {
             return (<ListGroup.Item action variant="light" 
                        key={item.userId} 
                        onClick={() => handleClickUser(item)}
                        >
                        <div>{item.username}</div>
                     </ListGroup.Item>)});

        return <ListGroup>{list}</ListGroup>
    }
    return <div className="online-search">
                <AddModal show={modalShow} user={user} handleClose={handleModalClose} handleSubmit={handleSubmit}/>
                <div className="search-title" onClick={handleSearch}>Search online :{props.searchValue}</div>
                <div className="search-content-list">
                    <Alert show={showAlert} variant="danger">
                        <p>{error}</p>
                        <div className="d-flex justify-content-end">
                             <Button onClick={() => setShowAlert(false)} variant="primary">
                                Close
                            </Button>
                        </div>
                    </Alert>
                    {buildUserList()}
                </div>
          </div>
});
export default OnlineSearch;