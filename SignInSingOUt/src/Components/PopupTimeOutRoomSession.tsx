import React, { useState } from "react";
import "./animation.scss";
import BootstrapModal from "react-bootstrap/Modal";

interface PopupTimeOutRoomSession {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
    setDidUserClickStart: React.Dispatch<React.SetStateAction<any>>;
    setDidUserClickYes: React.Dispatch<React.SetStateAction<any>>;
}

const PopupTimeOutRoomSession: React.FC<PopupTimeOutRoomSession> = ({ showModal, setShowModal, setDidUserClickStart, setDidUserClickYes}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!open) return null;

    const handleClose = () => {
        setShowModal(false);
    };

    const submitTimeoutData = () => {
        setDidUserClickStart(false);
        setIsSubmitting(true);
        setShowModal(false);
        setDidUserClickYes(true);
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModal} onHide={handleClose} centered>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>Do you want to finish this</h4>
                                    <h4>Time Out Room Session.</h4>
                                </div>
                                <div style={{ marginTop: "40px"}}>
                                    <button className="btn btn-success" type="button" style={{marginTop: "8px", height: "55px", width: "125px", fontSize: "20px" }} onClick={submitTimeoutData} disabled={isSubmitting}> {isSubmitting ? "Submitting..." : "Yes"} </button>
                                    <button className="btn btn-danger" type="button" style={{ marginLeft: "35px", marginTop: "8px", height: "55px", width: "125px", fontSize: "20px" }} onClick={handleClose} disabled={isSubmitting}> No </button>
                                </div>
                            </div>
                        </div>
                    </BootstrapModal.Body>
                </BootstrapModal>
            </div>

        </>

    );
};

export default PopupTimeOutRoomSession;