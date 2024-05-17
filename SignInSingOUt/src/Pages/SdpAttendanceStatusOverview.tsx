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
import "./CSS/SdpAttendanceStatusOverview.css";

interface RoomInfo {
  roomID: number
  roomName: string;
  clientFirstName: string;
  clinetLastName: string;
  whichRoomClientCurrentlyIn: number;
  whichWaitingRoomIsClientIn: number;
}

interface ClientInfoResponse {
  roomNames: RoomInfo[];
  clientInfo: RoomInfo[];
}

const images: { [key: string]: string } = {
  Horse: Horse,
  Bee: Bee,
  Apple: Apple,
  Bird: Bird,
  Parrot: Parrot,
};

const EditChildTime: React.FC = () => {

  const [roomImgSrc, setRoomImgSrc] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [allRoomNames, setAllRoomNames] = useState<RoomInfo[]>([]);
  const [allClientsInfo, setAllClientsInfo] = useState<RoomInfo[]>([]);


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
        console.log(data);

        setAllRoomNames(data.roomNames);
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
      <div className="card" style={{ width: "60%", marginLeft: "20px" }}>
        <div className="card-body grid-container-For-CBS-Rooms">
        {allRoomNames.map((allRoomName, index) => (
          <div>
            <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgrey"}}>
              <img src={images[allRoomName.roomName]} style={{width: "22px", height: "22px", marginRight: "10px"}}></img>
              <h5 className="card-title">{allRoomName.roomName}</h5>
            </div>
          <div className="card" style={{ padding: "10px" }}>
            
            {allClientsInfo.filter(clientsInfo => clientsInfo.whichRoomClientCurrentlyIn === allRoomName.roomID && clientsInfo.whichRoomClientCurrentlyIn !== null).map((clientsInfo, index) => (
              <button className="card-text">{clientsInfo.clientFirstName}</button>
            ))}
            {/* <hr/>
            {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn === allRoomName.roomID && clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, index) => (
              <button className="card-text">{clientsInfo.clientFirstName}</button>
            ))} */}
          </div>
          </div>
          
        ))}
        </div>
      </div>
      <div className="card" style={{ width: "60%", marginLeft: "20px" }}>
        <div className="card-body grid-container-For-CBS-Rooms">

          <div>
          <div className="card" style={{ padding: "10px" }}>

            {allClientsInfo.filter(clientsInfo => clientsInfo.whichWaitingRoomIsClientIn !== null).map((clientsInfo, index) => (
              <button className="card-text">{clientsInfo.clientFirstName}</button>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChildTime;
