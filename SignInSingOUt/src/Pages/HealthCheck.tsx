import React, { useState } from "react";
import TimeOutLogo from '../../src/assets/timeout.png';
import Location from '../../src/assets/location.png';
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";
import Camera from '../../src/assets/camera.png';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BodyComponent } from "reactjs-human-body";

// Define the component
const HealthCheck: React.FC = () => {

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
                  <form>
                    <div className='grid-container-For-bodies' style={{ marginTop: "20px" }}>
                    <BodyComponent
                      partsInput={{
                        head: { show: true },
                        leftShoulder: { show: true },
                        rightShoulder: { show: true },
                        leftArm: { show: true },
                        rightArm: { show: true },
                        chest: { show: true },
                        stomach: { show: true },
                        leftLeg: { show: true },
                        rightLeg: { show: true },
                        leftHand: { show: true },
                        rightHand: { show: true },
                        leftFoot: { show: true },
                        rightFoot: { show: true }
                      }}
                    />
                      <BodyComponent
                      partsInput={{
                        head: { show: true },
                        leftShoulder: { show: true },
                        rightShoulder: { show: true },
                        leftArm: { show: true },
                        rightArm: { show: true },
                        chest: { show: true },
                        stomach: { show: true },
                        leftLeg: { show: true },
                        rightLeg: { show: true },
                        leftHand: { show: true },
                        rightHand: { show: true },
                        leftFoot: { show: true },
                        rightFoot: { show: true }
                      }}
                    />
                    </div>

                    
                    <button type="button" onClick={uploadImage}>ADD+</button>
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

export default HealthCheck;