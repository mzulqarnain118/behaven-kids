import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import moment from "moment";
import "./CSS/EditChildTime.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PopupDatePicker from "../Components/PopupDatePicker";
import Horse from '../../src/assets/horse.png';
import Bee from '../../src/assets/bee.png';
import Apple from '../../src/assets/apple.png';
import Bird from '../../src/assets/bird.png';
import Parrot from '../../src/assets/parrot.png';
import RBT from '../../src/assets/rbt.png';
import Therapy from '../../src/assets/therapy.png'
import "./CSS/SdpAttendanceStatusOverview.css";


interface SdpRoomInfo {
  roomID: number
  sdpRoomName: string;
  clientFirstName: string;
  clientLastName: string;
  whichRoomClientCurrentlyIn: number;
  whichWaitingRoomIsClientIn: number;
}

interface ThrRoomInfo {
  roomID: number
  thrRoomName: string;
  thrRoomDetail: string;
}

interface ClientInfoResponse {
  sdpRoomNames: SdpRoomInfo[];
  clientInfo: SdpRoomInfo[];
  bothProgramClientsWhoAreCurrentlyInABA: SdpRoomInfo[];
  thrRoomNames: ThrRoomInfo[];
}

const images: { [key: string]: string } = {
  Horse: Horse,
  Bee: Bee,
  Apple: Apple,
  Bird: Bird,
  Parrot: Parrot,
  Therapy: Therapy,
};

const EditChildTime: React.FC = () => {

  const [roomImgSrc, setRoomImgSrc] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [allSdpRoomNames, setAllSdpRoomNames] = useState<SdpRoomInfo[]>([]);
  const [allThrRoomNames, setAllThrRoomNames] = useState<ThrRoomInfo[]>([]);
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
        setAllThrRoomNames(data.thrRoomNames);
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
    //const eventSource = new EventSource(`http://192.168.0.9:7012/Cbs/RealTimeUpdates?roomID=${roomID}`);

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



  return (
    <>
      {/* <div className="card" style={{ width: "97%", marginLeft: "20px", marginBottom: "20px", minHeight: "150px" }}>
        <div className="card-body grid-container-For-CBS-Rooms">
          
            {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, index) => (
              <button className="card-text">{clientsInfo.clientFirstName} {clientsInfo.clientLastName}</button>
            ))}
          
        </div>
      </div> */}

      <div style={{ display: "flex" }}>
        <div className="card" style={{ width: "60%", marginLeft: "20px" }}>
          <div className="card-body grid-container-For-CBS-Rooms">
            {allSdpRoomNames.map((allRoomName, index) => (
              <div>
                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue" }}>
                  <img src={images[allRoomName.sdpRoomName]} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                  <h5 className="card-title">{allRoomName.sdpRoomName} </h5>
                </div>

                <div className="card grid-container-For-active_clients" style={{ padding: "10px", minHeight: "100px", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo, index) => (
                    <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName}</button>
                  ))}
                  {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, index) => (
                    <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName}</button>
                  ))}
                </div>
              </div>

            ))}
          </div>
        </div>

        <div className="card" style={{ width: "36%", marginLeft: "20px" }}>
          <div className="card-body grid-container-for-other-rooms">
              {allThrRoomNames.map((allRoomName, index) => (
                  <div>
                    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightpink" }}>
                      <img src={Therapy} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                      <h5 className="card-title">{allRoomName.thrRoomName} - {allRoomName.thrRoomDetail}</h5>
                    </div>

                    <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
                      {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo, index) => (
                        <button className="round-button-for-active-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName}</button>
                      ))}
                      {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, index) => (
                        <button className="round-button-for-unassigned-clients">{clientsInfo.clientFirstName} {clientsInfo.clientLastName}</button>
                      ))}
                    </div> 
                  </div>
                ))}
                
                <div>
                    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgreen" }}>
                      <img src={RBT} style={{ width: "22px", height: "22px", marginRight: "10px", marginTop: "3px" }}></img>
                      <h5 className="card-title">ABA</h5>
                    </div>

                    <div className="card grid-container-For-active_clients" style={{ padding: "10px", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
                      {clientsInBothProgramsCurrentlyInABA.filter(clientsInfo2 => clientsInfo2.sdpRoomName === "RBT" && clientsInfo2.whichRoomClientCurrentlyIn !== null).map((clientsInfo2, index) => (
                        <button className="round-button-for-active-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName}</button>
                      ))}
                      {clientsInBothProgramsCurrentlyInABA.filter(clientsInfo2 => clientsInfo2.sdpRoomName === "RBT" && clientsInfo2.whichWaitingRoomIsClientIn !== null).map((clientsInfo2, index) => (
                        <button className="round-button-for-unassigned-clients">{clientsInfo2.clientFirstName} {clientsInfo2.clientLastName}</button>
                      ))}
                    </div> 
                </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default EditChildTime;
