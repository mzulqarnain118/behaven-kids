import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";
import { Prev } from "react-bootstrap/esm/PageItem";

interface ParentInfo {
  parentID: number;
  parentFirstName: string;
  parentLastName: string;
  children: ChildInfo[];
}

interface ChildInfo {
  isChecked: boolean;
  clientID: number;
  clientFirstName: string;
  clientLastName: string;
  locationID: string;
}

const AddParentInfo: React.FC = () => {
  //   const [parentInfo, setParentInfo] = useState<ParentInfo>({
  //     parentID: 0,
  //     firstName: "",
  //     lastName: "",
  //     children: [],
  //   });

  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [parentInfo, setParentInfo] = useState<ParentInfo[]>([]);
  const [selectedParent, setSelectedParent] = useState<string>();

  useEffect(() => {
    // console.log(childInfo);
  }, [childInfo]);

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const url = `${backEndCodeURLLocation}SignIn/GetParentInfo`;

        const response = await fetch(url, {
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

        // console.log(data);
        setParentInfo(data);

        //   navigate("/", { replace: true });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchParentData();
  }, []);

  const fetchChildData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const url = `${backEndCodeURLLocation}SignIn/GetClientInformation`;

      const response = await fetch(url, {
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

      setChildInfo(data);

      //   navigate("/", { replace: true });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchChildData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(selectedParent);
    e.preventDefault();

    const updatedChildrenInfo = [...childInfo];
    const clientIDs = updatedChildrenInfo
  .filter(child => child.isChecked) // Filter checked children
  .map(child => child.clientID); // Extract clientIDs from checked children
console.log(clientIDs);
    console.log(clientIDs);

    for (let i = 0; i < updatedChildrenInfo.length; i++) {
      const item = updatedChildrenInfo[i];
      if (item.isChecked === true) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `${backEndCodeURLLocation}SignIn/ConnectChildWithParent?clientID=${item.clientID}&parentID=${selectedParent}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                // Add any additional headers if required
              },
              body: JSON.stringify( clientIDs ),
            }
          );
          if (!response.ok) {
            console.error(
              `Failed to post data for client ID ${parentInfo}:`,
              response.statusText
            );
          }
        } catch (error) {
          console.error(
            `Error posting data for client ID ${parentInfo}:`,
            error
          );
        }
      }
    }
  };


  const handleParentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedParentID = e.target.value;
    setSelectedParent(selectedParentID);
     
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const url = `${backEndCodeURLLocation}SignIn/GetAlreadyConnectedParentWithChild?parentID=${selectedParentID}`;

      const response = await fetch(url, {
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

      const updatedChildrenInfo = [...childInfo];

      for (let i = 0; i < updatedChildrenInfo.length; i++) {
        updatedChildrenInfo[i].isChecked = false;
      }
      
      setChildInfo([]);
      for (let i = 0; i < data.length; i++) {
        let getClientID = data[i];
        for (let j = 0; j < updatedChildrenInfo.length; j++) {
          const item = updatedChildrenInfo[j];
          if (getClientID === item.clientID) {
            console.log("here = " + i);
            item.isChecked = true;
            break; // Break the inner loop since we found a match
          }
          // else {
          //   item.isChecked = false;
          // }
        }
      }
      // setChildInfo(data);
      setChildInfo(prev => prev = updatedChildrenInfo);

      //   navigate("/", { replace: true });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setChildInfo((prevState) => {
      const updatedChildInfo = [...prevState];
      updatedChildInfo[index] = {
        ...updatedChildInfo[index],
        isChecked: !updatedChildInfo[index].isChecked,
      };
      return updatedChildInfo;
    });
  };

  const handleDropdownChange = (selectedParent: number) => {
    // Do something with the selectedParent, such as updating state or making an API call
    console.log("hello");

    console.log("Selected Parent:", selectedParent);
  };

  return (
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
          <h2>Connect parent with children</h2>
          <form onSubmit={handleSubmit}>
            <div className="parentInfoGridContainer">
              <div>
                <label>Select Parent:</label>
                <select value={selectedParent} onChange={handleParentChange}>
                  <option value="">Select Parent</option>
                  {parentInfo.map((parent) => (
                    <option key={parent.parentID} value={parent.parentID}>
                      {parent.parentFirstName} {parent.parentLastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {childInfo !== null ? (
                  <div className="list-group">
                    <div className="list-group-item list-group-item-dark d-flex">
                      <span className="flex-grow-1">Client ID</span>
                      <span className="flex-grow-1">First Name</span>
                      <span className="flex-grow-1">Last Name</span>
                      <span className="flex-grow-1">Location ID</span>
                    </div>
                    <div style={{ height: "200px", overflowY: "auto" }}>
                      {childInfo.map((info, index) => (
                        <label key={index} className="list-group-item d-flex">
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            value=""
                            checked={info.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <p className="flex-grow-1"> {info.clientID}</p>
                          <p className="flex-grow-1"> {info.clientFirstName}</p>
                          <p className="flex-grow-1"> {info.clientLastName}</p>
                          <p className="flex-grow-1"> {info.locationID}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No child information available</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddParentInfo;
