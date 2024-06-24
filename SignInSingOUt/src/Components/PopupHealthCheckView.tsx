import React, { useState, useEffect } from "react";
import "./animation.scss";
import BootstrapModal from "react-bootstrap/Modal";
import '../Pages/CSS/HealthCheck.css'
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { backEndCodeURLLocation } from "../config";

interface PopupHealthCheckView {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    id: number;
    isPrevious: boolean;
}

interface OptionType {
    label: string;
    value: string;
}

interface Testing {
    scratch: number;
    bruise: number;
    dizziness: number;
    heavyBreath: number;
    tiredness: number;
    swelling: number;
    rash: number;
    description: string;
    other: string;
    nausea: number;
    temperature: number;
    picture1: Blob;
    picture2: Blob;
    picture3: Blob;
    picture4: Blob;
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

const PopupHealthCheckView: React.FC<PopupHealthCheckView> = ({ showModel, setShowModel, id, isPrevious }) => {
    if (!open) return null;

    const location = useLocation();
    const { selectedArea, clientID, clientFullName, staffFullName } = location.state || {};
    console.log("ClientID Test = " + clientID);
    console.log(clientFullName + staffFullName);
    console.log(selectedArea);

    const [selectedImageBlobPicture1, setSelectedImageBlobPicture1] = useState<Blob | undefined>(undefined);
    const [selectedImageBlobPicture2, setSelectedImageBlobPicture2] = useState<Blob | undefined>(undefined);
    const [selectedImageBlobPicture3, setSelectedImageBlobPicture3] = useState<Blob | undefined>(undefined);
    const [selectedImageBlobPicture4, setSelectedImageBlobPicture4] = useState<Blob | undefined>(undefined);


    const preSelectedOption = bodyParts.find(option => option.value === selectedArea) || null;
    const [selectedBodyPart, setSelectedBodyPart] = useState<OptionType | null>(preSelectedOption);
    const [selectedFrontOrBack, setSelectedFrontOrBack] = useState<OptionType | null>(null);
    const [testing, setTesting] = useState<Testing[]>();


    const navigate = useNavigate();
    const handleClose = () => {
        setSelectedImageBlobPicture1(undefined);
        setSelectedImageBlobPicture2(undefined);
        setSelectedImageBlobPicture3(undefined);
        setSelectedImageBlobPicture4(undefined);
        setShowModel(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please log In");
                navigate("/", { replace: true });
                return;
            }
            console.log("ID = " + id);
            const response = await fetch(`${backEndCodeURLLocation}HealthCheck/GetClientSpecificRecord?id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("data = ", data);
            setTesting(data);

            if (data && data.length > 0 && data[0].picture1) {
                const base64String = data[0].picture1;
                const byteCharacters = atob(base64String); // Decode base64 string
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed

                setSelectedImageBlobPicture1(blob);
            }
            if (data && data.length > 0 && data[0].picture2) {
                const base64String = data[0].picture2;
                const byteCharacters = atob(base64String); // Decode base64 string
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed

                setSelectedImageBlobPicture2(blob);
            }
            if (data && data.length > 0 && data[0].picture3) {
                const base64String = data[0].picture3;
                const byteCharacters = atob(base64String); // Decode base64 string
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed

                setSelectedImageBlobPicture3(blob);
            }
            if (data && data.length > 0 && data[0].picture4) {
                const base64String = data[0].picture4;
                const byteCharacters = atob(base64String); // Decode base64 string
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed

                setSelectedImageBlobPicture4(blob);
            }

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch data. Response status: ${response.status}`
                );
            }
        };
        fetchData();
    }, [id]);

    const StaffClickedYesToMovePreviousHealthConditionToNextDay = async () => {
        try {

            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log In");
                navigate("/", { replace: true });
                return;
            }

            const response = await fetch(`${backEndCodeURLLocation}HealthCheck/MakePreviousHealthCurrent?id=${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                alert(`Error moving to current: ${response.status}`);
            }
            setShowModel(false);
            window.location.reload();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


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
                                {testing !== undefined &&
                                    <div className="card-body" style={{ pointerEvents: "none" }}>
                                        <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}> *
                                          <div className="card-body"> 

                                            <span style={{ fontSize: "25px" }}>Temperature:
                                                <input type='number' style={{ width: "100px", height: "35px", textAlign: "center", marginLeft: "10px" }} value={testing[0].temperature}></input>
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
                                                            <input id="Scratch" type="checkbox" name="Scratch" checked={testing[0].scratch === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Scratch" style={{ marginLeft: "15px" }}> Scratch</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Dizziness" type="checkbox" name="Dizziness" checked={testing[0].dizziness === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Dizziness" style={{ marginLeft: "15px" }}> Dizziness</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Bruise" type="checkbox" name="Bruise" checked={testing[0].bruise === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Bruise" style={{ marginLeft: "15px" }}>Bruise</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="HeavyBreath" type="checkbox" name="HeavyBreath" checked={testing[0].heavyBreath === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="HeavyBreath" style={{ marginLeft: "15px" }}>Heavy Breath</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Tiredness" type="checkbox" name="Tiredness" checked={testing[0].tiredness === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Tiredness" style={{ marginLeft: "15px" }}>Tiredness</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Rash" type="checkbox" name="Rash" checked={testing[0].rash === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Rash" style={{ marginLeft: "15px" }}>Rash</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Swelling" type="checkbox" name="Swelling" checked={testing[0].swelling === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Swelling" style={{ marginLeft: "15px" }}>Swelling</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Nausea" type="checkbox" name="Nausea" checked={testing[0].nausea === 0 ? false : true} className="checkBoxSize" />
                                                            <label htmlFor="Nausea" style={{ marginLeft: "15px" }}>Nausea</label>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                            <input id="Other" type="checkbox" name="Other" className="checkBoxSize" disabled={true} />
                                                            <label htmlFor="Other" style={{ marginLeft: "15px" }}>Other</label>
                                                            <input type="text" style={{ width: "250px", marginLeft: "20px" }} value={testing[0].other}></input>
                                                        </div>
                                                    </div>
                                                    <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "250px", marginTop: "25px", fontSize: "20px", padding: "10px" }} value={testing[0].description}></textarea>
                                                    {selectedImageBlobPicture1 && (
                                                        <img src={URL.createObjectURL(selectedImageBlobPicture1)} style={{ border: "1px solid", width: "130px", height: "130px", borderRadius: "25px", marginLeft: "25px" }} />
                                                    )}
                                                    {selectedImageBlobPicture2 && (
                                                        <img src={URL.createObjectURL(selectedImageBlobPicture2)} style={{ border: "1px solid", width: "130px", height: "130px", borderRadius: "25px", marginLeft: "25px" }} />
                                                    )}
                                                    {selectedImageBlobPicture3 && (
                                                        <img src={URL.createObjectURL(selectedImageBlobPicture3)} style={{ border: "1px solid", width: "130px", height: "130px", borderRadius: "25px", marginLeft: "25px" }} />
                                                    )}
                                                    {selectedImageBlobPicture4 && (
                                                        <img src={URL.createObjectURL(selectedImageBlobPicture4)} style={{ border: "1px solid", width: "130px", height: "130px", borderRadius: "25px", marginLeft: "25px" }} />
                                                    )}


                                                </form>
                                            </div>
                                        </div>
                                         </div> 

                                    </div>
                                }
                                
                                    <div>
                                    {isPrevious === true &&
                                    <button className="add-button-class" style={{ marginRight: "15px" }} onClick={StaffClickedYesToMovePreviousHealthConditionToNextDay}>Move To Current</button>
                                }
                                    <button className="add-button-class" style={{ marginLeft: "15px" }} onClick={handleClose}>Close</button>
                                </div>
                               
                                

                            </div>
                        </div>
                    </BootstrapModal.Body>
                </BootstrapModal>
            </div>

        </>

    );
};

export default PopupHealthCheckView;
