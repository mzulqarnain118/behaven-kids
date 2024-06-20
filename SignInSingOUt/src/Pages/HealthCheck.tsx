import React, { useState, useEffect } from "react";
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";
import ChildLogo from '../../src/assets/child.png';
import StaffLogo from '../../src/assets/person.png';
import HumanBody from "./HumanBody.tsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

interface ClientHealthInfo {
  id: number;
  clientID: number;
  dateOfSubmission: string;
  location: string;
  type: string;
}

interface CurrentAndPreviousClientHealthInfo
{
  previousDayHealthInfo: ClientHealthInfo[];
  currentDayHealthInfo: ClientHealthInfo[];
}

const HealthCheck: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientID, clientFullName } = location.state || {};

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [clientPreviousDaysHealthInfo, setClientPreviousDaysHealthInfo] = useState<ClientHealthInfo[]>([]);
  const [clientCurrentDaysHealthInfo, setClientCurrentDaysHealthInfo] = useState<ClientHealthInfo[]>([]);

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

        const data : CurrentAndPreviousClientHealthInfo = await response.json();

        console.log("data ", data);
        setClientPreviousDaysHealthInfo(data.previousDayHealthInfo);
        setClientCurrentDaysHealthInfo(data.currentDayHealthInfo);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const MoveHealthCheckToCurrentDate = async (id : number) => {
    try {

      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div style={{backgroundColor: "white", border: "solid", width: "650px", height: "400px", padding: "15px", zIndex: "20000"}}>
              <h1>Transfer</h1>
              <h3>Does the client still have this health condition?</h3>
              <button className="btn-primary" onClick={onClose} style={{width: "150px", height: "75px", borderRadius: "25px", backgroundColor: "blue", fontSize: "25px"}}>No</button>
              <button
                onClick={() => {
                  // this.handleClickDelete();
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          );
        }
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
                        <HumanBody clientID={clientID} IsPreviousDay={true}/>
                      </div>
                      <div style={{ borderLeft: "solid", marginTop: "20px" }}>
                        <h3>Today</h3>
                        <HumanBody clientID={clientID} IsPreviousDay={false}/>
                      </div>
                    </div>
                    <div className='grid-container-For-bodies' style={{ marginTop: "25px", borderTop: "solid", height: "350px" }}>
                    <div style={{ maxHeight: "360px", overflowY: "auto" }}>
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientPreviousDaysHealthInfo.length > 0 ? (
                            clientPreviousDaysHealthInfo.map((item, index) => (
                              <tr key={index} onClick={() => MoveHealthCheckToCurrentDate(item.id)}>
                                {/* <tr key={index}> */}
                                <td style={{ width: "250px" }}>{item.dateOfSubmission}</td>
                                <td style={{ width: "250px" }}>{item.location}</td>
                                <td style={{ width: "250px" }}>{item.type}</td> 
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      </div>
                      <div className='grid-container-For-bodies' style={{ marginTop: "0px", height: "350px" }}>
                      <div style={{ maxHeight: "360px", overflowY: "auto" }}>
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
                          {clientCurrentDaysHealthInfo.length > 0 ? (
                            clientCurrentDaysHealthInfo.map((item, index) => (
                              <tr key={index}>
                                <td style={{ width: "250px" }}>{item.dateOfSubmission}</td>
                                <td style={{ width: "250px" }}>{item.location}</td>
                                <td style={{ width: "250px" }}>{item.type}</td> 
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      </div>
                      </div>
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