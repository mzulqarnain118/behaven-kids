import React from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate  } from "react-router-dom";

interface CongratulationsPopup {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<any>>;
  parentFirstName: string;
}

const CongratulationsPopup: React.FC<CongratulationsPopup> = ({showModel, setShowModel, parentFirstName}) => {
  if (!open) return null;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/", { replace: true });
    setShowModel(false)};

  return (
    <>
    <div>

    
      <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title style={{fontSize: "30px"}}>Welcome {parentFirstName}</BootstrapModal.Title>
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
      </div>
    
    </>
    
  );
};

export default CongratulationsPopup;
