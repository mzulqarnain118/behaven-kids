import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap"; // Import Button component from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import PopupTemporaryPin from "../Components/PopupTemporaryPin";
import "./CSS/ChooseWhichChildren.css";

interface Parent {
  parentID: number;
  parentFirstName: string;
  parentLastName: string;
}

const ReceptionistGivesTemporaryPinToParent: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [parentFullName, setParentFullName] = useState<string>("");
  const [parentTemporaryPin, setParentTemporaryPin] = useState<string>("");

  useEffect(() => {
    fetchAllParentTemporaryPin();
  }, []);

  const fetchAllParentTemporaryPin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in localStorage");

      const url = `${backEndCodeURLLocation}SignIn/GetAllParentsWhoNeedsToGetTemporaryPin`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(
          `Failed to fetch data. Response status: ${response.status}`
        );

      const data = await response.json();
      setParents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const OpenPopUp = async (parentFirstName: string, parentLastName: string, parentID: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in localStorage");

      const url = `${backEndCodeURLLocation}SignIn/ReceptionistGetsVerificationCode?parentID=${parentID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(
          `Failed to fetch data. Response status: ${response.status}`
        );

      const parentTemporaryPin = await response.text();
      setParentTemporaryPin(parentTemporaryPin);
      
      setShowModel(true)
      setParentFullName(parentFirstName + " " + parentLastName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
     <div
        className="card"
        style={{
          width: "750px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
         <div className="card-body">
         <div className="parentInfoGridContainer">
              <div className="form-group parentGridContaineritem">
              <h3>Select a parent: </h3>
          {parents.map((parent) => (
            <Button
              key={parent.parentID}
              variant="primary"
              onClick={() => {
                OpenPopUp(parent.parentFirstName, parent.parentLastName, parent.parentID)
              }}
              style={{height: "75px", width: "150px", fontSize: "20px"}}
            >
              {parent.parentFirstName} {parent.parentLastName}
            </Button>
          ))}
        </div>
        <PopupTemporaryPin showModel={showModel} setShowModel={setShowModel} parentFullName={parentFullName} parentTemporaryPin={parentTemporaryPin}/>
      </div>
      </div> 
      </div>
      </div>
    </>
  );
};

export default ReceptionistGivesTemporaryPinToParent;
