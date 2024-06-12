import React, { useState, useRef } from "react";
import TimeOutLogo from '../../src/assets/timeout.png';
import Location from '../../src/assets/location.png';
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import axios from "axios";
import PopupCamera from "../Components/PopupCamera";
import Camera from '../../src/assets/camera.png'

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [clientTemperature, setClientTemperature] = useState<string>();
  const [symptoms, setSymptoms] = useState({
    Scratch: false,
    Dizziness: false,
    Bruise: false,
    HeavyBreath: false,
    Tireness: false,
    Rash: false,
    Swollen: false
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
    // if (!selectedImage) {
    //   console.error("No image selected for upload.");
    //   return;
    // }

    const formData = new FormData();
    if (selectedImage) {
        formData.append("image", selectedImage);
    }

    if (clientTemperature) {
      formData.append("temperature", clientTemperature);
    }

    const HealthCheckFullInfoDTO = {
      Image: selectedImage,
      ProvidedSymptoms: symptoms,
      Temperature: clientTemperature
    };

    console.log(HealthCheckFullInfoDTO);

    // axios.post(`${backEndCodeURLLocation}HealthCheck/testing`, formData)
    //   .then(response => {
    //     console.log("Success:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    const token = localStorage.getItem("token");

    fetch(`${backEndCodeURLLocation}HealthCheck/testing`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(HealthCheckFullInfoDTO),
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
                  <span style={{ fontSize: "30px" }}>Temperature: <input onChange={(event) => setClientTemperature(event.target.value)}  type='text' style={{ width: "100px", textAlign: "center" }}></input> F</span>
                  <form>
                    <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                      <div>
                        <input type="checkbox" name="Scratch" checked={symptoms.Scratch} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Scratch"> Scratch</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Dizziness" checked={symptoms.Dizziness} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Dizziness"> Dizziness</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Bruise" checked={symptoms.Bruise} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Bruise">Bruise</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Heavy Breath" checked={symptoms.HeavyBreath} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Heavy Breath">Heavy Breath</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Heavy Breath" checked={symptoms.Tireness} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Tireness">Tireness</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Heavy Breath" checked={symptoms.Rash} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Rash">Rash</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Heavy Breath" checked={symptoms.Swollen} onChange={handleCheckboxChange} style={{ width: "30px", transform: "scale(1.5)" }} />
                        <label htmlFor="Swollen">Swollen</label>
                      </div>
                      <div>
                        <label htmlFor="Other">Other</label>
                        <input type="text" style={{ width: "250px", marginLeft: "20px" }}></input>
                      </div>
                    </div>
                    <textarea id="w3review" name="w3review" style={{ width: "79vw", height: "250px", marginTop: "25px" }}></textarea>
                    {selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        style={{ width: "200px", height: "auto" }}
                      />
                    )} 

                    <button
                      type="button"
                      onClick={() => setShowModel(true)}

                    >
                      <img src={Camera} style={{backgroundColor: "white"}}></img>
                    </button>
                    {/* {cameraActive && (
                      <div className="form-group parentGridContaineritem">
                        <label htmlFor="parentCamera">Take Picture</label>
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          // videoConstraints={videoConstraints}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleCapture}
                        >
                          Capture
                        </button>
                      </div>
                    )} */}
                    <button type="button" onClick={uploadImage}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <PopupCamera showModel={showModel} setShowModel={setShowModel} selectedImage={selectedImage} setSelectedImage={setSelectedImage} /> 
    </>
  );
};

export default HealthCheckSelectedRegion;