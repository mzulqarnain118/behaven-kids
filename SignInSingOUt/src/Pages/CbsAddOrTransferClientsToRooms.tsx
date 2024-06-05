import { useState, useEffect } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import { backEndCodeURLLocation } from "../config";
import PopupChooseWhichRoomForClient from "../Components/PopupChooseWhichRoomForClient";
import { jwtDecode } from "jwt-decode";
import Horse from '../../src/assets/horse.png';
import Bee from '../../src/assets/bee.png';
import Apple from '../../src/assets/apple.png';
import Bird from '../../src/assets/bird.png';
import Parrot from '../../src/assets/parrot.png';
import Person from '../../src/assets/person.png';
import RBT from '../../src/assets/rbt.png'
import Therapy from '../../src/assets/therapy.png'
import Gs from '../../src/assets/gs.png'
import { useNavigate } from "react-router-dom";
import PopupGetClientsWhoAreWaitingToBeAsignToARoom from '../Components/PopupGetClientsWhoAreWaitingToBeAsignToARoom'

interface ChildInfo {
    id: number
    clientID: number;
    clientFirstName: string;
    clientLastName: string;
    signInTime: string;
    signOutTime: string;
    defaultRoomID: number;
    program: string;
}

interface ClientInfoResponse {
    distinctClientSignInOutInfo: ChildInfo[];
    allClientsWhoAreDefaultedForARoom: ChildInfo[];
    clientsWhoAreCurrentlyInARoom: ChildInfo[];
}

interface DecodedToken {
    StaffID: string;
    Location: string;
}

interface RoomInfoDTO {
    roomID: number;
    roomName: string;
    staffFirstName: string;
    staffLastName: string;
}

