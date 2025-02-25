import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import "./CSS/EditChildTime.css";
import Horse from '../../src/assets/horse.png';
import Bee from '../../src/assets/bee.png';
import Apple from '../../src/assets/apple.png';
import Bird from '../../src/assets/bird.png';
import Parrot from '../../src/assets/parrot.png';
import RBT from '../../src/assets/rbt.png';
import Therapy from '../../src/assets/therapy.png'
import Timeout from '../../src/assets/timeout.png'
import Gs from '../../src/assets/gs.png'
import "./CSS/SdpAttendanceStatusOverview.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PopupPcApcChooseWhichRoomForClient from "../Components/PopupPcApcChooseWhichRoomForClient";
import Health from '../../src/assets/health.png';

interface SdpRoomInfo {
  roomID: number;
  clientID: number;
  programType: string;
  sdpRoomName: string;
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
  sdpRoomNames: SdpRoomInfo[];
  clientInfo: SdpRoomInfo[];
  clientsInTimeOutRoomInfo: SdpRoomInfo[];
  bothProgramClientsWhoAreCurrentlyInABA: SdpRoomInfo[];
  thrRoomNames: NonSDPRoomsDTO[];
  gsRoomNames: NonSDPRoomsDTO[];
}

interface DecodedToken {
  StaffID: string;
  LocationID: string;
}

interface RoomInfoDTO {
  roomID: number;
  roomName: string;
  staffFirstName: string;
  staffLastName: string;
}

const images: { [key: string]: string } = {
  Horse: Horse,
  Bee: Bee,
  Apple: Apple,
  Bird: Bird,
  Parrot: Parrot,
  Therapy: Therapy,
};

