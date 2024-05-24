import { useState, useEffect } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import { backEndCodeURLLocation } from "../config";
import PopupChooseWhichRoomForClient from "../Components/PopupChooseWhichRoomForClient";
import { jwtDecode } from "jwt-decode";
import Person from '../../src/assets/person.png';
import { useNavigate } from "react-router-dom";
import TimeOutLogo from '../../src/assets/timer.png';
import PopupGetClientsWhoAreWaitingToBeAsignToARoom from '../Components/PopupGetClientsWhoAreWaitingToBeAsignToARoom'
// import { BodyComponent } from "reactjs-human-body";
// import HumanBodyDiagram from './HumanBodyDiagram.tsx';


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

const TimeOUtSelectAClient: React.FC = () => {

    const [, setChildInfo] = useState<ChildInfo[]>([]);
    const [clientsWhoAreSignedIn, setClientsWhoAreSignedIn] = useState<ChildInfo[]>([]);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [showGetClientsAreWaitingToBeAsignToARoomModel, setShowGetClientsAreWaitingToBeAsignToARoomModel] = useState<boolean>(false);
    const [roomID, setRoomID] = useState<number | null>(null);;
    const [locationID, setLocationID] = useState<string>("");
    const [clientID, ] = useState<number | null>(null);
    const [roomName, setRoomName] = useState<string>("");
    const [cbsFullName, setCbsFullName] = useState<string>("");
    const [clientFullName, ] = useState<string>("");
    const [, setCurrentTime] = useState(new Date());
    const [clientProgram, ] = useState<string>("");
    const [cbsProgramType, setCbsProgramType] = useState<string>("");
    const [roomInfo, setRoomInfo] = useState<RoomInfoDTO[]>([]);
    const navigate = useNavigate();
    // const handleBodyPartClick = (part: string) => {
    //     // Update state to reflect the clicked body part
    //     alert(part);
    // };

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
    //     Testing();
    // }, [roomID]);

    // const Testing = async () => {
    //     if (roomID === null) {
    //         return;
    //     }
    //     const eventSource = new EventSource(`http://localhost:5025/Cbs/RealTimeUpdates?roomID=${roomID}`);
    //     //const eventSource = new EventSource(`http://192.168.0.9:7012/Cbs/RealTimeUpdates?roomID=${roomID}`);

    //     eventSource.onmessage = (event) => {

    //         const data: ClientInfoResponse = JSON.parse(event.data);

    //         setClientsWhoAreSignedIn(data.distinctClientSignInOutInfo);

    //         setChildInfo(data.allClientsWhoAreDefaultedForARoom);

    //         setClientsWhoAreCurrentlyInARoom(data.clientsWhoAreCurrentlyInARoom);

    //     };


    //     eventSource.onerror = () => {
    //         window.location.reload();
    //     };
    //     return () => {
    //         eventSource.close();
    //     };
    // }

    // const handleBodyPartClick2 = (bodyPart: string) => {
    //     console.log(`Clicked on: ${bodyPart}`);
    //     // Add your logic here
    //   };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login page if token is not present
            return;
        }

        const decoded = jwtDecode(token);
        const userRole = (decoded as any).role;
        if (!userRole.includes("tor")) {
            navigate("/"); // Redirect to login page if user role is not "floor"
            return;
        }
        if (userRole.includes("utoro"))
            setRoomID(29);
        else if (userRole.includes("dtoro"))
            setRoomID(30);

    }, []);

    // useEffect(() => {
    //     getCBSInformation();
    // }, []);

    useEffect(() => {
        if (roomID !== null) {
            getClientsThatAreWaitingInTheWaitingRoom();
        }
    }, [roomID]);

    useEffect(() => {
        if (locationID !== null && roomID !== null) {
            // getRoomInfoWhereClientsCanGoTo();
        }
    }, [locationID]);


    const getClientsThatAreWaitingInTheWaitingRoom = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login");
                navigate("/", { replace: true });
                return;
            }
            console.log("hello");
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

    // const getRoomInfoWhereClientsCanGoTo = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             alert("Please Login");
    //             navigate("/", { replace: true });
    //             return;
    //         }
    //         const response = await fetch(`${backEndCodeURLLocation}Cbs/GetAllRoomsThatAClientCanGoTo?locationID=${locationID}&roomID=${roomID}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         if (!response.ok) {
    //             alert("Error getting room names");
    //             return;
    //         }
    //         const data = await response.json();
    //         setRoomInfo(data);
    //         console.log("getRoomInfoWhereClientsCanGoTo", data);

    //     } catch (error) {
    //         window.location.reload();
    //         // alert("error" + error);
    //     }

    // };



    // const WhichRoomWillClientGoTo = async (clientID: number, clientFullName: string, clientProgram: string) => {
    //     setClientID(clientID);
    //     setClientFullName(clientFullName);
    //     setClientProgram(clientProgram);
    //     setShowModel(true);
    // };

    // const CBSGetClientsWhoAreUnassignedFromAllRoomsAndPutThemInTheirRoom = () => {
    //     setShowGetClientsAreWaitingToBeAsignToARoomModel(true);
    // };

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
                        <img src={TimeOutLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
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
                                <h2>Clients</h2>
                                <div className="grid-container-For-CBS-page">
                                    {clientsWhoAreSignedIn.map((info,) => (
   
                                        <button onClick={() => PutClientInDeseignatedRoom(info.clientID, info.defaultRoomID)} className="round-button-for-class grid-item-container-For-CBS-page" style={{ width: "250px", backgroundColor: "lightpink" }}>{info.clientFirstName + " " + info.clientLastName }</button>

                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <BodyComponent onClick={handleBodyPartClick} bodyModel=""/>  */}
                    </div>
                   
                </div>
            </div>

            {/* {clientID !== null && roomID !== null && (
                <PopupChooseWhichRoomForClient showModel={showModel} setShowModel={setShowModel} roomInfo={roomInfo} clientID={clientID} clientFullName={clientFullName} clientProgram={clientProgram}/>
            )}
            {roomID !== null && locationID !== null && cbsProgramType !== null &&(
                <PopupGetClientsWhoAreWaitingToBeAsignToARoom showGetClientsAreWaitingToBeAsignToARoomModel={showGetClientsAreWaitingToBeAsignToARoomModel} setShowGetClientsAreWaitingToBeAsignToARoomModel={setShowGetClientsAreWaitingToBeAsignToARoomModel} roomID={roomID} locationID={locationID} cbsProgramType={cbsProgramType}/>
            )}  */}
        </>
    );
};

export default TimeOUtSelectAClient;
