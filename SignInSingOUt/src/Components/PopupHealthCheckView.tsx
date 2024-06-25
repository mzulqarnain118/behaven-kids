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

interface ClientHealthCheckInfo {
    scratch: number;
    bruise: number;
    rash: number;
    swelling: number;
    drySkin: number;
    lethargic: number;
    nausa: number;
    pourHygiene: number;
    dirtyDiapers: number;
    tatto: number;
    previousDayCloths: number;
    other: string;
    description: string;
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
    const [clientHealthCheckInfo, setClientHealthCheckInfo] = useState<ClientHealthCheckInfo[]>();


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
            setClientHealthCheckInfo(data);

            if (data && data.length > 0) {
                const pictures = [data[0].picture1, data[0].picture2, data[0].picture3, data[0].picture4];
                const setters = [setSelectedImageBlobPicture1, setSelectedImageBlobPicture2, setSelectedImageBlobPicture3, setSelectedImageBlobPicture4];
        
                pictures.forEach((base64String, index) => {
                  if (base64String) {
                    const byteCharacters = atob(base64String); // Decode base64 string
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                      byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed
        
                    setters[index](blob);
                  }
                });
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
                                {clientHealthCheckInfo !== undefined &&
                                    <div className="card-body" style={{ pointerEvents: "none" }}>
                                        <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}> *
                                            <div className="card-body">
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
                                                                <input id="scratch" type="checkbox" name="scratch" checked={clientHealthCheckInfo[0].scratch === 0 ? false : true} className="checkBoxSize" />
                                                                <label htmlFor="scratch" style={{ marginLeft: "15px" }}> Scratch</label>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <input id="bruise" type="checkbox" name="bruise" checked={clientHealthCheckInfo[0].bruise === 0 ? false : true} className="checkBoxSize" />
                                                                <label htmlFor="bruise" style={{ marginLeft: "15px" }}>Bruise</label>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <input id="rash" type="checkbox" name="rash" checked={clientHealthCheckInfo[0].rash === 0 ? false : true} className="checkBoxSize" />
                                                                <label htmlFor="rash" style={{ marginLeft: "15px" }}>Rash</label>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <input id="swelling" type="checkbox" name="swelling" checked={clientHealthCheckInfo[0].swelling === 0 ? false : true} className="checkBoxSize" />
                                                                <label htmlFor="swelling" style={{ marginLeft: "15px" }}>Swelling</label>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <input id="drySkin" type="checkbox" name="drySkin" checked={clientHealthCheckInfo[0].drySkin === 0 ? false : true} className="checkBoxSize" />
                                                                <label htmlFor="drySkin" style={{ marginLeft: "15px" }}>Dry Skin</label>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <input id="other" type="checkbox" name="other" className="checkBoxSize" disabled={true} />
                                                                <label htmlFor="other" style={{ marginLeft: "15px" }}>Other</label>
                                                                <input type="text" style={{ width: "150px", marginLeft: "20px" }} value={clientHealthCheckInfo[0].other}></input>
                                                            </div>
                                                        </div>
                                                        <hr style={{ marginTop: "35px" }} />
                                                        <div style={{ fontSize: "25px", marginTop: "25px" }}>
                                                            <span style={{ fontSize: "25px", marginTop: "25px" }}>Temperature:
                                                                <input value={clientHealthCheckInfo[0].temperature} type='number' style={{ width: "100px", height: "35px", textAlign: "center", marginLeft: "10px" }}></input>
                                                                <span style={{ marginLeft: "10px" }}>&#8457;</span>
                                                            </span>
                                                            <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                    <input id="lethargic" type="checkbox" name="lethargic" checked={clientHealthCheckInfo[0].lethargic === 0 ? false : true} className="checkBoxSize" />
                                                                    <label htmlFor="lethargic" style={{ marginLeft: "15px" }}> Lethargic</label>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                    <input id="nausea" type="checkbox" name="nausea" checked={clientHealthCheckInfo[0].nausa === 0 ? false : true} className="checkBoxSize" />
                                                                    <label htmlFor="nausea" style={{ marginLeft: "15px" }}>Nausea</label>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                    <input id="pourHygiene" type="checkbox" name="pourHygiene" checked={clientHealthCheckInfo[0].pourHygiene === 0 ? false : true} className="checkBoxSize" />
                                                                    <label htmlFor="pourHygiene" style={{ marginLeft: "15px" }}>Poor Hygiene</label>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                    <input id="dirtyDiapers" type="checkbox" name="dirtyDiapers" checked={clientHealthCheckInfo[0].dirtyDiapers === 0 ? false : true} className="checkBoxSize" />
                                                                    <label htmlFor="dirtyDiapers" style={{ marginLeft: "15px" }}>Dirty Diapers</label>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                    <input id="tattoo" type="checkbox" name="tattoo" checked={clientHealthCheckInfo[0].tatto === 0 ? false : true} className="checkBoxSize" />
                                                                    <label htmlFor="tattoo" style={{ marginLeft: "15px" }}>Tattoo</label>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                    <input id="previousDayClothes" type="checkbox" name="previousDayClothes" checked={clientHealthCheckInfo[0].previousDayCloths === 0 ? false : true} className="checkBoxSize" />
                                                                    <label htmlFor="previousDayClothes" style={{ marginLeft: "15px" }}>Previous Day Clothes</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "250px", marginTop: "25px", fontSize: "20px", padding: "10px" }} value={clientHealthCheckInfo[0].description}></textarea>
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
