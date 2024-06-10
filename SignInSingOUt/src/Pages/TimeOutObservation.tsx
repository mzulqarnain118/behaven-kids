import { useEffect, useState, useRef } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import Person from '../../src/assets/person.png';
import Location from '../../src/assets/location.png';
import "./CSS/TimeOutObservation.css"
import { useLocation, useNavigate } from "react-router-dom";
import Timer from '../../src/assets/timer.png';
import Child from '../../src/assets/child.png'
import PopupTimeOutRoomSession from "../Components/PopupTimeOutRoomSession";
import { backEndCodeURLLocation } from "../config";

const TimeOutObservation: React.FC = () => {
  const location = useLocation();
  const { clientID, clientFullName, roomPositionName, roomID, staffID, staffFullName, clientPreviousRoom } = location.state || {};

  const navigate = useNavigate();

  const [behaviorsColumnOne, setBehaviorsColumnOne] = useState([
    { id: 1, label: 'Mumbling', counter: 0 },
    { id: 2, label: 'Wiggling', counter: 0 },
    { id: 3, label: 'Talking Loud', counter: 0 },
    { id: 4, label: 'Walking Around', counter: 0 },
    { id: 5, label: 'Crying', counter: 0 },
    { id: 6, label: 'Swearing', counter: 0 },
    { id: 7, label: 'Screaming', counter: 0 },
    { id: 8, label: 'Aggression', counter: 0 },
    { id: 9, label: 'Spitting', counter: 0 },
  ]);

  const [behaviorsColumnTwo, setBehaviorsColumnTwo] = useState([
    { id: 1, label: 'Pushing', counter: 0 },
    { id: 2, label: 'Disrobing', counter: 0 },
    { id: 3, label: 'Attempt Escaping', counter: 0 },
    { id: 4, label: 'Running', counter: 0 },
    { id: 5, label: 'Body Functions', counter: 0 },
    { id: 6, label: 'Physical Injury to Child', counter: 0 },
    { id: 7, label: 'Physical Injury to Staff', counter: 0 },
    { id: 8, label: 'Property Damage', counter: 0 },
  ]);

  const [timer, setTimer] = useState('00:00');
  const [didUserClickStart, setDidUserClickStart] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [didUserClickYes, setDidUserClickYes] = useState<boolean>(false);
  const [startTime, setStartTime] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (didUserClickStart) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login");
        return;
      }
    }
    setStartTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          const [minutes, seconds] = prevTimer.split(':').map(Number);
          let updatedSeconds = seconds + 1;
          let updatedMinutes = minutes;

          if (updatedSeconds >= 60) {
            updatedSeconds = 0;
            updatedMinutes++;
          }

          if (updatedMinutes >= 60) {
            updatedMinutes = 0;
          }

          return `${String(updatedMinutes).padStart(2, '0')}:${String(updatedSeconds).padStart(2, '0')}`;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [didUserClickStart]);

  useEffect(() => {
    if (didUserClickYes === true) {
      AddNewClientLevelTwoToFiveTimeout();
    }
  }, [didUserClickYes]);

  const AddNewClientLevelTwoToFiveTimeout = async () => {
    const token = localStorage.getItem("token");

    const behaviorsDTO = {
      Mumbling: (behaviorsColumnOne.find(b => b.label === 'Mumbling') || { counter: 0 }).counter,
      Wiggling: (behaviorsColumnOne.find(b => b.label === 'Wiggling') || { counter: 0 }).counter,
      TalkingLoud: (behaviorsColumnOne.find(b => b.label === 'Talking Loud') || { counter: 0 }).counter,
      WalkingAround: (behaviorsColumnOne.find(b => b.label === 'Walking Around') || { counter: 0 }).counter,
      Crying: (behaviorsColumnOne.find(b => b.label === 'Crying') || { counter: 0 }).counter,
      Swearing: (behaviorsColumnOne.find(b => b.label === 'Swearing') || { counter: 0 }).counter,
      Screaming: (behaviorsColumnOne.find(b => b.label === 'Screaming') || { counter: 0 }).counter,
      Aggression: (behaviorsColumnOne.find(b => b.label === 'Aggression') || { counter: 0 }).counter,
      Spitting: (behaviorsColumnOne.find(b => b.label === 'Spitting') || { counter: 0 }).counter,
      Pushing: (behaviorsColumnTwo.find(b => b.label === 'Pushing') || { counter: 0 }).counter,
      Disrobing: (behaviorsColumnTwo.find(b => b.label === 'Disrobing') || { counter: 0 }).counter,
      AttemptEscaping: (behaviorsColumnTwo.find(b => b.label === 'Attempt Escaping') || { counter: 0 }).counter,
      Running: (behaviorsColumnTwo.find(b => b.label === 'Running') || { counter: 0 }).counter,
      BodyFunctions: (behaviorsColumnTwo.find(b => b.label === 'Body Functions') || { counter: 0 }).counter,
      PhysicalInjuryToChild: (behaviorsColumnTwo.find(b => b.label === 'Physical Injury to Child') || { counter: 0 }).counter,
      PhysicalInjuryToStaff: (behaviorsColumnTwo.find(b => b.label === 'Physical Injury to Staff') || { counter: 0 }).counter,
      PropertyDamage: (behaviorsColumnTwo.find(b => b.label === 'Property Damage') || { counter: 0 }).counter,
    };

    const behaviorAndAggressionDTO = {
      Behaviors: behaviorsDTO,
      ClientID: String(clientID),
      StaffID: String(staffID),
      RoomID: String(roomID),
      TimeoutRoomPosition: String(roomPositionName),
      StartTime: String(startTime),
      ClientPreviousRoom: String(clientPreviousRoom)
    };

    try {
      const response = await fetch(`${backEndCodeURLLocation}Cbs/AddClientLevelTwoToFive`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(behaviorAndAggressionDTO),
        }
      );
      if (!response.ok) {
        console.error(response.statusText);
      }
      navigate("/timeoutselectaclient", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const behaviorButtonClickColumnOne = async (id: number) => {

    try {
      setBehaviorsColumnOne(prevButtons =>
        prevButtons.map(behaviors =>
          behaviors.id === id ? { ...behaviors, counter: behaviors.counter + 1 } : behaviors
        )
      );
    } catch (error) {
      alert('Error Adding Behavior Counter ' + error);
    }
  };

  const behaviorButtonClickColumnTwo = async (id: number) => {

    try {
      setBehaviorsColumnTwo(prevButtons =>
        prevButtons.map(aggression =>
          aggression.id === id ? { ...aggression, counter: aggression.counter + 1 } : aggression
        )
      );
    } catch (error) {
      console.error('Error Adding Aggression Counter', error);
    }
  };

  const CheckToSeeIfTimeoutIsFinished = () => {
    setShowModal(true);
  };


  return (
    <>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
          <h4>&#128198; {new Date().toLocaleDateString()}</h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={Location} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomPositionName}</h4>
          </div>

        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
          <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={Person} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{staffFullName}</h4>
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card" style={{ width: "750px", display: "flex", justifyContent: "center", alignItems: "center", border: "solid gray" }}>
          <div style={{ width: "500px", display: "flex", justifyContent: "space-between", marginTop: "15px", marginBottom: "10px" }}>
            <div style={{ display: "flex" }}>
              <img src={Child} style={{ width: "25px", height: "25px" }} />
              <h4 style={{ marginLeft: "1px" }}>{clientFullName}</h4>
            </div>
            <div style={{ display: "flex" }}>
              <img src={Timer} style={{ width: "25px", height: "25px" }} />
              <h4 style={{ marginLeft: "10px" }}>{timer} (min:sec)</h4>
            </div>
          </div>


          <div className="card" >
            <div className="card-body grid-container-For-behaviors" style={{ height: "100%" }}>
              <div className="card" style={{ border: "none" }}>
                {behaviorsColumnOne.map((button) => (
                  <div key={button.id} className="grid-container-For-behavior-buttons">
                    <button className="counter-buttons" onTouchEnd={() => behaviorButtonClickColumnOne(button.id)}>
                      {button.label}
                    </button>
                    <p style={{
                      border: '2px solid black',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white'
                    }}>
                      {button.counter}
                    </p>
                  </div>
                ))}
              </div>
              <div className="card" style={{ border: "none" }}>
                {behaviorsColumnTwo.map((button) => (
                  <div key={button.id} className="grid-container-For-aggression-buttons">
                    <p style={{
                      border: '2px solid black',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white'
                    }}>
                      {button.counter}
                    </p>
                    <button className="counter-buttons" onTouchEnd={() => behaviorButtonClickColumnTwo(button.id)}>
                      {button.label}
                    </button>

                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <button onClick={CheckToSeeIfTimeoutIsFinished} className="stopButton">Finish</button>
          <br />
        </div>

      </div>
      <PopupTimeOutRoomSession showModal={showModal} setShowModal={setShowModal} setDidUserClickStart={setDidUserClickStart} setDidUserClickYes={setDidUserClickYes} />
    </>
  );
};

export default TimeOutObservation;
