import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import "./CSS/ChooseWhichChildren.css";

interface ClientInfo {
  clientID: number;
  firstName: string;
  lastName: string;
}

interface ChildInfo {
  childId: number;
  ChildFirstName: string;
  ChildLastName: string;
  isChecked: boolean;
  signInTimeData: string;
  signOutTimeData?: string;
}

const ChooseWhichChildren: React.FC = () => {
  const location = useLocation();
  const parentFourDigitPin = location.state?.parentFourDigitPin;

  const [childrenInfo, setChildrenInfo] = useState<ChildInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const urlForDigitPin = `${backEndCodeURLLocation}SignIn/GetParentsChildrenInfo?parentPinID=${parentFourDigitPin}`;
        const responseForDigitPin = await fetch(urlForDigitPin, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!responseForDigitPin.ok) {
          throw new Error("Network response was not ok");
        }
        const dataForDigitPin = await responseForDigitPin.json();

        const childrenDataPromises = dataForDigitPin.map(
          async (item: { clientInfo: ClientInfo }) => {
            const signInTimeResponse = await fetchSignInTime(
              item.clientInfo.clientID,
              token
            );

            const signOutTimeResponse = await fetchSignOutTime(
              item.clientInfo.clientID,
              token
            );


            try {
              if (signInTimeResponse !== null)
              {
                const signInTimeData = await signInTimeResponse.json();

                if (signOutTimeResponse !== null)
                {
                  try {
                    const signOutTimeData = await signOutTimeResponse.json();
                  
                    return {
                      childId: item.clientInfo.clientID,
                      ChildFirstName: item.clientInfo.firstName,
                      ChildLastName: item.clientInfo.lastName,
                      isChecked: false,
                      signInTimeData: signInTimeData,
                      signOutTimeData: signOutTimeData
                    };
                  } catch (error)
                  {
                    return {
                      childId: item.clientInfo.clientID,
                      ChildFirstName: item.clientInfo.firstName,
                      ChildLastName: item.clientInfo.lastName,
                      isChecked: false,
                      signInTimeData: signInTimeData,
                      signOutTimeData: null
                    };
                  }
                  
                }

                return {
                  childId: item.clientInfo.clientID,
                  ChildFirstName: item.clientInfo.firstName,
                  ChildLastName: item.clientInfo.lastName,
                  isChecked: false,
                  signInTimeData: signInTimeData,
                  signOutTimeData: null
                };
              }
              
            } catch(error)
            {
              return {
                childId: item.clientInfo.clientID,
                ChildFirstName: item.clientInfo.firstName,
                ChildLastName: item.clientInfo.lastName,
                isChecked: false,
                signInTimeData: null,
              };
            }

          }
        );

        const resolvedChildrenData = await Promise.all(childrenDataPromises);
        setChildrenInfo(resolvedChildrenData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parentFourDigitPin]);

  const fetchSignInTime = async (clientID: number, token: string | null) => {
    try {
      const url = `${backEndCodeURLLocation}SignIn/GetClientSignInTime?clientID=${clientID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  };

  const fetchSignOutTime = async (clientID: number, token: string | null) => {
    try {
      const url = `${backEndCodeURLLocation}SignIn/GetClientSignOutTime?clientID=${clientID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  };

  const handleDivClick = (childId: number) => {
    setChildrenInfo((prevState) => {
      return prevState.map((child) => {
        if (child.childId === childId) {
          return { ...child, isChecked: !child.isChecked }; // Toggle isChecked for the clicked child
        }
        return child;
      });
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }
      for (const child of childrenInfo.filter((child) => child.isChecked)) {
        if (child.signInTimeData === null || child.signInTimeData === undefined)
        {
          await signInClient(child.childId, token);
          console.log("All sign-ins submitted successfully");
        }
        else
        {
          await signOutClient(child.childId, token);
          console.log("All sign-outs submitted successfully");
        }
        
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error submitting sign-ins:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInClient = async (clientID: number, token: string | null) => {
    try {
      console.log("ClientID = " + clientID);
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddClientTimeOfSignIn?clientID=${clientID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify({ clientID }),
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to post data for client ID ${clientID}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID ${clientID}:`, error);
    }
  };

  const signOutClient = async (clientID: number, token: string | null) => {
    try {
      console.log("ClientID = " + clientID);
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddClientTimeOfSignOut?clientID=${clientID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify({ clientID }),
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to post data for client ID ${clientID}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID ${clientID}:`, error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <img
        src={BehavenLogo}
        alt="Behaven Logo"
        style={{ height: "75px", marginBottom: "50px" }}
      />
      {childrenInfo.map((info) => (
        <div
          className="card"
          style={{
            width: "500px",
            textAlign: "left",
            marginBottom: "20px",
            cursor: "pointer",
          }}
          key={info.childId}
          onClick={() => handleDivClick(info.childId)}
        >
          <div
            className="card-body"
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "solid",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "20px"
              }}
            >
              <input
                type="checkbox"
                checked={info.isChecked}
                onChange={() => {}}
                style={{ marginRight: "15px", height: "15px", width: "15px" }}
              />
              <div className="circle" style={{ marginRight: "15px" }}>
                <span className="initials">
                  {info.ChildFirstName.charAt(0)}
                  {info.ChildLastName.charAt(0)}
                </span>
              </div>
              <span>
                {info.ChildFirstName} {info.ChildLastName}
              </span>
            </div>
            <div style={{ alignItems: "flex-end", marginTop: "8px" }}>
              {info.signInTimeData != null && info.signOutTimeData === null ? (
                <span style={{color: "green", fontSize: "20px"}}>&#x1F550;  ({info.signInTimeData})</span>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ChooseWhichChildren;
