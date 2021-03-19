import { Modal, Button} from 'react-bootstrap';
import React from 'react';
import './index.css';


interface BoostrapModalProps {
  show: boolean,
  handleClose:  React.MouseEventHandler<HTMLElement>,
  message: string,
  hasConfirm: boolean,
  confirm?: React.MouseEventHandler<HTMLElement>
}

function BootStrapModal({show = false, handleClose, message, hasConfirm = false, confirm} : BoostrapModalProps){
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {hasConfirm ? (<Button variant="primary" onClick={confirm}>Confirm</Button>) : ''}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default BootStrapModal
