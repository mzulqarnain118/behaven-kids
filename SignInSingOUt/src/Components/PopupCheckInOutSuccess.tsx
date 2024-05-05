import React, {useEffect, useState} from "react";
import "./animation.scss";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import BehavenLogo from "../assets/BehavenLogo.jpg";

interface ClientsCheckinCheckoutPopup {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<any>>;
}


const ClientsCheckinCheckoutPopup: React.FC<ClientsCheckinCheckoutPopup> = ({showModel, setShowModel}) => {
  if (!open) return null;
  const navigate = useNavigate();
  const [, setDidUserManualyClosedTheShowModel] = useState<boolean>(false);

  const handleClose = () => {
    setDidUserManualyClosedTheShowModel(true);
    setShowModel(false);
    navigate("/", { replace: true });
  };
  
  useEffect(() => {
    if (showModel === true) {
      console.log("here");
      setTimeout(() => {
        setDidUserManualyClosedTheShowModel(prev => {
          if (!prev) {
            navigate("/", { replace: true });
            setShowModel(false);
          }
          return prev; 
        });
      }, 3000);
    }
  }, [showModel]);

  return (
    <>
      <div>
        <BootstrapModal
          dialogClassName="custom-modal"
          show={showModel}
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
              <h1>Thank You</h1>
              <img
                src={BehavenLogo}
                alt="Behaven Logo"
                style={{ height: "200px", width: "450px", marginTop: "40px" }}
              />
            </div>
          </BootstrapModal.Body>
        </BootstrapModal>
      </div>
    </>
  );
};

export default ClientsCheckinCheckoutPopup;
