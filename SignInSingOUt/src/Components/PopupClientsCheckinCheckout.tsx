import React from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import BehavenLogo from "../assets/BehavenLogo.jpg";

interface ClientsCheckinCheckoutPopup {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    clientFirstName: string;
    clientLastName: string;
    isCheckIn: boolean;
    // parentFirstName: string;
}

const ClientsCheckinCheckoutPopup: React.FC<ClientsCheckinCheckoutPopup> = ({ showModel, setShowModel, clientFirstName, clientLastName, isCheckIn }) => {
    if (!open) return null;
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/", { replace: true });
        setShowModel(false)
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered size="lg">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title style={{ fontSize: "30px", textAlign: "center" }} className="align-items-center">Thank you - Checked In</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex">
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    fontSize: "20px",
                                    height: "500px"
                                }}
                            >
                               <img
        src={BehavenLogo}
        alt="Behaven Logo"
        style={{ height: "75px", marginLeft: "50%"}}
      />
                            </div>

                        </div>
                    </BootstrapModal.Body>
                </BootstrapModal>
            </div>

        </>

    );
};

export default ClientsCheckinCheckoutPopup;