const SdpPanel: React.FC = () => {

  const [allSdpRoomNames, setAllSdpRoomNames] = useState<SdpRoomInfo[]>([]);
  const [thrRoomNames, setThrRoomNames] = useState<NonSDPRoomsDTO[]>([]);
  const [gsRoomNames, setGsRoomNames] = useState<NonSDPRoomsDTO[]>([]);
  const [allClientsInfo, setAllClientsInfo] = useState<SdpRoomInfo[]>([]);
  const [clientsInTimeOutRoomInfo, setClientsInTimeOutRoomInfo] = useState<SdpRoomInfo[]>([]);
  const [clientsInBothProgramsCurrentlyInABA, setClientsInBothProgramsCurrentlyInABA] = useState<SdpRoomInfo[]>([]);
  const [locationID, setLocationID] = useState<string>("");
  const [timeOutRoomIDOne, setTimeOutRoomIDOne] = useState<number>();
  const [timeOutRoomIDTwo, setTimeOutRoomIDTwo] = useState<number>();
  const [timeOutRoomNameOne, setTimeOutRoomNameOne] = useState<string>();
  const [timeOutRoomNameTwo, setTimeOutRoomNameTwo] = useState<string>();
  const [clientID, setClientID] = useState<number | null>(null);
  const [clientFullName, setClientFullName] = useState<string>("");
  // const [staffFullName, setStaffFullName] = useState<string>("");
  const [clientProgram, setClientProgram] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<RoomInfoDTO[]>([]);
  const [startAutomaticUpdates, setStartAutomaticUpdates] = useState<boolean>(false);
  const [clientCurrentRoomID, setClientCurrentRoomID] = useState<number>();

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
          
          if (getLocationID === "LIHG")
          {
            setTimeOutRoomIDOne(32);
            setTimeOutRoomNameOne("Time Out North");
            setTimeOutRoomIDTwo(33);
            setTimeOutRoomNameTwo("Time Out South");
          }
          else if (getLocationID === "OHCU")
          {
            setTimeOutRoomIDOne(29);
            setTimeOutRoomNameOne("Time Out Upstairs");
            setTimeOutRoomIDTwo(30);
            setTimeOutRoomNameTwo("Time Out Downstairs");
          }

          const url = `${backEndCodeURLLocation}PcApc/GetAllSDPClientsRoomInfo?locationID=${getLocationID}`;

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
          console.log(data.bothProgramClientsWhoAreCurrentlyInABA);

          setAllSdpRoomNames(data.sdpRoomNames);
          setThrRoomNames(data.thrRoomNames);
          setGsRoomNames(data.gsRoomNames);
          setClientsInBothProgramsCurrentlyInABA(data.bothProgramClientsWhoAreCurrentlyInABA);
          setAllClientsInfo(data.clientInfo);
          setClientsInTimeOutRoomInfo(data.clientsInTimeOutRoomInfo);
          setStartAutomaticUpdates(true);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

  }, []);

  useEffect(() => {
    realTimeUpdatesForSdpPanel();
  }, [startAutomaticUpdates]);

  const realTimeUpdatesForSdpPanel = async () => {
    if (allClientsInfo === null) {
      return;
    }

    if (locationID !== null) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const decoded = jwtDecode(token) as DecodedToken;
      const getLocationID = decoded.LocationID;

      const eventSource = new EventSource(`${backEndCodeURLLocation}PcApc/RealTimeUpdates?locationID=${getLocationID}`);
      eventSource.onmessage = (event) => {

        const data: ClientInfoResponse = JSON.parse(event.data);
        setAllClientsInfo(data.clientInfo);
        setClientsInBothProgramsCurrentlyInABA(data.bothProgramClientsWhoAreCurrentlyInABA);
        setClientsInTimeOutRoomInfo(data.clientsInTimeOutRoomInfo);

      };


      eventSource.onerror = () => {
        window.location.reload();
      };

      return () => {
        eventSource.close();
      };
    }

  }


  const WhichRoomWillClientGoTo = async (clientID: number, clientFullName: string, clientProgram: string, roomID: number) => {
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
      console.log("here 2");
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
          <div className="card-body grid-container-For-CBS-Rooms">
            {allSdpRoomNames.map((allRoomName,) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue" }}>
                  <img src={images[allRoomName.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                  <h5 className="card-title">{allRoomName.sdpRoomName} </h5>
                </div>

                <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "125px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
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

        <div className="card" style={{ width: "30%", marginLeft: "20px", display: "flex", flexDirection: "row" }}>
          <div className="card-body grid-container-for-other-rooms" style={{ width: "50%" }}>
            {thrRoomNames.map((allRoomName,) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightpink" }}>
                  <img src={Therapy} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                  <h5 className="card-title">{allRoomName.thrRoomName} - {allRoomName.thrRoomDetail}</h5>
                </div>

                <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0", minHeight: "100px" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo,) => (
                    <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo,) => (
                    <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="card-body grid-container-for-other-rooms" style={{ width: "50%" }}>
            {gsRoomNames.map((allRoomName,) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#FFDEAD" }}>
                  <img src={Gs} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                  <h5 className="card-title">{allRoomName.thrRoomName} - {allRoomName.thrRoomDetail}</h5>
                </div>

                <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0", minHeight: "100px" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo,) => (
                    <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo,) => (
                    <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div className="card" style={{ width: "66%", marginLeft: "20px" }}>
          <div className="card-body grid-container-for-timeout-rooms">
            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#ce4343" }}>
                <img src={Timeout} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                <h5 className="card-title">{timeOutRoomNameOne} </h5>
              </div>
              <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "200px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                {clientsInTimeOutRoomInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === timeOutRoomIDOne).map((client, index) => (
                  <button key={`assigned-${index}`} className="round-button-for-active-clients">
                    {client.clientFirstName} {client.clientLastName.charAt(0)}. <img src={images[client.clientPreviousRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {client.clientPreviousRoomName}
                  </button>
                ))}
                {clientsInTimeOutRoomInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === timeOutRoomIDOne).map((clientInfo, index) => (
                  <button key={`unassigned-${index}`} onClick={() => WhichRoomWillClientGoTo(clientInfo.clientID, clientInfo.clientFirstName + " " + clientInfo.clientLastName, clientInfo.programType, 29)} className="round-button-for-unassigned-clients">
                    {clientInfo.clientFirstName} {clientInfo.clientLastName.charAt(0)}. <img src={images[clientInfo.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {clientInfo.sdpRoomName}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#ce4343" }}>
                <img src={Timeout} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                <h5 className="card-title">{timeOutRoomNameTwo} </h5>
              </div>

              <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "200px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                {clientsInTimeOutRoomInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === timeOutRoomIDTwo).map((client, index) => (
                  <button key={`assigned-${index}`} className="round-button-for-active-clients">
                    {client.clientFirstName} {client.clientLastName.charAt(0)}. <img src={images[client.clientPreviousRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {client.clientPreviousRoomName}
                  </button>
                ))}
                {clientsInTimeOutRoomInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === timeOutRoomIDTwo).map((clientInfo, index) => (
                  <button key={`unassigned-${index}`} onClick={() => WhichRoomWillClientGoTo(clientInfo.clientID, clientInfo.clientFirstName + " " + clientInfo.clientLastName, clientInfo.programType, 30)} className="round-button-for-unassigned-clients">
                    {clientInfo.clientFirstName} {clientInfo.clientLastName.charAt(0)}. <img src={images[clientInfo.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {clientInfo.sdpRoomName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ width: "30%", marginLeft: "20px" }}>
          <div className="card-body ">
            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgreen" }}>
                <img src={RBT} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                <h5 className="card-title">ABA</h5>
              </div>

              <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                {clientsInBothProgramsCurrentlyInABA.filter(clientsInfo2 => clientsInfo2.sdpRoomName === "RBT" && clientsInfo2.whichRoomClientCurrentlyIn !== null).map((clientsInfo2,) => (
                  <button className="round-button-for-active-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
                ))}
                {clientsInBothProgramsCurrentlyInABA.filter(clientsInfo2 => clientsInfo2.sdpRoomName === "RBT" && clientsInfo2.whichWaitingRoomIsClientIn !== null).map((clientsInfo2,) => (
                  <button className="round-button-for-unassigned-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
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

export default SdpPanel;
