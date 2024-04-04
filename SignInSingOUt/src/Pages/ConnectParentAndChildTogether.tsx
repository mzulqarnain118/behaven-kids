import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";

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

  useEffect(() => {
    console.log(childInfo);
  }, [childInfo]);

  useEffect(() => {
    const fetchData = async () => {
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

        console.log(data);
        setParentInfo(data);

        //   navigate("/", { replace: true });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // console.log("Parent Info:", parentInfo);
    // const token = localStorage.getItem("token");
    // try {
    //   console.log(`${backEndCodeURLLocation}SignIn/AddParentGuardianDetail?firstName=${parentInfo.firstName}&lastName=${parentInfo.lastName}&phoneNumber=${parentInfo.PhoneNumber}&fourDigitPin=${parentInfo.pin}`);
    //   const response = await fetch(
    //     `${backEndCodeURLLocation}SignIn/AddParentGuardianDetail?firstName=${parentInfo.firstName}&lastName=${parentInfo.lastName}&phoneNumber=${parentInfo.PhoneNumber.substring(1)}&fourDigitPin=${parentInfo.pin}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //         // Add any additional headers if required
    //       },
    //       body: JSON.stringify({ parentInfo }),
    //     }
    //   );
    //   if (!response.ok) {
    //     console.error(
    //       `Failed to post data for client ID ${parentInfo}:`,
    //       response.statusText
    //     );
    //   }
    // } catch (error) {
    //   console.error(`Error posting data for client ID ${parentInfo}:`, error);
    // }
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
              <div className="btn-group">
                <ul className="dropdown-menu">
                  {parentInfo.map((parent) => (
                    <li className="dropdown-item">
                      {parent.parentFirstName}
                      {parent.parentLastName}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label>Select Parent:</label>
                <select>
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
