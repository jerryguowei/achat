import { Modal, Button} from 'react-bootstrap';
import React, { useEffect } from 'react';
import './index.css';
import { useRef } from 'react';


interface BoostrapModalProps {
  show: boolean,
  handleClose:  React.MouseEventHandler<HTMLElement>,
  message: string,
  hasConfirm: boolean,
  confirm?: React.MouseEventHandler<HTMLElement>
}

function BootStrapModal({show = false, handleClose, message, hasConfirm = false, confirm} : BoostrapModalProps){
  let innerRef = useRef<HTMLButtonElement>(null);
   useEffect(() => {
     if(innerRef && innerRef.current ){
      innerRef.current.focus();
     }
   });
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} ref={innerRef}>
            Close
          </Button>
          {hasConfirm ? (<Button variant="primary" 
            ref={innerRef} 
            onClick={confirm}>Confirm</Button>) : ''}
        </Modal.Footer>
      </Modal>
  );
}
export default BootStrapModal
