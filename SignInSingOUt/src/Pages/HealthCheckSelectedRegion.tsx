import React, { useState, useRef } from "react";
import TimeOutLogo from '../../src/assets/timeout.png';
import Location from '../../src/assets/location.png';
import './CSS/HealthCheck.css'
import Webcam from "react-webcam";

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const webcamRef = useRef<Webcam>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "photo.png", { type: "image/png" });
            setSelectedImage(file);
          })
          .catch((error) => console.error("Error converting image:", error));
      }
    }
  };

  const videoConstraints = {
    facingMode: { exact: "environment" }
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
            <div style={{ display: "flex", justifyContent: "center"}}>
                <div className="card"
                    style={{
                        width: "750px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="card-body">
                    <h3 style={{textAlign: "center"}}>Health Check</h3>
                        <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}>
                            <div className="card-body"> 
                                <div>
                                    <span>Temperature: <input type='text' style={{width: "100px"}}></input> F</span>
                                    <form>
                                        <div className='grid-container-For-selected'>
                                            <div>
                                                <input type="checkbox" name="Scratch" value="Scratch"/>
                                                <label htmlFor="vehicle1"> Scratch</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="Dizziness" value="Dizziness"/>
                                                <label htmlFor="Dizziness"> Dizziness</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="Bruise" value="Bruise"/>
                                                <label htmlFor="Bruise">Bruise</label>
                                            </div>
                                        </div>
                                        <textarea id="w3review" name="w3review" rows={4} cols={88}></textarea>
                                        
                                    </form>
                                </div>
                            </div> 
                        </div>
                    </div>

                </div>

                <div>
                <label htmlFor="parentImage" style={{ fontSize: "20px" }}>Choose an image from file computer: </label>
                <input
                  style={{ fontSize: "20px" }}
                  type="file"
                  accept="image/*"
                  id="parentImage"
                  onChange={handleImageSelect}
                />
              </div>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{ width: "200px", height: "auto" }}
                />
              )}
  
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => setCameraActive(!cameraActive)}
              >
                {cameraActive ? "Turn Off Camera" : "Turn On Camera"}
              </button>
              {cameraActive && (
                <div className="form-group parentGridContaineritem">
                  <label htmlFor="parentCamera">Take Picture</label>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
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
              )}
            </div>
    </>
  );
};

export default HealthCheckSelectedRegion;