import { useEffect, useState } from "react";
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

  const [behaviors, setBehaviors] = useState([
    { id: 1, label: 'Swearing', counter: 0 },
    { id: 2, label: 'Disrobing Clothes', counter: 0 },
    { id: 3, label: 'Vomiting', counter: 0 },
    { id: 4, label: 'Spitting', counter: 0 },
    { id: 5, label: 'Crying', counter: 0 },
    { id: 6, label: 'Screaming', counter: 0 },
    { id: 7, label: 'Urinating', counter: 0 },
    { id: 8, label: 'Defecating', counter: 0 },
    { id: 9, label: 'Climbing', counter: 0 },
  ]);

  const [aggression, setAggression] = useState([
    { id: 1, label: 'Hitting', counter: 0 },
    { id: 2, label: 'Kicking', counter: 0 },
    { id: 3, label: 'Biting', counter: 0 },
    { id: 4, label: 'Pinching', counter: 0 },
    { id: 5, label: 'Slapping', counter: 0 },
    { id: 6, label: 'Property Destruction', counter: 0 },
    { id: 7, label: 'Self-harm', counter: 0 },
  ]);

  const [timer, setTimer] = useState('00:00');
  const [didUserClickStart, setDidUserClickStart] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [didUserClickYes, setDidUserClickYes] = useState<boolean>(false);

  useEffect(() => {
    let interval: any; // Declare interval variable outside of useEffect scope
    

    setDidUserClickStart(true);

    if (didUserClickStart) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login");

        return;
      }

      


      // const fetchTimer = () => {
      //   fetch(`http://localhost:5025/PcApc/StartTimer?clientID=${clientID}&initialTime=${timer}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error starting timer:', error);
      //   });

      //   updateTimer();
      // };

      // updateTimer();
      // Call fetchTimer initially
      // fetchTimer();


      // Set interval to fetch timer value every second
      interval = setInterval(updateTimer, 1000);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  });

  const updateTimer = () => {
    let currentTimer = timer;
    const [minutes, seconds] = currentTimer.split(':').map(Number);

    // Increment the seconds
    let updatedSeconds = seconds + 1;
    let updatedMinutes = minutes;

    // Adjust the time if seconds exceeds 59
    if (updatedSeconds >= 60) {
      updatedSeconds = 0;
      updatedMinutes++;
    }
    // Adjust the time if minutes exceeds 59
    if (updatedMinutes >= 60) {
      updatedMinutes = 0;
    }

    // Format the updated time as HH:MM:SS
    const updatedTimer = `${String(updatedMinutes).padStart(2, '0')}:${String(updatedSeconds).padStart(2, '0')}`;

    // Update currentTimer with the updated time
    setTimer(updatedTimer);
    // console.log(timer);
  };

  useEffect(() => {
    if (didUserClickYes === true) {
      AddNewClientLevelTwoToFiveTimeout();
    }

  }, [didUserClickYes]);

  const AddNewClientLevelTwoToFiveTimeout = async () => {
    const token = localStorage.getItem("token");

    const behaviorsDTO = {
      Swearing: (behaviors.find(b => b.label === 'Swearing') || { counter: 0 }).counter,
      DisrobingClothes: (behaviors.find(b => b.label === 'Disrobing Clothes') || { counter: 0 }).counter,
      Vomiting: (behaviors.find(b => b.label === 'Vomiting') || { counter: 0 }).counter,
      Spitting: (behaviors.find(b => b.label === 'Spitting') || { counter: 0 }).counter,
      Crying: (behaviors.find(b => b.label === 'Crying') || { counter: 0 }).counter,
      Screaming: (behaviors.find(b => b.label === 'Screaming') || { counter: 0 }).counter,
      Urinating: (behaviors.find(b => b.label === 'Urinating') || { counter: 0 }).counter,
      Defecating: (behaviors.find(b => b.label === 'Defecating') || { counter: 0 }).counter,
      Climbing: (behaviors.find(b => b.label === 'Climbing') || { counter: 0 }).counter,
    };

    const aggressionDTO = {
      Hitting: (aggression.find(a => a.label === 'Hitting') || { counter: 0 }).counter,
      Kicking: (aggression.find(a => a.label === 'Kicking') || { counter: 0 }).counter,
      Biting: (aggression.find(a => a.label === 'Biting') || { counter: 0 }).counter,
      Pinching: (aggression.find(a => a.label === 'Pinching') || { counter: 0 }).counter,
      Slapping: (aggression.find(a => a.label === 'Slapping') || { counter: 0 }).counter,
      PropertyDestruction: (aggression.find(a => a.label === 'Property Destruction') || { counter: 0 }).counter,
      SelfHarm: (aggression.find(a => a.label === 'Self-harm') || { counter: 0 }).counter,
    };

    const behaviorAndAggressionDTO = {
      Behaviors: behaviorsDTO,
      Aggression: aggressionDTO,
      ClientID: String(clientID),
      StaffID: String(staffID),
      RoomID: String(roomID),
      TimeoutRoomPosition: String(roomPositionName),
      Time: String(timer),
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

  const behaviorButtonClick = async (id: number) => {

    try {
      setBehaviors(prevButtons =>
        prevButtons.map(behaviors =>
          behaviors.id === id ? { ...behaviors, counter: behaviors.counter + 1 } : behaviors
        )
      );
    } catch (error) {
      console.error('Error Adding Behavior Counter', error);
    }
  };

  const aggressionButtonClick = async (id: number) => {

    try {
      setAggression(prevButtons =>
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
                {behaviors.map((button) => (
                  <div key={button.id} className="grid-container-For-behavior-buttons">
                    <button className="counter-buttons" onTouchEnd={() => behaviorButtonClick(button.id)}>
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
                {aggression.map((button) => (
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
                    <button className="counter-buttons" onTouchEnd={() => aggressionButtonClick(button.id)}>
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
