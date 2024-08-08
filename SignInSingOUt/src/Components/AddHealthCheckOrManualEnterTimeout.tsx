
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import ManuallyAddTimeoutModal from "../Components/ManuallyAddTimeoutModal";
import { useState } from "react";

interface CbsAddOrTransferClientsToRooms {
    showOptionsForClientsWhoAreNotSignInModel: boolean;
    setShowOptionsForClientsWhoAreNotSignInModel: React.Dispatch<React.SetStateAction<any>>;
    clientID: number;
    clientFullName: string;
    staffID: string;
    locationID: string;
}

const AddHealthCheckOrManualEnterTimeout: React.FC<CbsAddOrTransferClientsToRooms> = ({ showOptionsForClientsWhoAreNotSignInModel, setShowOptionsForClientsWhoAreNotSignInModel, clientID, clientFullName, staffID, locationID }) => {
    
    const [showManualTimeOutModal, setShowManualTimeOutModal] = useState<boolean>(false);
    
    if (!open) return null;
    const handleClose = async () => {
        setShowOptionsForClientsWhoAreNotSignInModel(false)
    };

    const openTimeoutManualModal = async () => {
        try {
            setShowManualTimeOutModal(true);
            setShowOptionsForClientsWhoAreNotSignInModel(false);

        } catch (error) {
            alert(error);
        }
        setShowOptionsForClientsWhoAreNotSignInModel(false);
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showOptionsForClientsWhoAreNotSignInModel} onHide={handleClose} centered>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title className="ms-auto" style={{ fontSize: "30px" }}>Client Transfer</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">              
                                <div style={{ marginTop: "10px" }} >
                                    <button
                                        style={{ width: "320px", display: 'flex', alignItems: 'center', marginLeft: "5px" }}
                                        className="round-button-for-choose-room grid-item-container-for-room-selection"
                                        onClick={() => openTimeoutManualModal()}
                                    >
                                        <p style={{ flex: '2', margin: '0' }}>Add Timeout Manually</p>
                                    </button>
                                </div>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
                {clientID !== null && clientFullName !== null && staffID !== null && (
                    <ManuallyAddTimeoutModal showModel={showManualTimeOutModal} setShowModel={setShowManualTimeOutModal} clientID={clientID} clientFullName={clientFullName} locationID={locationID} staffID={staffID} />
                )}
            </div>
        </>

    );
};

export default AddHealthCheckOrManualEnterTimeout;
