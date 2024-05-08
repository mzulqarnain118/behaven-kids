
import React, { useState, useEffect } from "react";
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
}

interface RoomInfoDTO {
    roomID: number;
    roomName: string;
}

    const CbsAddOrTransferClientsToRooms: React.FC<CbsAddOrTransferClientsToRooms> = ({ showModel, setShowModel, roomInfo, clientID }) => {
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
            window.location.reload();
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
                        <BootstrapModal.Title style={{ fontSize: "30px" }}>Choose A Room</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ textAlign: "center" }}>
                            <div style={{ textAlign: "center" }}>
                                {roomInfo.map((info) => (
                                    
                                    <button
                                        key={info.roomID}
                                        className="round-button-for-class grid-item-container-For-CBS-page" 
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
