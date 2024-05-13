
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";

interface CbsAddOrTransferClientsToRooms {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    roomInfo: RoomInfoDTO[];
    clientID: number;
    clientFullName: string;
}

interface RoomInfoDTO {
    roomID: number;
    roomName: string;
}

const CbsAddOrTransferClientsToRooms: React.FC<CbsAddOrTransferClientsToRooms> = ({ showModel, setShowModel, roomInfo, clientID, clientFullName }) => {
    if (!open) return null;
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/CbsAddOrTransferClientsToRooms", { replace: true });
        setShowModel(false)
    };

    const transferToAnotherRoom = async (newRoomID: number) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token not found in localStorage");
            }
            const url = `${backEndCodeURLLocation}Cbs/CbsChangesClientsToAWaitingRoom?cliendID=${clientID}&roomID=${newRoomID}`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
            }
        } catch (error) {
            alert("Error fetching data:" + error);
        }
        setShowModel(false)
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title className="ms-auto" style={{ fontSize: "30px" }}>Client Transfer</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ textAlign: "center" }}>
                            <h4>{clientFullName}</h4>
                            <br />
                            <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                {roomInfo.filter(info => !info.roomName.includes("ABA") && info.roomName !== "None").map((info) => (

                                    <button
                                        key={info.roomID}
                                        style={{ width: "150px" }}
                                        className="round-button-for-class grid-item-container-for-room-selection"
                                        onClick={() => transferToAnotherRoom(info.roomID)}
                                    >
                                        {info.roomName}
                                    </button>
                                ))}
                            </div>
                            <hr />
                            <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                {roomInfo
                                    .filter(info => info.roomName === "ABA") // Filter out items where roomName is "aba"
                                    .map(info => (
                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-class grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.roomName}
                                        </button>
                                    ))}
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
