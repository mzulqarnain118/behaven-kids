import React, {useEffect, useState} from "react";
import "./animation.scss";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

interface ParentPinFialedAttemptsPopup {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
}


const ParentPinFialedAttemptsPopup: React.FC<ParentPinFialedAttemptsPopup> = ({showModal, setShowModal}) => {
  if (!open) return null;
  const navigate = useNavigate();
  const [, setDidUserManualyClosedTheShowModel] = useState<boolean>(false);

  const handleClose = () => {
    setDidUserManualyClosedTheShowModel(true);
    setShowModal(false);
    navigate("/", { replace: true });
  };
  
  useEffect(() => {
    if (showModal === true) {
      console.log("here");
      setTimeout(() => {
        setDidUserManualyClosedTheShowModel(prev => {
          if (!prev) {
            navigate("/", { replace: true });
            setShowModal(false);
          }
          return prev; 
        });
      }, 3000);
    }
  }, [showModal]);

  return (
    <>
      <div>
        <BootstrapModal
          dialogClassName="custom-modal"
          show={showModal}
          onHide={handleClose}
          centered
          size="lg"
        >
          <BootstrapModal.Header closeButton>
          </BootstrapModal.Header>
          <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
            <div style={{
              fontSize: "20px",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <h2>Too Many Failed Attempts</h2>
              <p style={{fontSize: "200px"}}>🔒</p>
            </div>
          </BootstrapModal.Body>
        </BootstrapModal>
      </div>
    </>
  );
};

export default ParentPinFialedAttemptsPopup;
