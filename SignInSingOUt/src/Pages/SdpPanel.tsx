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


interface SdpRoomInfo {
  roomID: number
  sdpRoomName: string;
  clientFirstName: string;
  clientLastName: string;
  whichRoomClientCurrentlyIn: number;
  whichWaitingRoomIsClientIn: number;
  clientPreviousRoomName: string;
}

interface NonSDPRoomsDTO {
  roomID: number
  thrRoomName: string;
  thrRoomDetail: string;
}

interface ClientInfoResponse {
  sdpRoomNames: SdpRoomInfo[];
  clientInfo: SdpRoomInfo[];
  bothProgramClientsWhoAreCurrentlyInABA: SdpRoomInfo[];
  thrRoomNames: NonSDPRoomsDTO[];
  gsRoomNames: NonSDPRoomsDTO[];
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
  const [clientsInBothProgramsCurrentlyInABA, setClientsInBothProgramsCurrentlyInABA] = useState<SdpRoomInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const url = `${backEndCodeURLLocation}PcApc/GetAllSDPClientsRoomInfo?locationID=OHCU`;

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

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Testing();
  }, [allClientsInfo]);

  const Testing = async () => {
    if (allClientsInfo === null) {
      return;
    }
    const eventSource = new EventSource(`http://localhost:5025/PcApc/RealTimeUpdates?locationID=OHCU`);
    //const eventSource = new EventSource(`http://192.168.0.9:7012/PcApc/RealTimeUpdates?locationID=OHCU`);

    eventSource.onmessage = (event) => {

      const data: ClientInfoResponse = JSON.parse(event.data);

      setAllClientsInfo(data.clientInfo);
      setClientsInBothProgramsCurrentlyInABA(data.bothProgramClientsWhoAreCurrentlyInABA);

    };


    eventSource.onerror = () => {
      window.location.reload();
    };
    return () => {
      eventSource.close();
    };
  }

 
  // useEffect(() => {
  //   // Load timers from local storage if available
  //   const storedTimers = localStorage.getItem("timers");
  //   if (storedTimers) {
  //     setTimers(JSON.parse(storedTimers));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save timers to local storage whenever they change
  //   localStorage.setItem("timers", JSON.stringify(timers));
  // }, [timers]);

  // const startTimer = (clientId: string) => {
  //   const intervalId = setInterval(() => {
  //     setTimers((prevTimers) => ({
  //       ...prevTimers,
  //       [clientId]: (prevTimers[clientId] || 0) + 1,
  //     }));
  //   }, 1000);
  //   return intervalId;
  // };

  // const stopTimer = (intervalId: NodeJS.Timeout) => {
  //   clearInterval(intervalId);
  // };

  // useEffect(() => {
  //   // Start or stop timers based on client data
  //   const intervalIds: { [key: string]: NodeJS.Timeout } = {};
  //   allClientsInfo.forEach((client) => {
  //     const clientId = `${client.clientFirstName}-${client.clientLastName}-${client.clientPreviousRoomName}`;
  //     if (client.whichRoomClientCurrentlyIn === 30) {
  //       intervalIds[clientId] = startTimer(clientId);
  //     } else {
  //       const intervalId = intervalIds[clientId];
  //       if (intervalId) {
  //         stopTimer(intervalId);
  //         delete intervalIds[clientId];
  //       }
  //     }
  //   });

  //   // Cleanup intervals on unmount
  //   return () => {
  //     Object.values(intervalIds).forEach(stopTimer);
  //   };
  // }, [allClientsInfo]);

  // const formatTime = (time: number) => {
  //   const hours = Math.floor(time / 3600);
  //   const minutes = Math.floor((time % 3600) / 60);
  //   const seconds = time % 60;
  //   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  // };



  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="card" style={{ width: "66%", marginLeft: "20px" }}>
          <div className="card-body grid-container-For-CBS-Rooms">
            {allSdpRoomNames.map((allRoomName, ) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue" }}>
                  <img src={images[allRoomName.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                  <h5 className="card-title">{allRoomName.sdpRoomName} </h5>
                </div>

                <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "125px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo, ) => (
                    <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, ) => (
                    <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ width: "30%", marginLeft: "20px", display: "flex", flexDirection: "row" }}>
          <div className="card-body grid-container-for-other-rooms" style={{ width: "50%" }}>
            {thrRoomNames.map((allRoomName, ) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightpink" }}>
                  <img src={Therapy} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                  <h5 className="card-title">{allRoomName.thrRoomName} - {allRoomName.thrRoomDetail}</h5>
                </div>

                <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0", minHeight: "100px" }}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo, ) => (
                    <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, ) => (
                    <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="card-body grid-container-for-other-rooms" style={{ width: "50%" }}>
              {gsRoomNames.map((allRoomName, ) => (
                <div>
                  <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#FFDEAD" }}>
                    <img src={Gs} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                    <h5 className="card-title">{allRoomName.thrRoomName} - {allRoomName.thrRoomDetail}</h5>
                  </div>

                  <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0", minHeight: "100px" }}>
                    {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo, ) => (
                      <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName.charAt(0)}.</button>
                    ))}
                    {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, ) => (
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
                <h5 className="card-title">Time Out Upstairs </h5>
              </div>

              {/* {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === 30).map((client) => {
                const clientId = `${client.clientFirstName}-${client.clientLastName}-${client.clientPreviousRoom}`;
                const clientTimer = timers[clientId] || 0;
                return (
                  <button key={`active-${clientId}`} className="round-button-for-active-clients">
                    {client.clientFirstName} {client.clientLastName.charAt(0)}. {client.clientPreviousRoom} {formatTime(clientTimer)}
                  </button>
                );
              })} */}

              <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "200px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
                {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === 29).map((client, index) => (
                  <button key={`assigned-${index}`} className="round-button-for-active-clients">
                    {client.clientFirstName} {client.clientLastName.charAt(0)}. <img src={images[client.clientPreviousRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {client.clientPreviousRoomName}
                  </button>
                ))}
                {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === 29).map((clientInfo, index) => (
                  <button key={`unassigned-${index}`} className="round-button-for-unassigned-clients">
                    {clientInfo.clientFirstName} {clientInfo.clientLastName.charAt(0)}. <img src={images[clientInfo.clientPreviousRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {clientInfo.clientPreviousRoomName}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#ce4343" }}>
                <img src={Timeout} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                <h5 className="card-title">Time Out Downstairs </h5>
              </div>

              <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "200px", borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
              {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === 30).map((client, index) => (
                  <button key={`assigned-${index}`} className="round-button-for-active-clients">
                    {client.clientFirstName} {client.clientLastName.charAt(0)}. <img src={images[client.clientPreviousRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {client.clientPreviousRoomName}
                  </button>
                ))}
                {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === 30).map((clientInfo, index) => (
                  <button key={`unassigned-${index}`} className="round-button-for-unassigned-clients">
                    {clientInfo.clientFirstName} {clientInfo.clientLastName.charAt(0)}. <img src={images[clientInfo.clientPreviousRoomName]} style={{ width: "22px", height: "22px", marginRight: "5px", marginLeft: "10px", marginBottom: "3px" }}></img> {clientInfo.clientPreviousRoomName}
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
                {clientsInBothProgramsCurrentlyInABA.filter(clientsInfo2 => clientsInfo2.sdpRoomName === "RBT" && clientsInfo2.whichRoomClientCurrentlyIn !== null).map((clientsInfo2, ) => (
                  <button className="round-button-for-active-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
                ))}
                {clientsInBothProgramsCurrentlyInABA.filter(clientsInfo2 => clientsInfo2.sdpRoomName === "RBT" && clientsInfo2.whichWaitingRoomIsClientIn !== null).map((clientsInfo2, ) => (
                  <button className="round-button-for-unassigned-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName.charAt(0)}.</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default SdpPanel;
