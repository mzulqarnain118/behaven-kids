import { useEffect, useState } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import Person from '../../src/assets/person.png';
import Location from '../../src/assets/location.png';
import "./CSS/TimeOutObservation.css"
import { useNavigate, useLocation } from "react-router-dom";
import Timer from '../../src/assets/timer.png';
import Child from '../../src/assets/child.png'
import PopupTimeOutRoomSession from "../Components/PopupTimeOutRoomSession";

const TimeOutObservation: React.FC = () => {
  const location = useLocation();
  const { clientID, clientFullName, roomPositionName, staffID, staffFullName } = location.state || {};
  // console.log("Client ID: ", clientID);
  // console.log("staffID: ", staffID);
  // console.log("Client Full Name: ", clientFullName);
  // console.log("roomPositionName: ", roomPositionName);
  // console.log("staffFullName: ", staffFullName);

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

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: any; // Declare interval variable outside of useEffect scope
    let currentTimer = timer;

    if (didUserClickStart) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login");

        return;
      }

      const updateTimer = () => {
        // Split the current timer value into hours, minutes, and seconds
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
        console.log(timer);
      };


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
  }, [didUserClickStart, clientID, timer]);

  const behaviorButtonClick = async (id: number) => {
    setBehaviors(prevButtons =>
      prevButtons.map(behaviors =>
        behaviors.id === id ? { ...behaviors, counter: behaviors.counter + 1 } : behaviors
      )
    );
    console.log("behaviors", behaviors);

    try {
      console.log(`Button ${id} clicked`);
    } catch (error) {
      console.error('Error updating the database', error);
    }
  };

  const aggressionButtonClick = async (id: number) => {
    setAggression(prevButtons =>
      prevButtons.map(aggression =>
        aggression.id === id ? { ...aggression, counter: aggression.counter + 1 } : aggression
      )
    );
    console.log("behaviors", behaviors);

    try {
      console.log(`Button ${id} clicked`);
    } catch (error) {
      console.error('Error updating the database', error);
    }
  };

  const StartTime = () => {
    setDidUserClickStart(true);
    
  };

  const StopTime = () => {
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

      <div style={{ display: "flex", justifyContent: "center", }}>
        <div className="card" style={{ width: "750px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "500px", display: "flex", justifyContent: "space-between", marginTop: "10px", marginBottom: "10px" }}>
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
              <div className="card" style={{border: "none"}}>
                {behaviors.map((button) => (
                  <div key={button.id} className="grid-container-For-behavior-buttons">
                    <button className="counter-buttons" onClick={() => behaviorButtonClick(button.id)}>
                      {button.label}
                    </button>
                    <p style={{
                      border: '2px solid black',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
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
              <div className="card" style={{border: "none"}}>
                {aggression.map((button) => (
                  <div key={button.id} className="grid-container-For-aggression-buttons">
                    <p style={{
                      border: '2px solid black',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white'
                    }}>
                      {button.counter}
                    </p>
                    <button className="counter-buttons" onClick={() => aggressionButtonClick(button.id)}>
                      {button.label}
                    </button>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br/>
          {!didUserClickStart ? (
            <button onClick={StartTime} className="startButton">Start</button>
              ) : (
                <button onClick={StopTime} className="stopButton">Finish</button>
              )}
          <br/>
        </div>
        
      </div>
      <PopupTimeOutRoomSession showModal={showModal} setShowModal={setShowModal} setDidUserClickStart={setDidUserClickStart}/>
    </>
  );
};

export default TimeOutObservation;
