
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import "../Pages/CSS/TimeOutObservation.css"
import Location from '../../src/assets/location.png';
import Timer from '../../src/assets/timer.png';
import Child from '../../src/assets/child.png'
import PopupTimeOutRoomSession from "../Components/PopupTimeOutRoomSession";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';

interface ManuallyAddTimeoutModal {
  showModel: boolean;
  setShowModel: React.Dispatch<React.SetStateAction<any>>;
  levelOneTotal?: number;
  clientID?: number;
  clientFullName: string;
  clientProgram: string;
  staffFullName: string;
  staffID?: string;
  locationID: string;
}

const ManuallyAddTimeoutModal: React.FC<ManuallyAddTimeoutModal> = ({ showModel, setShowModel, clientID, clientFullName, staffFullName, staffID }) => {
  if (!open) return null;
  const handleClose = async () => {
    setShowModel(false)
  };

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
    { id: 9, label: 'Biting', counter: 0 },
  ]);

  const [didUserClickStart, setDidUserClickStart] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [didUserClickYes, setDidUserClickYes] = useState<boolean>(false);
  const [startTime, setStartTime] = useState("");
  const [description, setDescription] = useState<string>();
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [selectManualDate, setSelectManualDate] = useState<Dayjs | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);


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
      Bitting: (behaviorsColumnTwo.find(b => b.label === 'Biting') || { counter: 0 }).counter,
    };

    const behaviorAndAggressionDTO = {
      Behaviors: behaviorsDTO,
      ClientID: String(clientID),
      StaffID: String(staffID),
      // RoomID: String(roomID),
      // TimeoutRoomPosition: String(roomPositionName),
      StartTime: String(startTime),
      // ClientPreviousRoom: String(clientPreviousRoom),
      Description: description
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
        });

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

  const handleUpdateTime = async (
    field: "timeOutStartTime" | "timeOutEndTime",
    selectedTime: string
  ) => {
    try {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      // Parse the input time (newValue) into hours and minutes
      const [newHours, newMinutes] = selectedTime.split(":").map(Number);

      // Convert both current and input times to minutes
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const newValueInMinutes = newHours * 60 + newMinutes;


      if (newValueInMinutes > currentTimeInMinutes) {
        alert("Choose a time [not greater] than the current time.");
        return;
      }

      if (field === "timeOutStartTime") {
        const [signOutHours, signOutMinutes] = selectedTime.split(":").map(Number);
        const signOutTimeInMinutes = signOutHours * 60 + signOutMinutes;
        if (newValueInMinutes > signOutTimeInMinutes) {
          alert("Sign-in time cannot be after sign-out time.");
          return;
        }

        setSelectedStartTime(() => selectedTime);
      }

      if (field === "timeOutEndTime") {
        if (selectedStartTime) {
          const [signInHours, signInMinutes] = selectedTime.split(":").map(Number);
          const signInTimeInMinutes = signInHours * 60 + signInMinutes;
          if (newValueInMinutes < signInTimeInMinutes) {
            alert("Sign-out time cannot be before sign-in time.");
            return;
          }
        }

        setSelectedEndTime(() => selectedTime);
        // setDidUserChoseASignOutTime(true);
      }

      // setSchedule((prevSchedule) =>
      //   prevSchedule.map((item) =>
      //     item.id === id ? { ...item, [field]: newValue } : item
      //   )
      // );
    } catch (error) {
      console.error("Error updating time:", error);
    }
  };


  return (
    <>
      <div>
        <BootstrapModal dialogClassName="custom-modal" fullscreen={true} show={showModel} onHide={handleClose} centered>
          <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card" style={{ width: "750px", display: "flex", justifyContent: "center", alignItems: "center", border: "solid gray" }}>
                  <div style={{ display: "flex", marginTop: "15px" }}>
                    <img src={Child} style={{ width: "35px", height: "35px" }} />
                    <h3 style={{ marginLeft: "1px" }}>{clientFullName}</h3>
                  </div>
                  <div style={{ width: "690px", display: "flex", justifyContent: "space-between", marginTop: "15px", marginBottom: "10px" }}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']} >
                        <DatePicker value={selectManualDate} onChange={(newValue) => setSelectManualDate(newValue)} slotProps={{ textField: { required: true } }} />
                      </DemoContainer>
                    </LocalizationProvider>

                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <img src={Timer} style={{ width: "50px", height: "50px" }} />
                      <input
                        type="time"
                        style={{width: "175px", height: "60px"}}
                        className="form-control"
                        value={selectedStartTime}
                        onChange={(e) =>
                          handleUpdateTime("timeOutStartTime", e.target.value)
                        }
                      />

                      <input
                        type="time"
                        style={{width: "175px", height: "60px"}}
                        className="form-control"
                        value={selectedEndTime}
                        onChange={(e) =>
                          handleUpdateTime("timeOutEndTime", e.target.value)
                        }
                      />
                    </div>
                  </div>


                  <div className="card" >
                    <div className="card-body grid-container-For-behaviors" >
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
                    <textarea placeholder="Description" id="w3review" name="w3review" style={{ height: "200px", fontSize: "20px", paddingLeft: "10px", paddingTop: "5px", marginLeft: "40px", marginRight: "40px", marginBottom: "10px", marginTop: "10px" }} onChange={(event) => setDescription(event.target.value)}></textarea>
                  </div>
                  <br />
                  <button onClick={CheckToSeeIfTimeoutIsFinished} className="stopButton">Finish</button>
                  <br />
                </div>

              </div>
              <PopupTimeOutRoomSession showModal={showModal} setShowModal={setShowModal} setDidUserClickStart={setDidUserClickStart} setDidUserClickYes={setDidUserClickYes} />
            </>
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </BootstrapModal.Footer>
        </BootstrapModal>
      </div>

    </>

  );
};

export default ManuallyAddTimeoutModal;
