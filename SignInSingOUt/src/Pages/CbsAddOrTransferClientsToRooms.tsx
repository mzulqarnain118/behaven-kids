import { useState, useEffect } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
// import "./CSS/AddParentChildInfo.css";
import PopupChooseWhichRoomForClient from "../Components/PopupChooseWhichRoomForClient";
import { jwtDecode } from "jwt-decode";
import Horse from '../../src/assets/horse.png';
import Bee from '../../src/assets/bee.png';
import Apple from '../../src/assets/apple.png';
import Bird from '../../src/assets/bird.png';
import Parrot from '../../src/assets/parrot.png';
import { useFetcher } from "react-router-dom";

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

interface RoomInfoDTO {
    roomID: number;
    roomName: string;
}

// interface CbsInfo {
//     cbsStaffFirstName: string;
//     cbsStaffLastName: string;
//     cbsRoomID: number;
//     cbsRoomName: string;
//     cbsLocationID: string;
// }

const CbsAddOrTransferClientsToRooms: React.FC = () => {

    const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
    const [clientsWhoAreSignedIn, setClientsWhoAreSignedIn] = useState<ChildInfo[]>([]);
    const [clientsWhoAreCurrentlyInARoom, setClientsWhoAreCurrentlyInARoom] = useState<ChildInfo[]>([]);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [roomID, setRoomID] = useState<number | null>(null);;
    const [locationID, setLocationID] = useState<string>("");
    const [clientID, setClientID] = useState<number | null>(null);
    const [roomName, setRoomName] = useState<string>("");
    const [cbsFullName, setCbsFullName] = useState<string>("");
    const [, setCurrentTime] = useState(new Date());
    const [roomImgSrc, setRoomImgSrc] = useState<string>("");
    const [roomInfo, setRoomInfo] = useState<RoomInfoDTO[]>([]);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }
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
        if (roomID !== null) {
            getClientsThatAreWaitingInTheWaitingRoom();
            getAllClientsThatAreInARoom();
        }
    }, [roomID]);

    useEffect(() => {
        if (roomName === 'Horse') {
            setRoomImgSrc(Horse);
        } else if (roomName === 'Bee') {
            setRoomImgSrc(Bee);
        } else if (roomName === 'Apple') {
            setRoomImgSrc(Apple);
        } else if (roomName === 'Bird') {
            setRoomImgSrc(Bird);
        } else if (roomName === 'Parrot') {
            setRoomImgSrc(Parrot);
        } else {
            setRoomImgSrc("");
        }
    }, [roomName]);

    useEffect(() => {
        if (locationID !== null && roomID !== null) {
            getRoomInfoWhereClientsCanGoTo();
        }
    }, [locationID]);

    const getRoomInfoWhereClientsCanGoTo = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Failed To Fetch Token");
            }
            const response = await fetch(`${backEndCodeURLLocation}Cbs/GetAllRoomsThatAClientCanGoTo?locationID=${locationID}&roomID=${roomID}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert("Error getting room names");
                return;
            }
            const data = await response.json();
            setRoomInfo(data);
            console.log("getRoomInfoWhereClientsCanGoTo", data);

        } catch (error) {

            alert("error" + error);
        }

    };

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
            setCbsFullName(data[0].cbsStaffFirstName + " " + data[0].cbsStaffLastName);

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

            const response = await fetch(`${backEndCodeURLLocation}Cbs/GetAllClientsWhoAreCurrentlyInTheCBSRoom?roomID=${roomID}`, {
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

            const response = await fetch(`${backEndCodeURLLocation}Cbs/CbsPutClientInDefaultRoom?cliendID=${clientID}&roomID=${defaultRoomID}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
            }

            getAllClientsThatAreInARoom();
            getClientsThatAreWaitingInTheWaitingRoom();
            // window.location.reload();
        } catch (error) {
            alert("Error fetching data:" + error);
        }
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
                    <h4>&#128198; {new Date().toLocaleDateString()}</h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={roomImgSrc} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
                        <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomName}</h4>
                    </div>

                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
                    <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
                    <h4 style={{ marginTop: "15px" }}>CBS: {cbsFullName}</h4>
                </div>
            </div>
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

                    <div className="card-body">
                        <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "250px" }}>
                            <div className="card-body">
                                <h2>Assigned</h2>
                                <div className="grid-container-For-CBS-page">
                                    {clientsWhoAreCurrentlyInARoom.map((info,) => (
                                        <button key={info.clientID} onClick={() => WhichRoomWillClientGoTo(info.clientID)} className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", backgroundColor: "lightgreen" }}>{info.clientFirstName + " " + info.clientLastName}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card-body">
                        <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "250px" }}>
                            <div className="card-body">
                                <h2>Unassigned</h2>
                                <div className="grid-container-For-CBS-page">
                                    {clientsWhoAreSignedIn.map((info,) => (
                                        <button onClick={() => PutClientInDeseignatedRoom(info.clientID, info.defaultRoomID)} className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", backgroundColor: "lightpink" }}>{info.clientFirstName + " " + info.clientLastName}</button>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "250px" }}>
                            <div className="card-body">
                                <h2>Not In</h2>
                                <div className="grid-container-For-CBS-page">
                                    {childInfo.map((info,) => (
                                        <button className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", backgroundColor: "lightgrey" }} >{info.clientFirstName + " " + info.clientLastName}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {clientID !== null && roomID !== null && (
                <PopupChooseWhichRoomForClient showModel={showModel} setShowModel={setShowModel} roomInfo={roomInfo} clientID={clientID} />
            )}
        </>
    );
};

export default CbsAddOrTransferClientsToRooms;
