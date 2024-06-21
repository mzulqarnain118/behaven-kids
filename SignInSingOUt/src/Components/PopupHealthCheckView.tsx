import React, { useState, useEffect } from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import '../Pages/CSS/HealthCheck.css'
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { backEndCodeURLLocation } from "../config";

interface PopupHealthCheckView {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    id: number;
}

interface OptionType {
    label: string;
    value: string;
}

const bodyParts: OptionType[] = [
    { value: 'head', label: 'Head' },
    { value: 'left_shoulder', label: 'Left Shoulder' },
    { value: 'right_shoulder', label: 'Right Shoulder' },
    { value: 'left_arm', label: 'Left Arm' },
    { value: 'right_arm', label: 'Right Arm' },
    { value: 'left_hand', label: 'Left Hand' },
    { value: 'right_hand', label: 'Right Hand' },
    { value: 'left_leg', label: 'Left Leg' },
    { value: 'right_leg', label: 'Right Leg' },
    { value: 'left_foot', label: 'Left Foot' },
    { value: 'right_foot', label: 'Right Foot' },
    { value: 'torso', label: 'Torso' },
];

const frontOrBack: OptionType[] = [
    { value: 'front', label: 'Front' },
    { value: 'back', label: 'Back' },
];

const PopupHealthCheckView: React.FC<PopupHealthCheckView> = ({ showModel, setShowModel, id }) => {
    if (!open) return null;

    const location = useLocation();
    const { selectedArea, clientID, clientFullName, staffFullName } = location.state || {};
    console.log("ClientID Test = " + clientID);
    console.log(selectedArea);

    const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
    const [clientTemperature, setClientTemperature] = useState<string>();
    const [other, setOther] = useState<string>();
    const [description, setDescription] = useState<string>();
    const preSelectedOption = bodyParts.find(option => option.value === selectedArea) || null;
    const [selectedBodyPart, setSelectedBodyPart] = useState<OptionType | null>(preSelectedOption);
    const [selectedFrontOrBack, setSelectedFrontOrBack] = useState<OptionType | null>(null);
    const [symptoms, setSymptoms] = useState({
        Scratch: false,
        Dizziness: false,
        Bruise: false,
        HeavyBreath: false,
        Tiredness: false,
        Rash: false,
        Swelling: false,
        Nausea: false,
    });
    const navigate = useNavigate();
    const handleClose = () => {
        setShowModel(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                alert("Please log In");
                navigate("/", { replace: true });
                return;
            }

            const response = await fetch(`${backEndCodeURLLocation}HealthCheck/GetClientSpecificRecord?id=${id}`, {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("data", data);

            if (!response.ok) {
                throw new Error(
                `Failed to fetch data. Response status: ${response.status}`
                );
            }
        };
        fetchData();
    }, [id]);
    return (
        <>
            <div >
                <BootstrapModal dialogClassName="custom-modal" fullscreen={true} show={showModel} onHide={handleClose} centered >
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="card"
                                style={{
                                    width: "750px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div className="card-body">
                                    {/* <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}> */}
                                    {/* <div className="card-body"> */}

                                    <span style={{ fontSize: "25px" }}>Temperature:
                                        <input onChange={(event) => setClientTemperature(event.target.value)} type='number' style={{ width: "100px", height: "35px", textAlign: "center", marginLeft: "10px" }}></input>
                                        <span style={{ marginLeft: "10px" }}>&#8457;</span>
                                    </span>
                                    <div style={{ marginTop: "25px" }}>
                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <label style={{ marginRight: "15px", fontSize: "25px" }}>Selected Region</label>
                                            <Select
                                                options={bodyParts}
                                                onChange={(selectedOption) => setSelectedBodyPart(selectedOption)}
                                                placeholder="Select a body part"
                                                value={selectedBodyPart}
                                            />
                                            <span style={{ marginLeft: "15px" }}> </span>
                                            <Select
                                                options={frontOrBack}
                                                onChange={(selectedOption) => setSelectedFrontOrBack(selectedOption)}
                                                placeholder="Front or Back"
                                                value={selectedFrontOrBack}

                                            />
                                        </div>
                                        <form>
                                            <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Scratch" type="checkbox" name="Scratch" checked={symptoms.Scratch} className="checkBoxSize" />
                                                    <label htmlFor="Scratch" style={{ marginLeft: "15px" }}> Scratch</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Dizziness" type="checkbox" name="Dizziness" checked={symptoms.Dizziness} className="checkBoxSize" />
                                                    <label htmlFor="Dizziness" style={{ marginLeft: "15px" }}> Dizziness</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Bruise" type="checkbox" name="Bruise" checked={symptoms.Bruise} className="checkBoxSize" />
                                                    <label htmlFor="Bruise" style={{ marginLeft: "15px" }}>Bruise</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="HeavyBreath" type="checkbox" name="HeavyBreath" checked={symptoms.HeavyBreath} className="checkBoxSize" />
                                                    <label htmlFor="HeavyBreath" style={{ marginLeft: "15px" }}>Heavy Breath</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Tiredness" type="checkbox" name="Tiredness" checked={symptoms.Tiredness} className="checkBoxSize" />
                                                    <label htmlFor="Tiredness" style={{ marginLeft: "15px" }}>Tiredness</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Rash" type="checkbox" name="Rash" checked={symptoms.Rash} className="checkBoxSize" />
                                                    <label htmlFor="Rash" style={{ marginLeft: "15px" }}>Rash</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Swelling" type="checkbox" name="Swelling" checked={symptoms.Swelling} className="checkBoxSize" />
                                                    <label htmlFor="Swelling" style={{ marginLeft: "15px" }}>Swelling</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Nausea" type="checkbox" name="Nausea" checked={symptoms.Nausea} className="checkBoxSize" />
                                                    <label htmlFor="Nausea" style={{ marginLeft: "15px" }}>Nausea</label>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                    <input id="Nausea" type="checkbox" name="Nausea" checked={symptoms.Nausea} className="checkBoxSize" disabled={true} />
                                                    <label htmlFor="Other" style={{ marginLeft: "15px" }}>Other</label>
                                                    <input type="text" style={{ width: "250px", marginLeft: "20px" }} onChange={(event) => setOther(event.target.value)}></input>
                                                </div>
                                            </div>
                                            <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "250px", marginTop: "25px", fontSize: "20px" }} onChange={(event) => setDescription(event.target.value)}></textarea>


                                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "15px" }}>
                                                {selectedImages.map((file, index) => (
                                                    <div key={index} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                                        {file && <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} style={{ border: "1px", width: "105px", height: "105px", borderRadius: "25px", marginLeft: "25px" }} />}
                                                    </div>
                                                ))}
                                            </div>

                                        </form>
                                    </div>
                                    {/* </div> */}
                                    {/* </div> */}

                                </div>

                            </div>

                        </div>
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

export default PopupHealthCheckView;
