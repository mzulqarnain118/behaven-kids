
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
// import { useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import Health from '../../src/assets/health.png';
import { useNavigate } from "react-router-dom";

interface CbsAddOrTransferClientsToRooms {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    roomInfo: RoomInfoDTO[];
    clientID: number;
    clientFullName: string;
    clientProgram: string;
    previousRoomID?: number;
    staffFullName: string;
    staffID: string;
    locationID: string;
}

interface RoomInfoDTO {
    roomID: number;
    roomName: string;
    staffFirstName: string;
    staffLastName: string;
}

const CbsAddOrTransferClientsToRooms: React.FC<CbsAddOrTransferClientsToRooms> = ({ showModel, setShowModel, roomInfo, clientID, clientFullName, clientProgram, previousRoomID, staffFullName, staffID, locationID }) => {
    if (!open) return null;
    // const navigate = useNavigate();

    const handleClose = () => {
        // navigate("/CbsAddOrTransferClientsToRooms", { replace: true });
        setShowModel(false)
    };
    const navigate = useNavigate();
    const goToHealthCheckUp = async () => {
        try {
            navigate("/HealthCheck", {
                replace: true,
                state: { clientID: clientID, clientFullName: clientFullName, staffFullName: staffFullName },
            });

        } catch (error) {
            alert("Error fetching data:" + error);
        }
        setShowModel(false);
    };

    const transferToAnotherRoom = async (newRoomID: number) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            const url = `${backEndCodeURLLocation}Cbs/CbsChangesClientsToAWaitingRoom?cliendID=${clientID}&roomID=${newRoomID}&staffIDWhoTransferedClient=${staffID}&locationID=${locationID}&previousRoomID=${previousRoomID}`;
            console.log(url);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to transfer client to another room: ${response.status}`)
            }
            setShowModel(false);

        } catch (error) {
            alert("Error:" + error);
        }
    };
    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title className="ms-auto" style={{ fontSize: "30px" }}>Client Transfer</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        {clientProgram === "ABA" && (
                            <div style={{ textAlign: "center" }}>
                                <h4>{clientFullName} - {clientProgram}</h4>
                                <br />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo
                                        .filter(info => info.roomName.includes("RBT") && info.staffFirstName !== null)
                                        .map(info => (
                                            <button
                                                key={info.roomID}
                                                style={{ width: "150px" }}
                                                className="round-button-for-choose-room grid-item-container-for-room-selection"
                                                onClick={() => transferToAnotherRoom(info.roomID)}>
                                                {info.staffFirstName} {info.staffLastName.charAt(0)}.
                                            </button>
                                        ))}
                                </div>
                                <hr />
                                <button
                                    style={{ width: "150px" }}
                                    className="round-button-for-choose-room grid-item-container-for-room-selection"
                                    onClick={() => transferToAnotherRoom(34)}> RBT
                                </button>
                            </div>
                        )}
                        {clientProgram === "SDP" && (
                            <div style={{ textAlign: "center" }}>
                                <h4>{clientFullName}</h4>
                                <br />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo.filter(info => !info.roomName.includes("RBT") && !info.roomName.includes("THR") && !info.roomName.includes("GS") && !info.roomName.includes("TOR") && info.roomName !== "None").map((info) => (

                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-choose-room grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.roomName}
                                        </button>
                                    ))}
                                </div>
                                <hr />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo.filter(info => info.roomName.includes("THR") || info.roomName.includes("GS")).map((info) => (
                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-choose-room grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.staffFirstName} {info.staffLastName.charAt(0)}.
                                        </button>
                                    ))}

                                </div>
                                <hr />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo.filter(info => info.roomName.includes("TOR")).map((info) => (
                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-choose-room grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.roomName}
                                        </button>
                                    ))}
                                </div>
                                <hr />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">

                                    <button
                                        style={{ width: "150px" }}
                                        className="round-button-for-choose-room grid-item-container-for-room-selection"
                                        onClick={() => goToHealthCheckUp()}
                                    >
                                        <span><img src={Health} style={{ width: "30px", marginBottom: "5px" }}></img><span style={{ marginLeft: "5px" }}>Health</span></span>
                                    </button>

                                </div>

                            </div>
                        )}
                        {clientProgram === "Both" && (
                            <div style={{ textAlign: "center" }}>
                                <h4>{clientFullName}</h4>
                                <br />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo.filter(info => !info.roomName.includes("RBT") && !info.roomName.includes("THR") && !info.roomName.includes("GS") && !info.roomName.includes("TOR") && info.roomName !== "None").map((info) => (

                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-choose-room grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.roomName}
                                        </button>
                                    ))}
                                    {/* {roomInfo.filter(info => info.roomName.includes("GS")).map((info) => (
                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-choose-room grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.staffFirstName} {info.staffLastName.charAt(0)}.
                                        </button>
                                    ))} */}

                                </div>
                                <hr />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo
                                        .filter(info => info.roomName.includes("RBT"))
                                        .map(info => (
                                            <button
                                                key={info.roomID}
                                                style={{ width: "150px" }}
                                                className="round-button-for-choose-room grid-item-container-for-room-selection"
                                                onClick={() => transferToAnotherRoom(info.roomID)}
                                            >
                                                {info.staffFirstName} {info.staffLastName.charAt(0)}.
                                            </button>
                                        ))}
                                </div>
                                <hr />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">
                                    {roomInfo.filter(info => info.roomName.includes("TOR")).map((info) => (
                                        <button
                                            key={info.roomID}
                                            style={{ width: "150px" }}
                                            className="round-button-for-choose-room grid-item-container-for-room-selection"
                                            onClick={() => transferToAnotherRoom(info.roomID)}
                                        >
                                            {info.roomName}
                                        </button>
                                    ))}
                                </div>
                                <hr />
                                <div style={{ textAlign: "center" }} className="grid-container-for-room-selection">

                                    <button
                                        style={{ width: "150px" }}
                                        className="round-button-for-choose-room grid-item-container-for-room-selection"
                                        onClick={() => goToHealthCheckUp()}
                                    >
                                        <span><img src={Health} style={{ width: "30px", marginBottom: "5px" }}></img><span style={{ marginLeft: "5px" }}>Health</span></span>
                                    </button>
                                </div>
                            </div>
                        )}
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
