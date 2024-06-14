import React, { useState } from "react";
import TimeOutLogo from '../../src/assets/timeout.png';
import Location from '../../src/assets/location.png';
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";
import Camera from '../../src/assets/camera.png';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [clientTemperature, setClientTemperature] = useState<string>();
  const [other, setOther] = useState<string>();
  const [description, setDescription] = useState<string>();
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

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
          <h4>&#128198; {new Date().toLocaleDateString()}</h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={TimeOutLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            {/* <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomName}</h4> */}
          </div>

        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
          <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={Location} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
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
            <h2 style={{ textAlign: "center" }}>Health Check</h2>
            <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}>
              <div className="card-body">
                <div>
                  <span style={{ fontSize: "30px" }}>Temperature: <input onChange={(event) => setClientTemperature(event.target.value)} type='text' style={{ width: "100px", textAlign: "center" }}></input>&#8457;</span>
                  <form>
                    <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Scratch" type="checkbox" name="Scratch" checked={symptoms.Scratch} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Scratch" style={{ marginLeft: "10px", marginBottom: "5px" }}> Scratch</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Dizziness" type="checkbox" name="Dizziness" checked={symptoms.Dizziness} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Dizziness" style={{ marginLeft: "10px", marginBottom: "5px" }}> Dizziness</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Bruise" type="checkbox" name="Bruise" checked={symptoms.Bruise} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Bruise" style={{ marginLeft: "10px", marginBottom: "5px" }}>Bruise</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="HeavyBreath" type="checkbox" name="HeavyBreath" checked={symptoms.HeavyBreath} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="HeavyBreath" style={{ marginLeft: "10px", marginBottom: "5px" }}>Heavy Breath</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Tiredness" type="checkbox" name="Tiredness" checked={symptoms.Tiredness} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Tiredness" style={{ marginLeft: "10px", marginBottom: "5px" }}>Tiredness</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Rash" type="checkbox" name="Rash" checked={symptoms.Rash} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Rash" style={{ marginLeft: "10px", marginBottom: "5px" }}>Rash</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Swelling" type="checkbox" name="Swelling" checked={symptoms.Swelling} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Swelling" style={{ marginLeft: "10px", marginBottom: "5px" }}>Swelling</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input id="Nausea" type="checkbox" name="Nausea" checked={symptoms.Nausea} onChange={handleCheckboxChange} style={{ marginLeft: "10px", transform: "scale(2.2)" }} />
                        <label htmlFor="Nausea" style={{ marginLeft: "10px", marginBottom: "5px" }}>Nausea</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "25px" }}>
                        <label htmlFor="Other" style={{ fontSize: "40px" }}>Other</label>
                        <input type="text" style={{ width: "250px", marginLeft: "20px" }} onChange={(event) => setOther(event.target.value)}></input>
                      </div>
                    </div>
                    <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "250px", marginTop: "25px", fontSize: "20px" }} onChange={(event) => setDescription(event.target.value)}></textarea>


                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => setShowModel(true)}
                        style={{ backgroundColor: "DodgerBlue" }}
                      >
                        <img src={Camera}></img>
                      </button>
                      {/* {selectedImages && (
                        {selectedImages.map}
                        <img src={URL.createObjectURL(selectedImages[0])} style={{ border: "1px", width: "105px", height: "105px" }} ></img>
                      )} */}
                      {selectedImages.map((file, index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                          {file && <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} style={{ border: "1px", width: "105px", height: "105px" }}/>}
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={uploadImage}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <PopupCamera showModel={showModel} setShowModel={setShowModel} selectedImage={selectedImages} setSelectedImages={setSelectedImages} />
    </>
  );
};

export default HealthCheckSelectedRegion;