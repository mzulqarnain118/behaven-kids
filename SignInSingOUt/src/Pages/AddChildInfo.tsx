import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";

const AddChildInfo: React.FC = () => {
  const [clientFirstName, setClientFirstName] = useState<string>("");
  const [clientLastName, setClientLastName] = useState<string>("");
  const [clientLocation, setClientLocation] = useState<string>("");

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

        //   navigate("/", { replace: true });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddCurrentChildIntoAbaDetail?clientFirstName=${clientFirstName}&clientLastName=${clientLastName}&locationID=${clientLocation}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to post data for client ID:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID:`, error);
    }
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
          <h2>Add Current Chient Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="parentInfoGridContainer">
              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentFirstName">First Name</label>
                <input
                  type="input"
                  style={{ height: "50px", fontSize: "25px" }}
                  className="form-control"
                  id="parentFirstName"
                  placeholder="First Name"
                  value={clientFirstName}
                  onChange={(e) => setClientFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentLastName">Last Name</label>
                <input
                  type="input"
                  className="form-control"
                  style={{ height: "50px", fontSize: "25px" }}
                  id="parentLastName"
                  placeholder="Last Name"
                  value={clientLastName}
                  onChange={(e) => setClientLastName(e.target.value)}
                  required
                />
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

export default AddChildInfo;