const CbsAddOrTransferClientsToRooms: React.FC = () => {

    const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
    const [clientsWhoAreSignedIn, setClientsWhoAreSignedIn] = useState<ChildInfo[]>([]);
    const [clientsWhoAreCurrentlyInARoom, setClientsWhoAreCurrentlyInARoom] = useState<ChildInfo[]>([]);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [showGetClientsAreWaitingToBeAsignToARoomModel, setShowGetClientsAreWaitingToBeAsignToARoomModel] = useState<boolean>(false);
    const [roomID, setRoomID] = useState<number | null>(null);
    const [locationID, setLocationID] = useState<string>("");
    const [clientID, setClientID] = useState<number | null>(null);
    const [roomName, setRoomName] = useState<string>("");
    const [cbsFullName, setCbsFullName] = useState<string>("");
    const [clientFullName, setClientFullName] = useState<string>("");
    const [, setCurrentTime] = useState(new Date());
    const [roomImgSrc, setRoomImgSrc] = useState<string>("");
    const [clientProgram, setClientProgram] = useState<string>("");
    const [cbsProgramType, setCbsProgramType] = useState<string>("");
    const [roomInfo, setRoomInfo] = useState<RoomInfoDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }
    useEffect(() => {
        Testing();
        console.log("apple");
    }, [roomID]);

    const Testing = async () => {
        if (roomID === null) {
            return;
        }
        const eventSource = new EventSource(`${backEndCodeURLLocation}Cbs/RealTimeUpdates?roomID=${roomID}`);
        //const eventSource = new EventSource(`http://192.168.0.9:7012/Cbs/RealTimeUpdates?roomID=${roomID}`);

        eventSource.onmessage = (event) => {

            const data: ClientInfoResponse = JSON.parse(event.data);

            setClientsWhoAreSignedIn(data.distinctClientSignInOutInfo);

            setChildInfo(data.allClientsWhoAreDefaultedForARoom);

            setClientsWhoAreCurrentlyInARoom(data.clientsWhoAreCurrentlyInARoom);

        };


        eventSource.onerror = () => {
            window.location.reload();
        };
        return () => {
            eventSource.close();
        };
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login page if token is not present
            return;
        }

        const decoded = jwtDecode(token);
        const userRole = (decoded as any).role;
        if (userRole !== "floor") {
            navigate("/"); // Redirect to login page if user role is not "floor"
            return;
        }
    }, []);

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
        } else if (roomName.includes('RBT')) {
            setRoomImgSrc(RBT);
        } else if (roomName.includes('THR')) {
            setRoomImgSrc(Therapy);
        } else if (roomName.includes('GS')) {
            setRoomImgSrc(Gs);
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
                alert("Please Login");
                navigate("/", { replace: true });
                return;
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

        } catch (error) {
            window.location.reload();
            // alert("error" + error);
        }

    };

    const getCBSInformation = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login");
                navigate("/", { replace: true });
                return; 
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
            setCbsProgramType(data[0].cbsProgramType)

        } catch (error) {
            window.location.reload();
            // alert("Error fetching data:" + error);
        }
    };

    const getClientsThatAreWaitingInTheWaitingRoom = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login");
                navigate("/", { replace: true });
                return;
            }
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
            window.location.reload();
        }
    };

    const getAllClientsThatAreInARoom = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login");
                navigate("/", { replace: true });
                return;
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
            window.location.reload();
            // alert("Useffect 2 - Error fetching data:" + error);
        }
    };


    const WhichRoomWillClientGoTo = async (clientID: number, clientFullName: string, clientProgram: string) => {
        setClientID(clientID);
        setClientFullName(clientFullName);
        setClientProgram(clientProgram);
        setShowModel(true);
    };

    const CBSGetClientsWhoAreUnassignedFromAllRoomsAndPutThemInTheirRoom = () => {
        setShowGetClientsAreWaitingToBeAsignToARoomModel(true);
    };

    const PutClientInDeseignatedRoom = async (clientID: number, defaultRoomID: number) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please Login");
                navigate("/", { replace: true });
                return;
            }

            const response = await fetch(`${backEndCodeURLLocation}Cbs/CbsPutClientInTheirRoom?cliendID=${clientID}&roomID=${defaultRoomID}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Failed to fetch data. Response status: ${response.status}`)
                return;
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
                    
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={Person} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
                        <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{cbsFullName}</h4>
                    </div>
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
                        <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "150px" }}>
                            <div className="card-body">
                                <h2>Assigned</h2>
                                <div className="grid-container-For-CBS-page">
                                    {clientsWhoAreCurrentlyInARoom.map((info,) => ( 
                                        <button key={info.clientID} 
                                            onClick={() => WhichRoomWillClientGoTo(info.clientID, info.clientFirstName + " " + info.clientLastName, info.program )} className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", background: 'linear-gradient(to bottom, #a3d977 5%, #b7e184 100%)', color: "black", boxShadow: '-3px -3px 6px 1px rgba(57, 97, 45, 0.5)', border: '1px solid #a3d977'}}>{info.clientFirstName + " " + info.clientLastName.charAt(0)}.
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card-body">
                        <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "150px" }}>
                            <div className="card-body">
                                <h2>Unassigned</h2>
                                <div className="grid-container-For-CBS-page">
                                    {clientsWhoAreSignedIn.map((info,) => (
   
                                        <button onClick={() => PutClientInDeseignatedRoom(info.clientID, info.defaultRoomID)} className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", backgroundColor: "lightpink" }}>{info.clientFirstName + " " + info.clientLastName.charAt(0)}.</button>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {!roomName.includes('THR') && !roomName.includes('GS') && (
                    <div className="card-body">
                        <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "150px" }}>
                            <div className="card-body">
                                <h2>Not In</h2>
                                <div className="grid-container-For-CBS-page">
                                    {childInfo.map((info,) => (
                                        <button className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", background: 'linear-gradient(to bottom, #eaeaea, lightgrey)', color: "black",  boxShadow: '-3px -3px 6px 1px rgba(128, 128, 128, 0.5)', border: '1px solid lightgrey'}} >{info.clientFirstName + " " + info.clientLastName.charAt(0)}.</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    <button className="add-button-class" onClick={() => CBSGetClientsWhoAreUnassignedFromAllRoomsAndPutThemInTheirRoom()}>+ ADD</button>
                    <br />
                </div>
            </div>

            {clientID !== null && roomID !== null && (
                <PopupChooseWhichRoomForClient showModel={showModel} setShowModel={setShowModel} roomInfo={roomInfo} clientID={clientID} clientFullName={clientFullName} clientProgram={clientProgram} previousRoomID={roomID}/>
            )}
            {roomID !== null && locationID !== null && cbsProgramType !== null &&(
                <PopupGetClientsWhoAreWaitingToBeAsignToARoom showGetClientsAreWaitingToBeAsignToARoomModel={showGetClientsAreWaitingToBeAsignToARoomModel} setShowGetClientsAreWaitingToBeAsignToARoomModel={setShowGetClientsAreWaitingToBeAsignToARoomModel} roomID={roomID} locationID={locationID} cbsProgramType={cbsProgramType}/>
            )} 
        </>
    );
};

export default CbsAddOrTransferClientsToRooms;
