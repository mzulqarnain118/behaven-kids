import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  isChecked: boolean; // Add isChecked property
}

const ChooseWhichChildren: React.FC = () => {
  const location = useLocation();
  const parentFourDigitPin = location.state?.parentFourDigitPin;

  const [childrenInfo, setChildrenInfo] = useState<ChildInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const url = `${backEndCodeURLLocation}SignIn/GetParentsChildrenInfo?parentPinID=${parentFourDigitPin}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const childrenData: ChildInfo[] = data.map(
          (item: { clientInfo: ClientInfo }) => ({
            childId: item.clientInfo.clientID,
            ChildFirstName: item.clientInfo.firstName,
            ChildLastName: item.clientInfo.lastName,
            isChecked: false, // Initialize isChecked to false for each child
          })
        );

        setChildrenInfo(childrenData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parentFourDigitPin]);

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
        await signInClient(child.childId, token);
        console.log("All sign-ins submitted successfully");
      }
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
          <div className="card-body">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
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
              {info.ChildFirstName} {info.ChildLastName}
            </div>

            <div style={{ textAlign: "right" }}>
              <span>Signed In Time: </span>
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
