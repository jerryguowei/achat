import { Button, Modal } from 'react-bootstrap';
import { UserRequest } from '../../../Model/StateModel';
import './index.css';

interface ModalProps {
    show: boolean,
    handleClose: Function
    userRequest?: UserRequest
    handleAccept: Function,
    handleReject: Function

}

const RequestModal = (props: ModalProps) => {
    let username = '';
    let requestMesage;
    let rejectMessage;
    let status;
    let type;
    if(props.userRequest){
        username = props.userRequest.type === 'FROM' ? props.userRequest.toUsername : props.userRequest.fromUsername;
        requestMesage = props.userRequest.message;
        rejectMessage = props.userRequest.rejectMessage;
        status = props.userRequest.status?.toLowerCase();
        type = props.userRequest.type === 'FROM' ? "To:" : "From:"
    }

    return (
        <Modal show={props.show}>
            <Modal.Header><div><span style={{fontWeight: 'bold'}}>{type}</span><span>{username}</span></div></Modal.Header>
            <Modal.Body>
                 <p>request:{requestMesage}</p>
                 <p>Reject: {rejectMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() =>props.handleClose()}>Close</Button>
                {(status === 'pending' && props.userRequest && props.userRequest.type === 'TO')? (<><Button variant="primary" onClick={()=> props.handleAccept(props.userRequest)} >Accept</Button>
                <Button variant="danger" onClick={()=> props.handleReject(props.userRequest)}>Reject</Button></>) : ''}
                
            </Modal.Footer>
        </Modal>
    )
}

export default RequestModal;