import React, { useState } from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";

interface CongratulationsPopup {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<any>>;
}

const CongratulationsPopup: React.FC<CongratulationsPopup> = ({showModel, setShowModel}) => {
  if (!open) return null;

  // const [show, setShow] = useState(false);

  const handleClose = () => setShowModel(false);
  const handleShow = () => setShowModel(true);

  return (
    <>
      <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <BootstrapModal show={showModel} onHide={handleClose}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Welcome</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
          <div className="success-checkmark" >
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
    
    </>
    
  );
};

export default CongratulationsPopup;
