import { UserRequest } from '../../../Model/StateModel';
import './index.css';
import UserAvatar from 'react-avatar';
import { toNormalTime } from '../../../utils/GlobalUtils';
import { OverlayTrigger, Popover } from 'react-bootstrap';

interface UserRequestProp {
    userRequest : UserRequest,
    handleClick: Function
}

const UserRequestItem = (props:UserRequestProp) =>{

    let message = props.userRequest.message;
    message = message ? message : '';
    message = message.substring(0, 10) + '...';
    let username = props.userRequest.type === 'FROM' ? props.userRequest.toUsername : props.userRequest.fromUsername
    let type = props.userRequest.type === 'FROM' ? "To:" : "From:"
    let viewed = props.userRequest.viewed;
    let dateTime = toNormalTime(props.userRequest.requestTime || '');
    let status = props.userRequest.status?.toLowerCase();

    let show = viewed === 0 && ((props.userRequest.type === 'FROM' && status !== 'pending') || (props.userRequest.type === 'TO' && status === 'pending'))

    return ( 
            <OverlayTrigger placement="auto" 
                overlay={<Popover id = {username + "popover"}>
                            <Popover.Title><span style={{fontSize: '0.6rem'}}>{'Message'}</span></Popover.Title>
                            <Popover.Content>
                                <p>{props.userRequest.message}</p>
                            </Popover.Content>
                        </Popover>}>
            <div className='request-user-group' onClick={()=>props.handleClick(props.userRequest)}>
                <div className='user-icon'>
                    <UserAvatar size="50"
                        name={username}
                        round = {true}
                    />
                    {show ? (<span className="unread" >{}</span>) : null }
                </div>
                <div className='user-content'>
                    <div className="name-date">
                        <span><span className="type-wrapper">{type}</span> {username}</span>
                        <span className="user-date">{dateTime}</span>
                    </div>
                    <div className="message-status">
                            <div className="message">{message}</div>
                            <div className="status"><span style={{fontWeight:'bold'}}>Status:</span>{status}</div>
                    </div>
                </div>
            </div>
            </OverlayTrigger>
    );
}


export default UserRequestItem;