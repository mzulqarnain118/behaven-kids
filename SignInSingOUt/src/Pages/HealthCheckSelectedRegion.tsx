import React, { useState } from "react";
import ChildLogo from '../../src/assets/child.png';
import StaffLogo from '../../src/assets/person.png';
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";
import Camera from '../../src/assets/camera.png';
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';


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
  { value: 'chest', label: 'Chest' },
  { value: 'stomach', label: 'Stomach' },
];

const frontOrBack: OptionType[] = [
  { value: 'front', label: 'Front' },
  { value: 'back', label: 'Back' },
];

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {
  const location = useLocation();
  const { selectedArea } = location.state || {};
  console.log(selectedArea);

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [clientTemperature, setClientTemperature] = useState<string>();
  const [other, setOther] = useState<string>();
  const [description, setDescription] = useState<string>();
  const preSelectedOption = bodyParts.find(option => option.value === selectedArea) || null;
  const [selectedBodyPart, ] = useState<OptionType | null>(preSelectedOption);
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSymptoms({
      ...symptoms,
      [name]: checked
    });
  };
  // const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     setSelectedImage(files[0]);
  //   }
  // };

  // const videoConstraints = {
  //   facingMode: { exact: "environment" }
  // };

  const uploadImage = () => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login");
      navigate("/", { replace: true });
      return;
    }
    const decoded = jwtDecode(token);
    const staffID = (decoded as any).StaffID;

    const formData = new FormData();
    if (selectedImages) {
      formData.append('Image', selectedImages[0] || "");
    }
    formData.append('Temperature', clientTemperature || "");
    formData.append('Other', other || "");
    formData.append('Description', description || "");
    formData.append('ProvidedSymptoms.Scratch', String(symptoms.Scratch));
    formData.append('ProvidedSymptoms.Dizziness', String(symptoms.Dizziness));
    formData.append('ProvidedSymptoms.Bruise', String(symptoms.Bruise));
    formData.append('ProvidedSymptoms.HeavyBreath', String(symptoms.HeavyBreath));
    formData.append('ProvidedSymptoms.Tiredness', String(symptoms.Tiredness));
    formData.append('ProvidedSymptoms.Rash', String(symptoms.Rash));
    formData.append('ProvidedSymptoms.Swelling', String(symptoms.Swelling));
    formData.append('ProvidedSymptoms.Nausea', String(symptoms.Nausea));
    formData.append('ProvidedSymptoms.Nausea', String(symptoms.Nausea));
    formData.append('staffID', staffID);



    fetch(`${backEndCodeURLLocation}HealthCheck/testing`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('this error:', error);
      });
  };

  const handleChange = (selectedOption: OptionType | null) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
          <h4>&#128198; {new Date().toLocaleDateString()}</h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={ChildLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            {/* <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomName}</h4> */}
          </div>

        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
          <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={StaffLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            {/* <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomPositionName}</h4> */}
          </div>
        </div>
      </div>
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
              
              <span style={{ fontSize: "25px" }}>Temperature: <input onChange={(event) => setClientTemperature(event.target.value)} type='number' style={{ width: "100px", height: "35px", textAlign: "center" }}></input><span style={{marginLeft: "10px"}}>&#8457;</span></span>
                <div style={{marginTop: "25px"}}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <label style={{ marginRight: "15px", fontSize: "25px"}}>Selected Region</label>
                <Select
                    options={bodyParts}
                    onChange={handleChange}
                    isClearable
                    placeholder="Select a body part"
                    value={selectedBodyPart}
                  />
                  <span style={{ marginLeft: "15px"}}> </span>
                  <Select
                    options={frontOrBack}
                    onChange={handleChange}
                    isClearable
                    placeholder="Front or Back"
                    
                  />
              </div>
                  <form>
                    <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Scratch" type="checkbox" name="Scratch" checked={symptoms.Scratch} onChange={handleCheckboxChange} className="checkBoxSize" />
                        <label htmlFor="Scratch" style={{ marginLeft: "15px"}}> Scratch</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Dizziness" type="checkbox" name="Dizziness" checked={symptoms.Dizziness} onChange={handleCheckboxChange} className="checkBoxSize" />
                        <label htmlFor="Dizziness" style={{ marginLeft: "15px"}}> Dizziness</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Bruise" type="checkbox" name="Bruise" checked={symptoms.Bruise} onChange={handleCheckboxChange} className="checkBoxSize"/>
                        <label htmlFor="Bruise" style={{ marginLeft: "15px"}}>Bruise</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="HeavyBreath" type="checkbox" name="HeavyBreath" checked={symptoms.HeavyBreath} onChange={handleCheckboxChange} className="checkBoxSize" />
                        <label htmlFor="HeavyBreath" style={{ marginLeft: "15px"}}>Heavy Breath</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Tiredness" type="checkbox" name="Tiredness" checked={symptoms.Tiredness} onChange={handleCheckboxChange} className="checkBoxSize" />
                        <label htmlFor="Tiredness" style={{ marginLeft: "15px"}}>Tiredness</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Rash" type="checkbox" name="Rash" checked={symptoms.Rash} onChange={handleCheckboxChange} className="checkBoxSize" />
                        <label htmlFor="Rash" style={{ marginLeft: "15px"}}>Rash</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Swelling" type="checkbox" name="Swelling" checked={symptoms.Swelling} onChange={handleCheckboxChange} className="checkBoxSize" />
                        <label htmlFor="Swelling" style={{ marginLeft: "15px"}}>Swelling</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Nausea" type="checkbox" name="Nausea" checked={symptoms.Nausea} onChange={handleCheckboxChange} className="checkBoxSize"/>
                        <label htmlFor="Nausea" style={{ marginLeft: "15px"}}>Nausea</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <input id="Nausea" type="checkbox" name="Nausea" checked={symptoms.Nausea} onChange={handleCheckboxChange} className="checkBoxSize" disabled={true}/>
                        <label htmlFor="Other" style={{ marginLeft: "15px"}}>Other</label>
                        <input type="text" style={{ width: "250px", marginLeft: "20px" }} onChange={(event) => setOther(event.target.value)}></input>
                      </div>
                    </div>
                    <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "250px", marginTop: "25px", fontSize: "20px" }} onChange={(event) => setDescription(event.target.value)}></textarea>


                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "15px" }}>
                      <button
                        type="button"
                        onClick={() => setShowModel(true)}
                        style={{ borderRadius: "25px" }}
                      >
                        <img src={Camera}></img>
                      </button>
                      {selectedImages.map((file, index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                          {file && <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} style={{ border: "1px", width: "105px", height: "105px", borderRadius: "25px", marginLeft: "25px" }}/>}
                        </div>
                      ))}
                    </div>
                    <div style={{width: "100%", textAlign: "center", marginTop: "25px"}} >
                      <button style={{width: "150px", height: "60px", fontSize: "25px"}} className="btn btn-primary" type="button" onClick={uploadImage}>Submit</button>
                    </div>
                    
                  </form>
                </div>
              {/* </div> */}
            {/* </div> */}
          </div>

        </div>

      </div>
      <PopupCamera showModel={showModel} setShowModel={setShowModel} selectedImage={selectedImages} setSelectedImages={setSelectedImages} />
    </>
  );
};

export default HealthCheckSelectedRegion;