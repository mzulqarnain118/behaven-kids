import React, { useState, useEffect } from "react";
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";
import ChildLogo from '../../src/assets/child.png';
import StaffLogo from '../../src/assets/person.png';
import HumanBody from "./HumanBody.tsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface PreviousDayInfo {
  clientID: number;
  dateOfSubmission: string;
  selectedBodyPart: string;
}

const HealthCheck: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientID, clientFullName } = location.state || {};

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [clientPreviousDaysHealthInfo, setClientPreviousDaysHealthInfo] = useState<PreviousDayInfo[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log In");
          navigate("/", { replace: true });
          return;
        }

        const response = await fetch(`${backEndCodeURLLocation}HealthCheck/GetClientPreviousAndCurrentDayHealthInfo?clientID=${clientID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data. Response status: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("data ", data);
        setClientPreviousDaysHealthInfo(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



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
                      <div style={{ borderRight: "solid", marginTop: "20px" }} >
                        <h3>Previous</h3>
                        <HumanBody />
                      </div>
                      <div style={{ borderLeft: "solid", marginTop: "20px" }}>
                        <h3>Today</h3>
                        <HumanBody />
                      </div>
                    </div>
                    <div className='grid-container-For-bodies' style={{ marginTop: "25px", borderTop: "solid" }}>
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
                          {clientPreviousDaysHealthInfo.length > 0 ? (
                            clientPreviousDaysHealthInfo.map((item, index) => (
                              <tr key={index}>
                                <td style={{ width: "250px" }}>{item.dateOfSubmission}</td>
                                <td style={{ width: "250px" }}>{item.selectedBodyPart}</td>
                                {/* <td style={{ width: "250px" }}>{item.Type}</td> */}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>No data available</td>
                            </tr>
                          )}
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