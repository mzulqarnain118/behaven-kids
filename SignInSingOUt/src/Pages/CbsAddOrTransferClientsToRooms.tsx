import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";
import PopupChooseWhichRoomForClient from "../Components/PopupChooseWhichRoomForClient";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ChildInfo {
    id: number
    clientID: number;
    clientFirstName: string;
    clientLastName: string;
    signInTime: string;
    signOutTime: string;
    defaultRoomID: number;
}

interface ClientInfoResponse {
    distinctClientSignInOutInfo: ChildInfo[];
    allClientsWhoAreDefaultedForARoom: ChildInfo[];
}

interface DecodedToken {
    StaffID: string;
    Location: string;
}

interface CbsInfo {
    cbsStaffFirstName: string;
    cbsStaffLastName: string;
    cbsRoomID: number;
    cbsRoomName: string;
    cbsLocationID: string;
}

const CbsAddOrTransferClientsToRooms: React.FC = () => {

    const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
    const [clientsWhoAreSignedIn, setClientsWhoAreSignedIn] = useState<ChildInfo[]>([]);
    const [clientsWhoAreCurrentlyInARoom, setClientsWhoAreCurrentlyInARoom] = useState<ChildInfo[]>([]);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [roomID, setRoomID] = useState<number| null>(null);;
    const [locationID, setLocationID] = useState<string>("");
    const [clientID, setClientID] = useState<number | null>(null);
    const [roomName, setRoomName] = useState<string>("");

    // useEffect(() => {
    //     const eventSource = new EventSource('https://localhost:7021/Cbs/RealTimeUpdates');

    //     eventSource.onmessage = (event) => {
    //       const newData = JSON.parse(event.data);
    //       console.log ("newData", newData);
    //     };

    //     eventSource.onerror = (error) => {
    //       console.error('EventSource failed:', error);
    //       eventSource.close();
    //     };

    //     return () => {
    //       eventSource.close();
    //     };
    //   }, []);

    useEffect(() => {
        getCBSInformation();
    }, []);

    useEffect(() => {
        if (roomID !== null)
            {
                getClientsThatAreWaitingInTheWaitingRoom();
                getAllClientsThatAreInARoom();
            }
 
    }, [roomID]);

    const getCBSInformation = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }
            const decoded = jwtDecode(token) as DecodedToken;
            const staffID = decoded.StaffID;

            const response = await fetch(`${backEndCodeURLLocation}Cbs/GetCbsInformation?staffID=${staffID}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
            }

            const data = await response.json();
            setRoomID(data[0].cbsRoomID);
            setRoomName(data[0].cbsRoomName);
            setLocationID(data[0].cbsLocationID);

            console.log("data[0].cbsLocationID = ", data[0].cbsLocationID);
        } catch (error) {
            alert("Useffect 1 - Error fetching data:" + error);
        }
    };

    

    const getClientsThatAreWaitingInTheWaitingRoom = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }
            console.log("roomID = " + roomID)
            const response = await fetch(`${backEndCodeURLLocation}Cbs/GetClientsWhoAreSignedInAndReadyToBeAssignedToARoom_AndWhoAreAbsent?roomID=${roomID}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
            }

            const data: ClientInfoResponse = await response.json();

            setClientsWhoAreSignedIn(data.distinctClientSignInOutInfo);

            setChildInfo(data.allClientsWhoAreDefaultedForARoom);

        } catch (error) {
            alert("Useffect 1 - Error fetching data:" + error);
        }
    };

    const getAllClientsThatAreInARoom = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            const url = `${backEndCodeURLLocation}Cbs/GetAllClientsWhoAreCurrentlyInTheCBSRoom?roomID=${roomID}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
            }

            const data = await response.json();

            setClientsWhoAreCurrentlyInARoom(data);

        } catch (error) {
            alert("Useffect 2 - Error fetching data:" + error);
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
    //             if (!token) {
    //                 throw new Error("Token not found in localStorage");
    //             }
    //             const decoded = jwtDecode(token) as DecodedToken;
    //              const staffID = decoded.StaffID;

    //             setRoomID("staffID = " + staffID);

    //             const response = await fetch(`${backEndCodeURLLocation}Cbs/GetClientsWhoAreSignedInAndReadyToBeAssignedToARoom_AndWhoAreAbsent?roomID=${staffID}`, {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             if (!response.ok) {
    //                 alert(`Failed to fetch data. Response status: ${response.status}`)
    //             }

    //             const data: ClientInfoResponse = await response.json();

    //             setClientsWhoAreSignedIn(data.distinctClientSignInOutInfo);

    //             setChildInfo(data.allClientsWhoAreDefaultedForARoom);

    //         } catch (error) {
    //             alert("Useffect 1 - Error fetching data:" + error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    const WhichRoomWillClientGoTo = async (clientID: number) => {
        setClientID(clientID);
        setShowModel(true);
    };

    const PutClientInDeseignatedRoom = async (clientID: number, defaultRoomID: number) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token not found in localStorage");
            }
            const url = `${backEndCodeURLLocation}Cbs/CbsPutClientInDefaultRoom?cliendID=${clientID}&roomID=${defaultRoomID}`;

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
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    className="card"
                    style={{
                        width: "750px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <div>
                        <h2>{roomName}</h2>
                        <div className="card-body">

                            <h2>Ins</h2>
                            {clientsWhoAreCurrentlyInARoom.map((info,) => (
                                <div>
                                    <br />
                                    <button onClick={() => WhichRoomWillClientGoTo(info.clientID)} className="btn btn-success" style={{ width: "250px" }}>{info.clientFirstName + " " + info.clientLastName}</button>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="card-body">
                        <h2>Needs assigning</h2>
                        {clientsWhoAreSignedIn.map((info,) => (
                            <div>
                                <br />
                                <button onClick={() => PutClientInDeseignatedRoom(info.clientID, info.defaultRoomID)} className="btn btn-warning" style={{ width: "250px" }}>{info.clientFirstName + " " + info.clientLastName}</button>
                            </div>
                        ))}

                    </div>
                    <div className="card-body">
                        <h2>Absent</h2>
                        {childInfo.map((info,) => (
                            <div>
                                <br />
                                <button className="btn btn-secondary" style={{ width: "250px" }}>{info.clientFirstName + " " + info.clientLastName}</button>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
            {clientID !== null && roomID !== null && (
                <PopupChooseWhichRoomForClient showModel={showModel} setShowModel={setShowModel} roomID={roomID.toString()} locationID={locationID} clientID={clientID} />
            )}
        </>
    );
};

export default CbsAddOrTransferClientsToRooms;
