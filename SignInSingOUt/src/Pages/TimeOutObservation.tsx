import { useEffect } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import Person from '../../src/assets/person.png';
import TimeOutLogo from '../../src/assets/timer.png';
import "./CSS/TimeOutObservation.css"

const TimeOutObservation: React.FC = () => {

    useEffect(() => {

    });

    const behaviors = ["Swearing", "Disrobing Clothes", "Vomiting", "Spitting", "Crying", "Screaming", "Urinating", "Defecating", "Climbing"];

    const aggression = ["Hitting", "Kicking", "Biting", "Pinching", "Slapping", "Propery Destruction", "Self-harm"];


    return ( 
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
                    <h4>&#128198; {new Date().toLocaleDateString()}</h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={TimeOutLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
                        <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>Time Out</h4>
                    </div>

                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
                    <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
                    
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={Person} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
                        <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>Staff Name</h4>
                    </div>
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="card" style={{width: "750px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="card-body grid-container-For-behaviors" style={{ height: "100%"}}>
                    <div className="card" style={{width: "45%"}}>
                        <h5>Behaviors Observed</h5>
                            {behaviors.map((behavior) => (
                                <button
                                    key={behavior}
                                    //onClick={() => InsertPhoneNumber(number.toString())}
                                    // onTouchEnd={() => InsertPhoneNumber(number.toString())}
                                >
                                    {behavior}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeOutObservation;
