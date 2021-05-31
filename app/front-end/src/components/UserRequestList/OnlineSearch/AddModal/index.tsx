import React, {useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserInfo } from "../../../../Model/UserInfoModel";

interface AddModalProps {
    user?: UserInfo,
    show: boolean,
    handleClose: Function,
    handleSubmit: Function,
}

const AddModal = (props: AddModalProps) => {

    const [message, setMessage] = useState<string>();

    const handleChange= (event?: any)=> {
        setMessage(event.target.value);
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Add {props.user ? props.user.username + ' as': ' '} Friends</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" placeholder="send message to user." onChange={handleChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> props.handleClose()}>Close</Button>
                <Button variant="primary" onClick={()=> props.handleSubmit(props.user, message)}>Send</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddModal;