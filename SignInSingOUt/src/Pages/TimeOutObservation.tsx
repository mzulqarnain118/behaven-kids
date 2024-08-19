// import { useEffect, useState, useRef } from "react";
// import "./CSS/CbsAddOrTransferClientsToRooms.css";
// import Person from '../../src/assets/person.png';
// import Location from '../../src/assets/location.png';
// import "./CSS/TimeOutObservation.css"
// import { useLocation, useNavigate } from "react-router-dom";
// import Timer from '../../src/assets/timer.png';
// import Child from '../../src/assets/child.png'
// import PopupTimeOutRoomSession from "../Components/PopupTimeOutRoomSession";
// import { backEndCodeURLLocation } from "../config";


const TimeOutObservation: React.FC = () => {
  // const location = useLocation();
  // const { clientID, clientFullName, roomPositionName, roomID, staffID, staffFullName, clientPreviousRoom } = location.state || {};

  // const navigate = useNavigate();

  // const [levelTwo, setLevelTwo] = useState([
  //   { id: 1, label: 'Mumbling', counter: 0 },
  //   { id: 2, label: 'Wiggling', counter: 0 },
  // ]);

  // const [levelThree, setLevelThree] = useState([
  //   { id: 1, label: 'Talking Loud', counter: 0 },
  //   { id: 2, label: 'Moving Around', counter: 0 },
  //   { id: 3, label: 'Crying', counter: 0 },
  //   { id: 4, label: 'Swearing', counter: 0 },
  // ]);

  // const [levelFourColumnOne, setLevelFourColumnOne] = useState([
  //   { id: 1, label: 'Screaming', counter: 0 },
  //   { id: 2, label: 'Aggression', counter: 0 },
  //   { id: 3, label: 'Spitting', counter: 0 },
  // ]);

  // const [levelFourColumnTwo, setLevelFourColumnTwo] = useState([
  //   { id: 1, label: 'Disrobing', counter: 0 },
  //   { id: 2, label: 'Attempt Escaping', counter: 0 },
  //   { id: 3, label: 'Running', counter: 0 },
  //   { id: 4, label: 'Body Functions', counter: 0 },
  //   { id: 5, label: 'Self Harm', counter: 0 },
  //   { id: 6, label: 'Biting', counter: 0 },
  // ]);

  // const [levelFive, setLevelFive] = useState([
  //   { id: 1, label: 'Injury to Child', counter: 0 },
  //   { id: 2, label: 'Injury to Staff', counter: 0 },
  //   { id: 3, label: 'Property Damage', counter: 0 },
    
  // ]);

  // const [timer, setTimer] = useState('00:00');
  // const [didUserClickStart, ] = useState<Boolean>(false);
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [didUserClickYes, setDidUserClickYes] = useState<boolean>(false);
  // const [startTime, setStartTime] = useState("");
  // const [description, setDescription] = useState<string>();

  // const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (didUserClickStart) {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("Please Login");
  //       return;
  //     }
  //   }
  //   setStartTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  //   if (!intervalRef.current) {
  //     intervalRef.current = setInterval(() => {
  //       setTimer(prevTimer => {
  //         const [minutes, seconds] = prevTimer.split(':').map(Number);
  //         let updatedSeconds = seconds + 1;
  //         let updatedMinutes = minutes;

  //         if (updatedSeconds >= 60) {
  //           updatedSeconds = 0;
  //           updatedMinutes++;
  //         }

  //         if (updatedMinutes >= 60) {
  //           updatedMinutes = 0;
  //         }

  //         return `${String(updatedMinutes).padStart(2, '0')}:${String(updatedSeconds).padStart(2, '0')}`;
  //       });
  //     }, 1000);
  //   }

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, [didUserClickStart]);

  // useEffect(() => {
  //   if (didUserClickYes === true) { 
  //     AddNewClientLevelTwoToFiveTimeout();
  //   }
  // }, [didUserClickYes]);

  // const AddNewClientLevelTwoToFiveTimeout = async () => {
  //   const token = localStorage.getItem("token");

  //   const behaviorsDTO = {
  //     Mumbling: (levelTwo.find(b => b.label === 'Mumbling') || { counter: 0 }).counter,
  //     Wiggling: (levelTwo.find(b => b.label === 'Wiggling') || { counter: 0 }).counter,
  //     TalkingLoud: (levelThree.find(b => b.label === 'Talking Loud') || { counter: 0 }).counter,
  //     WalkingAround: (levelThree.find(b => b.label === 'Moving Around') || { counter: 0 }).counter,
  //     Crying: (levelThree.find(b => b.label === 'Crying') || { counter: 0 }).counter,
  //     Swearing: (levelThree.find(b => b.label === 'Swearing') || { counter: 0 }).counter,
  //     Screaming: (levelFourColumnOne.find(b => b.label === 'Screaming') || { counter: 0 }).counter,
  //     Aggression: (levelFourColumnOne.find(b => b.label === 'Aggression') || { counter: 0 }).counter,
  //     Spitting: (levelFourColumnOne.find(b => b.label === 'Spitting') || { counter: 0 }).counter,
  //     Disrobing: (levelFourColumnTwo.find(b => b.label === 'Disrobing') || { counter: 0 }).counter,
  //     AttemptEscaping: (levelFourColumnTwo.find(b => b.label === 'Attempt Escaping') || { counter: 0 }).counter,
  //     Running: (levelFourColumnTwo.find(b => b.label === 'Running') || { counter: 0 }).counter,
  //     BodyFunctions: (levelFourColumnTwo.find(b => b.label === 'Body Functions') || { counter: 0 }).counter,
  //     SelfHarm: (levelFourColumnTwo.find(b => b.label === 'Self Harm') || { counter: 0 }).counter,
  //     Biting: (levelFourColumnTwo.find(b => b.label === 'Biting') || { counter: 0 }).counter,
  //     InjuryToChild: (levelFive.find(b => b.label === 'Injury to Child') || { counter: 0 }).counter,
  //     InjuryToStaff: (levelFive.find(b => b.label === 'Injury to Staff') || { counter: 0 }).counter,
  //     PropertyDamage: (levelFive.find(b => b.label === 'Property Damage') || { counter: 0 }).counter,
  //   };

  //   const behaviorAndAggressionDTO = {
  //     Behaviors: behaviorsDTO,
  //     ClientID: String(clientID),
  //     StaffID: String(staffID),
  //     RoomID: String(roomID),
  //     TimeoutRoomPosition: String(roomPositionName),
  //     StartTime: String(startTime),
  //     ClientPreviousRoom: String(clientPreviousRoom),
  //     Description: description
  //   };

  //   try {
  //     const response = await fetch(`${backEndCodeURLLocation}Cbs/AddClientLevelTwoToFive`,
  //     {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(behaviorAndAggressionDTO),
  //     });

  //     if (!response.ok) {
  //       console.error(response.statusText);
  //     }

  //     navigate("/timeoutselectaclient", {
  //       replace: true,
  //     });
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const CheckToSeeIfTimeoutIsFinished = () => {
  //   setShowModal(true);
  // };


  return (
    <>
{/* 
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
            <div className="card-body grid-container-For-behaviors" >
              <div className="card" style={{ border: "none" }}>
              {levelTwo.map((button) => (
                  <div key={button.id} className="grid-container-For-behavior-buttons">
                    <button className="level_2_counter_button" onTouchEnd={() => behaviorButtonClickColumnOne(button.id)}>
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
                {levelThree.map((button)  => (
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
                {levelFourColumnTwo.map((button) => (
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
            <textarea placeholder="Description" id="w3review" name="w3review" style={{height: "200px", fontSize: "20px", paddingLeft: "10px", paddingTop: "5px", marginLeft: "40px", marginRight: "40px", marginBottom: "10px", marginTop: "10px" }} onChange={(event) => setDescription(event.target.value)}></textarea>
          </div>
          <br />
          <button onClick={CheckToSeeIfTimeoutIsFinished} className="stopButton">Finish</button>
          <br />
        </div>

      </div>
      <PopupTimeOutRoomSession showModal={showModal} setShowModal={setShowModal} setDidUserClickYes={setDidUserClickYes} /> */}
    </>
  );
};

export default TimeOutObservation;
