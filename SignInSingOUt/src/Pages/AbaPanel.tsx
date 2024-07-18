import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import "./CSS/EditChildTime.css";
import Horse from '../../src/assets/horse.png';
import Bee from '../../src/assets/bee.png';
import Apple from '../../src/assets/apple.png';
import Bird from '../../src/assets/bird.png';
import Parrot from '../../src/assets/parrot.png';
import Therapy from '../../src/assets/therapy.png'
import "./CSS/SdpAttendanceStatusOverview.css";
import { useNavigate } from "react-router-dom";
import Health from '../../src/assets/health.png';


interface AbaRoomInfo {
  roomID: number
  clientID: number;
  programType: string;
  abaRoomDetail: string;
  clientFirstName: string;
  clientLastName: string;
  whichRoomClientCurrentlyIn: number;
  whichWaitingRoomIsClientIn: number;
  clientPreviousRoomName: string;
  didClientRecievedHealthCheck: number;
}

interface NonSDPRoomsDTO {
  roomID: number
  thrRoomName: string;
  thrRoomDetail: string;
}

interface ClientInfoResponse {
  abaRoomNames: AbaRoomInfo[];
  clientInfo: AbaRoomInfo[];
  // bothProgramClientsWhoAreCurrentlyInABA: SdpRoomInfo[];
  // thrRoomNames: NonSDPRoomsDTO[];
  // gsRoomNames: NonSDPRoomsDTO[];
}

const images: { [key: string]: string } = {
  Horse: Horse,
  Bee: Bee,
  Apple: Apple,
  Bird: Bird,
  Parrot: Parrot,
  Therapy: Therapy,
};

const AbaPanel: React.FC = () => {

  const [allAbaRoomNames, setAllAbaRoomNames] = useState<AbaRoomInfo[]>([]);
  const [allClientsInfo, setAllClientsInfo] = useState<AbaRoomInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    Testing();
  }, [allClientsInfo]);

  const Testing = async () => {
    if (allClientsInfo === null) {
      return;
    }
    const eventSource = new EventSource(`${backEndCodeURLLocation}AbaPanel/RealTimeUpdates?locationID=OHCU`);

    eventSource.onmessage = (event) => {

      const data: ClientInfoResponse = JSON.parse(event.data);

      setAllClientsInfo(data.clientInfo);
      setAllAbaRoomNames(data.abaRoomNames);
      // setClientsInBothProgramsCurrentlyInABA(data.bothProgramClientsWhoAreCurrentlyInABA);

    };


    eventSource.onerror = () => {
      window.location.reload();
    };
    return () => {
      eventSource.close();
    };
  }

  const WhichRoomWillClientGoTo = async (clientID: number, clientFullName: string, clientProgram: string, roomID: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login");
        navigate("/", { replace: true });
        return;
      }

      const response = await fetch(`${backEndCodeURLLocation}Cbs/GetAllRoomsThatAClientCanGoTo?locationID=OHCU&roomID=${roomID}`, {
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
      // setRoomInfo(data);

    } catch (error) {
      console.log("here 2");
      window.location.reload();
    }

    // setClientCurrentRoomID(roomID);
    // setClientID(clientID);
    // setClientFullName(clientFullName);
    // setClientProgram(clientProgram);
    // setShowModel(true);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="card" style={{ width: "66%", marginLeft: "20px" }}>
          <div className="card-body grid-container-For-CBS-Rooms">
            {allAbaRoomNames.map((allRoomName, ) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue" }}>
                  {/* <img src={images[allRoomName.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img> */}
                  <h5 className="card-title">{allRoomName.abaRoomDetail} </h5>
                </div>
                <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "125px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo,) => (
                    <button onClick={() =>
                      WhichRoomWillClientGoTo(clientsInfo.clientID, clientsInfo.clientFirstName + " " + clientsInfo.clientLastName.charAt(0), clientsInfo.programType, allRoomName.roomID)} className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.
                      {clientsInfo.didClientRecievedHealthCheck === 1 && <img src={Health} style={{ width: "30px", marginBottom: "5px", marginLeft: "10px" }}></img>}
                    </button>
                  ))}
                  {/* {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo,) => (
                    <button onClick={() =>
                      WhichRoomWillClientGoTo(clientsInfo.clientID, clientsInfo.clientFirstName + " " + clientsInfo.clientLastName.charAt(0), clientsInfo.programType, allRoomName.roomID)} className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.
                      {clientsInfo.didClientRecievedHealthCheck === 1 && <img src={Health} style={{ width: "30px", marginBottom: "5px", marginLeft: "10px" }}></img>}
                    </button>
                  ))} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </>
  );
};

export default AbaPanel;
