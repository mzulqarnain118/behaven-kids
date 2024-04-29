// import { useState, useEffect, useRef } from "react";
import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
// import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";
import moment from "moment";
import PopupChooseWhichRoomForClient from "../Components/PopupChooseWhichRoomForClient";


// interface CbsInfo {

//     cbsFirstName: string;
//     cbsLastName: string;
//     roomID: string;
//     children: ChildInfo[];
// }

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

const CbsAddOrTransferClientsToRooms: React.FC = () => {

    const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
    const [clientsWhoAreSignedIn, setClientsWhoAreSignedIn] = useState<ChildInfo[]>([]);
    // const [clientsWhoAreSignedOut, setClientsWhoAreSignedOut] = useState<ChildInfo[]>([]);
    const [showModel, setShowModel] = useState<boolean>(false);


    useEffect(() => {

    }, [childInfo]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found in localStorage");
                }

                const url = `${backEndCodeURLLocation}Cbs/GetClientsWhoAreSignedInAndReadyToBeAssignedToARoom_AndWhoAreAbsent`;

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

                // console.log("response", response);

                const data: ClientInfoResponse = await response.json();

                // const signedInClients: ChildInfo[] = [];
                // const defaultedClients: ChildInfo[] = [];

                // console.log("data = ", data)

                // data.distinctClientSignInOutInfo.forEach((item: ChildInfo) => {
                //     item.signInTime = moment(item.signInTime, "HH:mm").format("hh:mm A");
                //     item.signOutTime = moment(item.signOutTime, "HH:mm").format("hh:mm A");
                //     if (item.signOutTime === "Invalid date") {
                //         signedInClients.push(item);
                //     } else {
                //         console.log("here");
                        
                //     }
                // });

                setClientsWhoAreSignedIn(data.distinctClientSignInOutInfo);

                setChildInfo(data.allClientsWhoAreDefaultedForARoom);

                //   navigate("/", { replace: true });
            } catch (error) {
                alert("Error fetching data:" +  error);
            }
        };

        fetchData();
    }, []);

    const WhichRoomWillClientGoTo = async () => {
        setShowModel(true);
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
                        <div className="card-body">
                            <h2>Parrot</h2>

                        </div>


                    </div>
                    <div className="card-body">
                        <h2>Ins</h2>

                    </div>
                    <div className="card-body">
                        <h2>Needs assigning</h2>
                        {clientsWhoAreSignedIn.map((info, ) => (
                         <div>
                            <br/>
                            <button onClick={WhichRoomWillClientGoTo} className="btn btn-warning" style={{width: "250px"}}>{info.clientFirstName + info.clientLastName}</button>
                        </div>
                      ))}

                    </div>
                    <div className="card-body">
                        <h2>Absent</h2>
                        {childInfo.map((info, ) => (
                         <div>
                            <br/>
                            <button className="btn btn-secondary" style={{width: "250px"}}>{info.clientFirstName + info.clientLastName}</button>
                        </div>
                      ))}

                    </div>
                </div>

            </div>
            <PopupChooseWhichRoomForClient showModel={showModel} setShowModel={setShowModel}/> 
        </>
    );
};

export default CbsAddOrTransferClientsToRooms;
