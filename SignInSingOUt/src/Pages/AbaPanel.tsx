import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import "./CSS/EditChildTime.css";
import "./CSS/SdpAttendanceStatusOverview.css";
import { useNavigate } from "react-router-dom";
import Health from '../../src/assets/health.png';
import PopupPcApcChooseWhichRoomForClient from "../Components/PopupPcApcChooseWhichRoomForClient";
import { jwtDecode } from "jwt-decode";
import SDP from '../../src/assets/rbt.png';


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

interface ClientInfoResponse {
  abaRoomNames: AbaRoomInfo[];
  abaClientInfo: AbaRoomInfo[];
  bothProgramClientsWhoAreCurrentlyInSdp: AbaRoomInfo[];
  bothProgramClientsWhoAreCurrentlyNotInTheClinic: AbaRoomInfo[];
}

interface RoomInfoDTO {
  roomID: number;
  roomName: string;
  staffFirstName: string;
  staffLastName: string;
}

interface DecodedToken {
  StaffID: string;
  LocationID: string;
}

const AbaPanel: React.FC = () => {

  const [allAbaRoomNames, setAllAbaRoomNames] = useState<AbaRoomInfo[]>([]);
  const [allClientsInfo, setAllClientsInfo] = useState<AbaRoomInfo[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<RoomInfoDTO[]>([]);
  const [clientCurrentRoomID, setClientCurrentRoomID] = useState<number>();
  const [clientID, setClientID] = useState<number | null>(null);
  const [clientFullName, setClientFullName] = useState<string>("");
  const [clientProgram, setClientProgram] = useState<string>("");
  const [startAutomaticUpdates, setStartAutomaticUpdates] = useState<boolean>(false);
  const [locationID, setLocationID] = useState<string>("");
  const [clientsInBothProgramsCurrentlyInSdp, setClientsInBothProgramsCurrentlyInSdp] = useState<AbaRoomInfo[]>([]);
  const [clientsInBothProgramsCurrentlyNotInTheClinic, setClientsInBothProgramsCurrentlyNotInTheClinic] = useState<AbaRoomInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (startAutomaticUpdates === false) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
          }

          if (!token) {
            alert("Please Login");
            navigate("/", { replace: true });
            return;
          }
          const decoded = jwtDecode(token) as DecodedToken;
          const getLocationID = decoded.LocationID;
          setLocationID(getLocationID);


          const url = `${backEndCodeURLLocation}AbaPanel/GetAllAbaClientsRoomInfo?locationID=${getLocationID}`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Failed to fetch data. Response status: ${response.status}`
            );
          }

          const data: ClientInfoResponse = await response.json();

          setAllClientsInfo(data.abaClientInfo);
          setAllAbaRoomNames(data.abaRoomNames);
          setClientsInBothProgramsCurrentlyInSdp(data.bothProgramClientsWhoAreCurrentlyInSdp);
          setClientsInBothProgramsCurrentlyNotInTheClinic(data.bothProgramClientsWhoAreCurrentlyNotInTheClinic);
          setStartAutomaticUpdates(true);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

  }, []);

  useEffect(() => {
    realTimeUpdatesForAbaPanel();
  }, [startAutomaticUpdates]);

  const realTimeUpdatesForAbaPanel = async () => {
    if (allClientsInfo.length === 0) {
      return;
    }
    const eventSource = new EventSource(`${backEndCodeURLLocation}AbaPanel/RealTimeUpdates?locationID=OHCU`);

    eventSource.onmessage = (event) => {

      const data: ClientInfoResponse = JSON.parse(event.data);

      setAllClientsInfo(data.abaClientInfo);
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

      const response = await fetch(`${backEndCodeURLLocation}AbaPanel/GetAllRoomsThatAClientCanGoTo?locationID=${locationID}&roomID=${roomID}`, {
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
    }

    setClientCurrentRoomID(roomID);
    setClientID(clientID);
    setClientFullName(clientFullName);
    setClientProgram(clientProgram);
    setShowModel(true);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="card" style={{ width: "66%", marginLeft: "20px" }}>
          <div className="card-body grid_container_for_ABA_rooms">
            {allAbaRoomNames.filter(allRoomName => allRoomName.abaRoomDetail !== "RBT Default Room").map((allRoomName,) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue" }}>
                  {/* <img src={images[allRoomName.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img> */}
                  <h5 className="card-title">{allRoomName.abaRoomDetail} </h5>
                </div>
                <div className="card grid_Container_For_Active_Clients_In_Aba" style={{ padding: "10px", minHeight: "125px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo,) => (
                    <button onClick={() =>
                      WhichRoomWillClientGoTo(clientsInfo.clientID, clientsInfo.clientFirstName + " " + clientsInfo.clientLastName.charAt(0), clientsInfo.programType, allRoomName.roomID)} className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.
                      {clientsInfo.didClientRecievedHealthCheck === 1 && <img src={Health} style={{ width: "30px", marginBottom: "5px", marginLeft: "10px" }}></img>}
                    </button>
                  ))}
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo,) => (
                    <button onClick={() =>
                      WhichRoomWillClientGoTo(clientsInfo.clientID, clientsInfo.clientFirstName + " " + clientsInfo.clientLastName.charAt(0), clientsInfo.programType, allRoomName.roomID)} className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.
                      {clientsInfo.didClientRecievedHealthCheck === 1 && <img src={Health} style={{ width: "30px", marginBottom: "5px", marginLeft: "10px" }}></img>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ width: "30%", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
          <div className="card-body" >

            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightpink" }}>
                {/* <img src={Therapy} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img> */}
                <h5 className="card-title">ABA Default Room</h5>
              </div>
              {allAbaRoomNames.filter(allRoomName => allRoomName.abaRoomDetail === "RBT Default Room").map(() => (
                <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0", minHeight: "100px" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === 34 && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo,) => (
                    <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="card-body ">
            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgreen" }}>
                <img src={SDP} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                <h5 className="card-title">SDP</h5>
              </div>
              <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                {clientsInBothProgramsCurrentlyInSdp.filter(clientsInfo2 => clientsInfo2.whichRoomClientCurrentlyIn !== null).map((clientsInfo2,) => (
                  <button className="round-button-for-active-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
                ))}
                {clientsInBothProgramsCurrentlyInSdp.filter(clientsInfo2 => clientsInfo2.whichWaitingRoomIsClientIn !== null).map((clientsInfo2,) => (
                  <button className="round-button-for-unassigned-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
                ))}
              </div>
            </div>
          </div>
          <div className="card-body ">
            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgrey" }}>
                <img src={SDP} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                <h5 className="card-title">Not In</h5>
              </div>
              <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                {clientsInBothProgramsCurrentlyNotInTheClinic.map((clientsInfo2,) => (
                  <button className="round-button-for-active-clients" style={{ background: 'linear-gradient(to bottom, #eaeaea, lightgrey)', color: "black",  boxShadow: '-3px -3px 6px 1px rgba(128, 128, 128, 0.5)', border: '1px solid lightgrey'}} >{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {clientID !== null && (
        <PopupPcApcChooseWhichRoomForClient showModel={showModel} setShowModel={setShowModel} roomInfo={roomInfo} clientID={clientID} clientFullName={clientFullName} clientProgram={clientProgram} previousRoomID={clientCurrentRoomID} />
      )}

    </>
  );
};

export default AbaPanel;
