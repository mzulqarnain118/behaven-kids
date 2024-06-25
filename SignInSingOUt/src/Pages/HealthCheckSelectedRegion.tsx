import React, { useState, useEffect } from "react";
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
  { value: 'torso', label: 'Torso' },
  // { value: 'chest', label: 'Chest' },
  // { value: 'stomach', label: 'Stomach' },
];

const frontOrBack: OptionType[] = [
  { value: 'front', label: 'Front' },
  { value: 'back', label: 'Back' },
];

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { preSelectedBodyPartArea, clientID, clientFullName, staffFullName, preSelectedBackOrFront } = location.state || {};



  useEffect(() => {
    if (clientID === undefined) {
      navigate("/cbsAddOrTransferClientsToRooms", { replace: true });
    }
  });

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [clientTemperature, setClientTemperature] = useState<string>();
  const [other, setOther] = useState<string>();
  const [description, setDescription] = useState<string>();
  const preSelectedBodyPartOption = bodyParts.find(option => option.value === preSelectedBodyPartArea) || null;
  const preSelectedFrontOrBack = frontOrBack.find(option => option.value === preSelectedBackOrFront) || null;
  const [selectedBodyPart, setSelectedBodyPart] = useState<OptionType | null>(preSelectedBodyPartOption);
  const [selectedFrontOrBack, setSelectedFrontOrBack] = useState<OptionType | null>(preSelectedFrontOrBack);
  const [symptoms, setSymptoms] = useState({
    scratch: false,
    bruise: false,
    rash: false,
    swelling: false,
    lethargic: false,
    nausea: false,
    drySkin: false,
    tattoo: false,
    pourHygiene: false,
    dirtyDiapers: false,
    previousDayClothes: false,
  });


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
      formData.append('ImageOne', selectedImages[0] || "");
      formData.append('ImageTwo', selectedImages[1] || "");
      formData.append('ImageThree', selectedImages[2] || "");
      formData.append('ImageFour', selectedImages[3] || "");
    }

    if (selectedBodyPart) {
      formData.append('SelectedBodyPart', selectedBodyPart.value);
    }
    if (selectedFrontOrBack) {
      formData.append('FrontOrBack', selectedFrontOrBack.value);
    }

    formData.append('ClientID', clientID);
    formData.append('StaffID', staffID);
    formData.append('Temperature', clientTemperature || "");
    formData.append('ProvidedSymptoms.Scratch', String(symptoms.scratch));
    formData.append('ProvidedSymptoms.Bruise', String(symptoms.bruise));
    formData.append('ProvidedSymptoms.Rash', String(symptoms.rash));
    formData.append('ProvidedSymptoms.Swelling', String(symptoms.swelling));
    formData.append('ProvidedSymptoms.Lethargic', String(symptoms.lethargic));
    formData.append('ProvidedSymptoms.Nausea', String(symptoms.nausea));
    formData.append('ProvidedSymptoms.DrySkin', String(symptoms.drySkin));
    formData.append('ProvidedSymptoms.Tattoo', String(symptoms.tattoo));
    formData.append('ProvidedSymptoms.PourHygiene', String(symptoms.pourHygiene));
    formData.append('ProvidedSymptoms.DirtyDiapers', String(symptoms.dirtyDiapers));
    formData.append('ProvidedSymptoms.PreviousDayClothes', String(symptoms.previousDayClothes));

    formData.append('Other', other || "");
    formData.append('Description', description || "");


    fetch(`${backEndCodeURLLocation}HealthCheck/SubmitClientHealthInfo`, {
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

    navigate("/cbsAddOrTransferClientsToRooms", { replace: true });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
          <h4>&#128198; {new Date().toLocaleDateString()}</h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={ChildLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{clientFullName}</h4>
          </div>

        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
          <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={StaffLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{staffFullName}</h4>
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


            <div style={{ marginTop: "15px" }}>
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
                    <input id="scratch" type="checkbox" name="scratch" checked={symptoms.scratch} onChange={handleCheckboxChange} className="checkBoxSize" />
                    <label htmlFor="scratch" style={{ marginLeft: "15px" }}> Scratch</label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input id="bruise" type="checkbox" name="bruise" checked={symptoms.bruise} onChange={handleCheckboxChange} className="checkBoxSize" />
                    <label htmlFor="bruise" style={{ marginLeft: "15px" }}>Bruise</label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input id="rash" type="checkbox" name="rash" checked={symptoms.rash} onChange={handleCheckboxChange} className="checkBoxSize" />
                    <label htmlFor="rash" style={{ marginLeft: "15px" }}>Rash</label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input id="swelling" type="checkbox" name="swelling" checked={symptoms.swelling} onChange={handleCheckboxChange} className="checkBoxSize" />
                    <label htmlFor="swelling" style={{ marginLeft: "15px" }}>Swelling</label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input id="drySkin" type="checkbox" name="drySkin" checked={symptoms.drySkin} onChange={handleCheckboxChange} className="checkBoxSize" />
                    <label htmlFor="drySkin" style={{ marginLeft: "15px" }}>Dry Skin</label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <input id="other" type="checkbox" name="other" onChange={handleCheckboxChange} className="checkBoxSize" disabled={true} />
                    <label htmlFor="other" style={{ marginLeft: "15px" }}>Other</label>
                    <input type="text" style={{ width: "150px", marginLeft: "20px" }} onChange={(event) => setOther(event.target.value)}></input>
                  </div>
                </div>
                <hr style={{ marginTop: "35px" }} />
                <div style={{ fontSize: "25px", marginTop: "25px" }}>
                  <span style={{ fontSize: "25px", marginTop: "25px" }}>Temperature:
                    <input onChange={(event) => setClientTemperature(event.target.value)} type='number' style={{ width: "100px", height: "35px", textAlign: "center", marginLeft: "10px" }}></input>
                    <span style={{ marginLeft: "10px" }}>&#8457;</span>
                  </span>
                  <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="lethargic" type="checkbox" name="lethargic" checked={symptoms.lethargic} onChange={handleCheckboxChange} className="checkBoxSize" />
                      <label htmlFor="lethargic" style={{ marginLeft: "15px" }}> Lethargic</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="nausea" type="checkbox" name="nausea" checked={symptoms.nausea} onChange={handleCheckboxChange} className="checkBoxSize" />
                      <label htmlFor="nausea" style={{ marginLeft: "15px" }}>Nausea</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="pourHygiene" type="checkbox" name="pourHygiene" checked={symptoms.pourHygiene} onChange={handleCheckboxChange} className="checkBoxSize" />
                      <label htmlFor="pourHygiene" style={{ marginLeft: "15px" }}>Poor Hygiene</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="dirtyDiapers" type="checkbox" name="dirtyDiapers" checked={symptoms.dirtyDiapers} onChange={handleCheckboxChange} className="checkBoxSize" />
                      <label htmlFor="dirtyDiapers" style={{ marginLeft: "15px" }}>Dirty Diapers</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="tattoo" type="checkbox" name="tattoo" checked={symptoms.tattoo} onChange={handleCheckboxChange} className="checkBoxSize" />
                      <label htmlFor="tattoo" style={{ marginLeft: "15px" }}>Tattoo</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="previousDayClothes" type="checkbox" name="previousDayClothes" checked={symptoms.previousDayClothes} onChange={handleCheckboxChange} className="checkBoxSize" />
                      <label htmlFor="previousDayClothes" style={{ marginLeft: "15px" }}>Previous Day Clothes</label>
                    </div>
                  </div>
                </div>

                <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "100px", marginTop: "50px", fontSize: "20px" }} onChange={(event) => setDescription(event.target.value)}></textarea>


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
                      {file && <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} style={{ border: "1px", width: "105px", height: "105px", borderRadius: "25px", marginLeft: "25px" }} />}
                    </div>
                  ))}
                </div>
                <div style={{ width: "100%", textAlign: "center", marginTop: "25px" }} >
                  <button disabled={!selectedBodyPart || !selectedFrontOrBack} style={{ width: "150px", height: "60px", fontSize: "25px" }} className="btn btn-primary" type="button" onClick={uploadImage}>Submit</button>
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