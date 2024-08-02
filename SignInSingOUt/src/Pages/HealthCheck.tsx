import React, { useState, useEffect } from "react";
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import ChildLogo from '../../src/assets/child.png';
import StaffLogo from '../../src/assets/person.png';
import HumanBody from "./HumanBody.tsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopupHealthCheckView from '../Components/PopupHealthCheckView.tsx'
import { jwtDecode } from "jwt-decode";

interface ClientHealthInfo {
  id: number;
  clientID: number;
  dateOfSubmission: string;
  location: string;
  type: string;
}

interface CurrentAndPreviousClientHealthInfo {
  previousDayHealthInfo: ClientHealthInfo[];
  currentDayHealthInfo: ClientHealthInfo[];
}

interface DecodedToken {
  StaffID: string;
  Location: string;
}


const HealthCheck: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientID, clientFullName, staffFullName } = location.state || {};
  const [showModel, setShowModel] = useState<boolean>(false);
  const [isPreviousDayHealthCondition, setIsPreviousDayHealthCondition] = useState<boolean>(false);
  const [id, setID] = useState<number | null>(null);

  const [clientPreviousDaysHealthInfo, setClientPreviousDaysHealthInfo] = useState<ClientHealthInfo[]>([]);
  const [clientCurrentDaysHealthInfo, setClientCurrentDaysHealthInfo] = useState<ClientHealthInfo[]>([]);
  const [didItRenderHealthCheck, setDidItRenderHealthCheck] = useState<boolean>(false);

  useEffect(() => {
    setDidItRenderHealthCheck(true);
  }, []);

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
          alert("Error Getting Data");
          navigate("/", { replace: true });
          return;
        }

        const data: CurrentAndPreviousClientHealthInfo = await response.json();
        setClientPreviousDaysHealthInfo(data.previousDayHealthInfo);
        setClientCurrentDaysHealthInfo(data.currentDayHealthInfo);
        setDidItRenderHealthCheck(true);
      } catch (error) {
        alert("Error Getting Data");
        navigate("/", { replace: true });
        return;
      }
    };

    fetchData();

  }, [didItRenderHealthCheck]);

  const MoveHealthCheckToCurrentDate = async (id: number, isPreviousDayCondition: boolean) => {
    try {
      setID(id);
      setShowModel(true);

      if (isPreviousDayCondition === true)
        setIsPreviousDayHealthCondition(true);
      else
        setIsPreviousDayHealthCondition(false);

    } catch (error) {
      alert("Error fetching data: " + error);
    }
  };



  const AddHealthInfo = async () => {
    navigate("/HealthCheckSelectedRegion", {
      replace: true,
      state: { clientID, clientFullName, staffFullName },
    });
  }

  const clientHasNoHealthIssuesToday = async () => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log In");
        navigate("/", { replace: true });
        return;
      }
      
      const decoded = jwtDecode(token) as DecodedToken;
      const staffID = decoded.StaffID;

      const response = await fetch(`${backEndCodeURLLocation}HealthCheck/ClientHasNoHealthIssues?clientID=${clientID}&staffID=${staffID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/cbsAddOrTransferClientsToRooms", { replace: true });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. Response status: ${response.status}`
        );
      }


    } catch (error) {
      alert("Error fetching data: " + error);
    }
  };

  // const clientRefusedHealthCheck = async () => {
  //   try {

  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("Please log In");
  //       navigate("/", { replace: true });
  //       return;
  //     }
      
  //     const decoded = jwtDecode(token) as DecodedToken;
  //     const staffID = decoded.StaffID;

  //     const response = await fetch(`${backEndCodeURLLocation}HealthCheck/ClientRefusedHealthCheck?clientID=${clientID}&staffID=${staffID}`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     navigate("/cbsAddOrTransferClientsToRooms", { replace: true });

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch data. Response status: ${response.status}`
  //       );
  //     }


  //   } catch (error) {
  //     alert("Error fetching data: " + error);
  //   }
  // };

  const StaffGoesBackToMainPage = async () => {


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
            {/* <h2 style={{ textAlign: "center" }}>Health Check</h2> */}
            <div className="card" style={{ width: "700px", alignItems: "center", minHeight: "150px" }}>
              <div className="card-body">
                <div>
                  <form>
                    <div className='grid-container-For-bodies' >
                      <div style={{ borderRight: "solid", marginTop: "20px" }} >
                        <h3>Previous</h3>
                        {didItRenderHealthCheck === true &&
                          <HumanBody clientID={clientID} IsPreviousDay={true} clientFullName={clientFullName} staffFullName={staffFullName} />
                        }
                      </div>
                      <div style={{ borderLeft: "solid", marginTop: "20px" }}>
                        <h3>Today</h3>
                        {didItRenderHealthCheck === true &&
                          <HumanBody clientID={clientID} IsPreviousDay={false} clientFullName={clientFullName} staffFullName={staffFullName} />
                        }
                      </div>
                    </div>
                    <div className='grid-container-For-bodies' style={{ marginTop: "25px", height: "250px" }}>
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
                                <tr key={index} onClick={() => MoveHealthCheckToCurrentDate(item.id, true)}>
                                  {/* <tr key={index}> */}
                                  <td style={{ width: "250px" }}>{item.dateOfSubmission}</td>
                                  <td style={{ width: "250px" }}>{item.location}</td>
                                  <td style={{ width: "250px" }}>{item.type}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={3}>No Health Issues Recorded</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className='grid-container-For-bodies' style={{ marginTop: "0px", height: "250px", marginLeft: "15px" }}>
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
                                  <tr key={index} onClick={() => MoveHealthCheckToCurrentDate(item.id, false)}>
                                    <td style={{ width: "250px" }}>{item.dateOfSubmission}</td>
                                    <td style={{ width: "250px" }}>{item.location}</td>
                                    <td style={{ width: "250px" }}>{item.type}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3}>Currently No Health Issues</td>
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
            <div style={{ textAlign: "center", marginTop: "25px", pointerEvents: staffFullName !== null ? "auto" : "none", opacity: staffFullName !== null ? "1" : ".2"}}>
              <button className="add-button-class" style={{ marginRight: "15px" }} onClick={() => AddHealthInfo()}>+ ADD</button>
              <button className="add-button-class" style={{ marginLeft: "15px" }} onClick={() => clientHasNoHealthIssuesToday()}>No Issues</button>
              {/* <button className="refuse_health_check_button_class" style={{ marginLeft: "15px" }} onClick={() => clientRefusedHealthCheck()}>Refuse</button> */}
              <button className="add-button-class" style={{ marginLeft: "15px" }} onClick={() => StaffGoesBackToMainPage()}>Cancel</button>
            </div>

          </div>

        </div>
        {id !== null && (
          <PopupHealthCheckView showModel={showModel} setShowModel={setShowModel} id={id} isPrevious={isPreviousDayHealthCondition} clientID={clientID} />
        )}
      </div>
    </>
  );
};

export default HealthCheck;