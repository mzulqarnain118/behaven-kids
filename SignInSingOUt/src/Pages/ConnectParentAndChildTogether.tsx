import React, { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import { backEndCodeURLLocation } from "../config";
import Select from "react-select";

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
  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [parentInfo, setParentInfo] = useState<ParentInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("");

  const options = parentInfo.map((parent) => ({
    value: parent.parentID,
    label: `${parent.parentFirstName} ${parent.parentLastName}`,
  }));
  const [selectedParent2, setSelectedParent2] = useState<{
    value: number;
    label: string;
  } | null>(null);

  useEffect(() => {
    fetchParentData();
    fetchChildData();
  }, []);

  useEffect(() => {
    handleParentChange2();
  }, [selectedParent2]);

  const handleParentChange2 = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in localStorage");

      const url = `${backEndCodeURLLocation}SignIn/GetAlreadyConnectedParentWithChild?parentID=${selectedParent2?.value}`;
      console.log(url);
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
      const updatedChildInfo = childInfo.map((child) => ({
        ...child,
        isChecked: data.includes(child.clientID),
      }));
      setChildInfo(updatedChildInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchParentData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in localStorage");

      const url = `${backEndCodeURLLocation}SignIn/GetParentInfo`;

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
      setParentInfo(data);
    } catch (error) {
      console.error("Error fetching parent data:", error);
    }
  };

  const fetchChildData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in localStorage");

      const url = `${backEndCodeURLLocation}SignIn/GetClientInformation`;

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

      const data: ChildInfo[] = await response.json();

      // Sort the data by clientFirstName before setting it into the state variable
      const sortedData = data.sort((a, b) => {
        // Adjust the sorting logic according to your requirements
        return a.clientFirstName.localeCompare(b.clientFirstName);
      });

      setChildInfo(sortedData);
    } catch (error) {
      console.error("Error fetching child data:", error);
    }
  };

  const handleSubmit = async () => {
    const selectedChildren = childInfo.filter((child) => child.isChecked);
    const clientIDs = selectedChildren.map((child) => child.clientID);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/ConnectChildWithParent?parentID=${selectedParent2?.value}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientIDs),
        }
      );
      if (!response.ok) {
        console.error(
          `Failed to post data for client ID ${parentInfo}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID ${parentInfo}:`, error);
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

  // Function to filter childInfo based on search query
  const filteredChildInfo = childInfo.filter((child) =>
    `${child.clientFirstName} ${child.clientLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Function to filter childInfo based on search query

  // Function to sort childInfo based on sortField and sortOrder
  const sortedChildInfo = [...filteredChildInfo].sort((a, b) => {
    const fieldValueA = a[sortField as keyof ChildInfo];
    const fieldValueB = b[sortField as keyof ChildInfo];

    if (fieldValueA > fieldValueB) return sortOrder === "asc" ? -1 : 1;
    if (fieldValueA < fieldValueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
                <div>
                  <Select options={options} onChange={setSelectedParent2} />
                </div>
              </div>
              <div>
                <label>Search Children By Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                {filteredChildInfo.length > 0 ? (
                  <div className="list-group">
                    <div className="list-group-item list-group-item-dark d-flex">
                      <span className="flex-grow-1"></span>
                      <span className="flex-grow-1">
                        First Name
                        <button
                          className="btn btn-link"
                          onClick={() => handleSort("clientFirstName")}
                        >
                          &#8645;
                        </button>
                      </span>

                      <span className="flex-grow-1">
                        Last Name
                        <button
                          className="btn btn-link"
                          onClick={() => handleSort("clientLastName")}
                        >
                          &#8645;
                        </button>
                      </span>
                      <span className="flex-grow-1">
                        Location ID
                        <button
                          className="btn btn-link"
                          onClick={() => handleSort("locationID")}
                        >
                          &#8645;
                        </button>
                      </span>
                    </div>
                    <div style={{ height: "200px", overflowY: "auto" }}>
                      {sortedChildInfo.map((info, index) => (
                        <div key={index} className="list-group-item d-flex">
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            value=""
                            checked={info.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <div
                            className="flex-grow-1"
                            style={{ marginLeft: "20px", width: "100%" }}
                          >
                            {info.clientFirstName}
                          </div>
                          <div
                            className="flex-grow-1"
                            style={{ marginLeft: "10px", width: "100%" }}
                          >
                            {info.clientLastName}
                          </div>
                          <div
                            className="flex-grow-1"
                            style={{ width: "100%" }}
                          >
                            {info.locationID}
                          </div>
                        </div>
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
