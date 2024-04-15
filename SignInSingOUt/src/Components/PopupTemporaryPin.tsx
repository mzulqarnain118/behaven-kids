import React from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";

interface PopupTemporaryPin {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<any>>;
  parentFullName: string
  parentTemporaryPin: string;
}

const PopupTemporaryPin: React.FC<PopupTemporaryPin> = ({showModel, setShowModel, parentFullName, parentTemporaryPin}) => {
  if (!open) return null;

  const handleClose = () => {
    setShowModel(false)};
  return (
    <>
    <div>

    
      <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title style={{fontSize: "30px"}}>{parentFullName} </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
          <h1>{parentTemporaryPin}</h1>
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
      </div>
    
    </>
    
  );
};

export default PopupTemporaryPin;
