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
import Person from '../../src/assets/person.png';
import RBT from '../../src/assets/rbt.png';
import "./CSS/SdpAttendanceStatusOverview.css";

interface RoomInfo {
  roomID: number
  roomName: string;
}

const EditChildTime: React.FC = () => {

  const [roomImgSrc, setRoomImgSrc] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [allRoomNames, setAllRoomNames] = useState<RoomInfo[]>([]);

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

        const data = await response.json();

        setAllRoomNames(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    } else {
      setRoomImgSrc("");
    }
  }, [roomName]);


  return (
    <>

<div className="card" style={{ width: "60%", marginLeft: "20px" }}>
    <div className="card-body grid-container-For-CBS-Rooms">
        {allRoomNames.map((info, index) => (
            <div key={index} className="card" style={{ padding: "10px" }}>
                <h5 className="card-title">{info.roomName}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        ))}
    </div>
</div>
    </>
  );
};

export default EditChildTime;
