import React, { useState } from "react";
import TimeOutLogo from '../../src/assets/timeout.png';
import Location from '../../src/assets/location.png';
import './CSS/HealthCheck.css'
// import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";

import HumanBody from "./HumanBody.tsx";

const HealthCheck: React.FC = () => {

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);


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
            {/* <h2 style={{ textAlign: "center" }}>Health Check</h2> */}
            <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}>
              <div className="card-body">
                <div>
                  <form>
                    <div className='grid-container-For-bodies' >
                      <div style={{borderRight: "solid", marginTop: "20px"}} >
                        <h3>Previous</h3>
                        <HumanBody />
                      </div>
                      <div style={{borderLeft: "solid", marginTop: "20px"}}>
                      <h3>Today</h3>
                        <HumanBody />
                      </div>
                    </div>
                    <div className='grid-container-For-bodies' style={{marginTop: "25px", borderTop: "solid"}}>
                    <table>
                      <thead>
                        <tr>
                          {/* <th>ID</th> */}
                          <th>Date</th>
                          <th>Location</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        </tbody>
                    </table>
                    <table>
                      <thead>
                        <tr>
                          {/* <th>ID</th> */}
                          <th>Date</th>
                          <th>Location</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        </tbody>
                    </table>
                    </div>


                    {/* <button type="button" onClick={uploadImage}>ADD+</button> */}
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