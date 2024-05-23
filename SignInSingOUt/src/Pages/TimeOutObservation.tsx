import { useEffect, useState } from "react";
import "./CSS/CbsAddOrTransferClientsToRooms.css";
import Person from '../../src/assets/person.png';
import TimeOutLogo from '../../src/assets/timer.png';
import "./CSS/TimeOutObservation.css"

const TimeOutObservation: React.FC = () => {

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

    useEffect(() => {

    });

    const handleClick = async (id: number) => {
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

    const handleSave = async () => {
        const updatedData = aggression.map(({ label, counter }) => ({ label, counter }));
    
        try {
          const response = await fetch('http://localhost:5000/api/behaviors/update-behaviors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          });
    
          if (response.ok) {
            console.log('Behaviors saved successfully');
          } else {
            console.error('Error updating the database', response.statusText);
          }
        } catch (error) {
          console.error('Error updating the database', error);
        }
      };


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

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="card" style={{ width: "750px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="card-body grid-container-For-behaviors" style={{ height: "100%" }}>
                        <div className="card" >
                            <h5>Behaviors Observed</h5>
                            {behaviors.map((button) => (
                                <div key={button.id}>
                                <button onClick={() => handleClick(button.id)}>
                                    {button.label} (Clicked {button.counter} times)
                                </button>
                                </div>
                            ))}
                        </div>
                        <div className="card">
                            <h5>Behaviors Observed</h5>
                            {aggression.map((button) => (
                                <div key={button.id}>
                                <button onClick={() => handleClick(button.id)}>
                                    {button.label} (Clicked {button.counter} times)
                                </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
        </>
    );
};

export default TimeOutObservation;
