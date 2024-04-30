

import React from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

interface CbsAddOrTransferClientsToRooms {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    // parentFirstName: string;
}

// const CongratulationsPopup: React.FC<CongratulationsPopup> = ({showModel, setShowModel, parentFirstName}) => {
const CbsAddOrTransferClientsToRooms: React.FC<CbsAddOrTransferClientsToRooms> = ({ showModel, setShowModel }) => {
    if (!open) return null;
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/CbsAddOrTransferClientsToRooms", { replace: true });
        setShowModel(false)
    };

    const AssignCurrentRoom = async () => {


        navigate("/CbsAddOrTransferClientsToRooms", { replace: true });
        setShowModel(false)
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title style={{ fontSize: "30px" }}>Choose A Room</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ textAlign: "center" }}>
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px" }}>Bee</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px", marginLeft: "15px" }}>Apple</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px" }}>Bird</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px", marginLeft: "15px" }}>Terappy</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px" }}>Horse</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px", marginLeft: "15px" }}>Playground</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px" }}>Time Out Upstairs</button>
                                <button className="btn btn-secondary" style={{ width: "200px", marginTop: "15px", marginLeft: "15px" }}>Time Out Downstairs</button>
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

export default CbsAddOrTransferClientsToRooms;
