
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import { useState, useEffect } from "react";

interface CbsAddOrTransferClientsToRooms {
    showGetClientsAreWaitingToBeAsignToARoomModel: boolean;
    setShowGetClientsAreWaitingToBeAsignToARoomModel: React.Dispatch<React.SetStateAction<any>>;
    roomID: number;
    locationID: string;
    cbsProgramType: string;
}

interface ClientInfo {
    id: number
    clientID: number;
    clientFirstName: string;
    clientLastName: string;
}

const PopupGetClientsWhoAreWaitingToBeAsignToARoom: React.FC<CbsAddOrTransferClientsToRooms> = ({ showGetClientsAreWaitingToBeAsignToARoomModel, setShowGetClientsAreWaitingToBeAsignToARoomModel, roomID, locationID, cbsProgramType}) => {
    if (!open) return null;
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/CbsAddOrTransferClientsToRooms", { replace: true });
        setShowGetClientsAreWaitingToBeAsignToARoomModel(false)
    };

    const [allClientInfo, setAllClientInfo] = useState<ClientInfo[]>([]);

    useEffect(() => {
        getAllClientsThatAreWaitingToBeAssignToARoom();
    }, [showGetClientsAreWaitingToBeAsignToARoomModel]);

    const getAllClientsThatAreWaitingToBeAssignToARoom = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            const response = await fetch(`${backEndCodeURLLocation}Cbs/GetAllClientsWhoAreNotCurrentlyInaARoom?locationID=${locationID}&programType=${cbsProgramType}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
                return;
            }

            const data = await response.json();
            setAllClientInfo(data);

        } catch (error) {
            alert("Error fetching data:" + error);
        }
    };

    const transferToAnotherRoom = async (clientID: number) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please Login");
                navigate("/", { replace: true });
                return;
            }

            const response = await fetch(`${backEndCodeURLLocation}Cbs/CbsPutClientInTheirRoom?cliendID=${clientID}&roomID=${roomID}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
            }

            // getAllClientsThatAreInARoom();
            // getClientsThatAreWaitingInTheWaitingRoom();
            // window.location.reload();
        } catch (error) {
            alert("Error fetching data:" + error);
        }
        setShowGetClientsAreWaitingToBeAsignToARoomModel(false)
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal-for-getting-a-client-that-is-unassigned" show={showGetClientsAreWaitingToBeAsignToARoomModel} onHide={handleClose} centered >
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title className="ms-auto" style={{ fontSize: "30px" }}>Client Transfer</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center" >
                        {allClientInfo !== null &&
                        
                            <div style={{ textAlign: "center" }}>
                            <br />
                            <div style={{ textAlign: "center" }} className="grid-container-for-clients-that-are-unasigned">
                                {allClientInfo.map((info) => (

                                    <button
                                        key={info.id}
                                        style={{ width: "200px" }}
                                        className="round-button-for-class grid-item-container-for-room-selection"
                                        onClick={() => transferToAnotherRoom(info.clientID)}
                                    >
                                        {info.clientFirstName}  {info.clientLastName}
                                    </button>
                                ))}
                            </div>
                        </div>
                        }
                        
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

export default PopupGetClientsWhoAreWaitingToBeAsignToARoom;
