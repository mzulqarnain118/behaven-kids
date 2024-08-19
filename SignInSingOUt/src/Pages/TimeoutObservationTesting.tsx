import React from 'react'
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
import { useBehaviorColumnOneStore, useBehaviorColumnTwoStore, useTimeoutAllVariables, clearLocalStorage } from './Store/TimeOutRoomStore';
import axios from 'axios';
import useSound from 'use-sound';
import boopSfx from '../../src/assets/alert_sound.ogg';

const BehaviorListColumnTwo: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clientID, clientFullName, roomPositionName, roomID, staffID, staffFullName, clientPreviousRoom } = location.state || {};

    const columnOne = useBehaviorColumnOneStore((state) => state.behaviors)
    const columnOneIncrementCounter = useBehaviorColumnOneStore((state) => state.incrementCounter)
    const columnTwo = useBehaviorColumnTwoStore((state) => state.behaviors)
    const columnTwoIncrementCounter = useBehaviorColumnTwoStore((state) => state.incrementCounter)

    const { description, setDescription, level, setLevel, startTime, setStartTime } = useTimeoutAllVariables();

    const [timer, setTimer] = useState('00:00');
    const [clientAgeTrigger, setClientAgeTrigger] = useState<string>("");
    const [didUserClickStart,] = useState<Boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [didUserClickYes, setDidUserClickYes] = useState<boolean>(false);
    const [didItReachClientAge, setDidItReachClientAge] = useState<boolean>(false);


    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [play] = useSound(boopSfx);

    useEffect(() => {
        const levelThreeBehaviors = ['Talking Loud', 'Moving Around', 'Crying', 'Swearing'];
        const levelFiveBehaviors = ['Injury to Child', 'Injury to Staff', 'Property Damage'];
        const levelFourBehaviors = ['Screaming', 'Aggression', 'Spitting', 'Disrobing', 'Attempt Escaping', 'Running', 'Body Functions', 'Self Harming', 'Biting'];

        const isLevelThree = columnOne.some(
            (behavior) => levelThreeBehaviors.includes(behavior.label) && behavior.counter > 0
        );
     
        const isLevelFourColumnTwo = columnTwo.some(
            (behavior) => levelFourBehaviors.includes(behavior.label) && behavior.counter > 0
        );

        const isLevelFourColumnOne = columnOne.some(
            (behavior) => levelFourBehaviors.includes(behavior.label) && behavior.counter > 0
        );

        const isLevelFive = columnTwo.some(
            (behavior) => levelFiveBehaviors.includes(behavior.label) && behavior.counter > 0
        );


        if (isLevelFive) {
            setLevel(5);
        }
        else if (isLevelFourColumnOne || isLevelFourColumnTwo) {
            setLevel(4);
        }
        else if (isLevelThree) {
            setLevel(3);
        }
    }, [columnOne, columnTwo]);

    useEffect(() => {
        console.log(clientAgeTrigger);
        if (timer === clientAgeTrigger)
        {
            setDidItReachClientAge(true);
            play();
        }
    }, [timer]);

    useEffect(() => {
        const fetchAge = async () => {
            try {
                const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login");
                return;
            }
                var response = await axios.get(
                    `${backEndCodeURLLocation}TimeOutRoom/GetClientAgeForTimeOut?clientId=${clientID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setClientAgeTrigger("0" + response.data + ":00")
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    alert('Error: Please check internet connection ' + error.message);
                } else {
                    alert('Error: Please check internet connection ' + error);
                }
            }
        };
    
        fetchAge();
    }, []);

    useEffect(() => {
        if (didUserClickStart) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login");
                return;
            }
        }
        if (startTime === null || startTime === "")
            setStartTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => { 
                setTimer((prevTimer: string) => {
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

    const CheckToSeeIfTimeoutIsFinished = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (didUserClickYes === true) {
            AddNewClientLevelTwoToFiveTimeout();
        }
    }, [didUserClickYes]);

    const AddNewClientLevelTwoToFiveTimeout = async () => {
        const token = localStorage.getItem("token");

        const behaviorsDTO = {
            Mumbling: (columnOne.find(b => b.label === 'Mumbling') || { counter: 0 }).counter,
            Wiggling: (columnOne.find(b => b.label === 'Wiggling') || { counter: 0 }).counter,
            TalkingLoud: (columnOne.find(b => b.label === 'Talking Loud') || { counter: 0 }).counter,
            MovingAround: (columnOne.find(b => b.label === 'Moving Around') || { counter: 0 }).counter,
            Crying: (columnOne.find(b => b.label === 'Crying') || { counter: 0 }).counter,
            Swearing: (columnOne.find(b => b.label === 'Swearing') || { counter: 0 }).counter,
            Screaming: (columnOne.find(b => b.label === 'Screaming') || { counter: 0 }).counter,
            Aggression: (columnOne.find(b => b.label === 'Aggression') || { counter: 0 }).counter,
            Spitting: (columnOne.find(b => b.label === 'Spitting') || { counter: 0 }).counter,
            Disrobing: (columnTwo.find(b => b.label === 'Disrobing') || { counter: 0 }).counter,
            AttemptEscaping: (columnTwo.find(b => b.label === 'Attempt Escaping') || { counter: 0 }).counter,
            Running: (columnTwo.find(b => b.label === 'Running') || { counter: 0 }).counter,
            BodyFunctions: (columnTwo.find(b => b.label === 'Body Functions') || { counter: 0 }).counter,
            SelfHarm: (columnTwo.find(b => b.label === 'Self Harming') || { counter: 0 }).counter,
            Biting: (columnTwo.find(b => b.label === 'Biting') || { counter: 0 }).counter,
            InjuryToChild: (columnTwo.find(b => b.label === 'Injury to Child') || { counter: 0 }).counter,
            InjuryToStaff: (columnTwo.find(b => b.label === 'Injury to Staff') || { counter: 0 }).counter,
            PropertyDamage: (columnTwo.find(b => b.label === 'Property Damage') || { counter: 0 }).counter,
        };

        const behaviorAndAggressionDTO = {
            Behaviors: behaviorsDTO,
            ClientID: String(clientID),
            StaffID: String(staffID),
            RoomID: String(roomID),
            TimeoutRoomPosition: String(roomPositionName),
            StartTime: String(startTime),
            ClientPreviousRoom: String(clientPreviousRoom),
            Description: description
        };

        try {
            await axios.post(
                `${backEndCodeURLLocation}Cbs/AddClientLevelTwoToFive`,
                behaviorAndAggressionDTO,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            clearLocalStorage();
              navigate("/timeoutselectaclient", {
                replace: true,
              });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert('Error: Please check internet connection' + error.message);
            } else {
                alert('Error: Please check internet connection' + error);
            }
        }


    }

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
                            <h4 style={{ marginLeft: "10px", color: didItReachClientAge === true ? "red" : "black" }}>{timer} (min:sec)</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginLeft: "10px" }}>Level {level}</h4>
                        </div>
                    </div>


                    <div className="card" >
                        <div className="card-body grid-container-For-behaviors" >
                            <div className="card" style={{ border: "none" }}>
                                {columnOne.map((button) => (
                                    <div key={button.id} className="grid-container-For-behavior-buttons">
                                        <button className={button.id <= 2 ? "level_2_counter_button" : (button.id >= 2 && button.id <= 6) ? "level_3_counter_button" : "level_4_counter_button"} onTouchEnd={() => columnOneIncrementCounter(button.id)}>
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
                                {columnTwo.map((button) => (
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
                                        <button className={button.id <= 6 ? "level_4_counter_button" : "level_5_counter_button"} onTouchEnd={() => columnTwoIncrementCounter(button.id)}>
                                            {button.label}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <textarea placeholder="Description" id="w3review" name="w3review" style={{ height: "200px", fontSize: "20px", paddingLeft: "10px", paddingTop: "5px", marginLeft: "40px", marginRight: "40px", marginBottom: "10px", marginTop: "10px" }} value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>
                    <br />
                    <button onClick={CheckToSeeIfTimeoutIsFinished} className="stopButton">Finish</button>
                    <br />
                </div>

            </div>
            <PopupTimeOutRoomSession showModal={showModal} setShowModal={setShowModal} setDidUserClickYes={setDidUserClickYes} />
        </>
    );


}

const App: React.FC = () => (
    <div>
        <BehaviorListColumnTwo />
    </div>
)

export default App
