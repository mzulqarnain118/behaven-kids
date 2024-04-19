import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import moment from "moment";
import "./CSS/EditChildTime.css";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SignInSignOut {
  id: number;
  clientID: number;
  droppedInParentID: number;
  pickedOutParentID: number;
  signInTime: string;
  signOutTime: string;
  signInAndOutDate: string;
  clientFirstName: string;
  clientLastName: string;
  droppedInParentFirstName : string;
  droppedInParentLastName : string;
  pickedOutParentFirstName : string;
  pickedOutParentLastName : string;
}

interface ChildInfo {
  clientID: number;
  firstName: string;
  lastName: string;
  locationID: string;
}

interface ParentInfo {
  parentID: number;
  parentFirstName: string;
  parentLastName: string;
}

const EditChildTime: React.FC = () => {
  const [schedule, setSchedule] = useState<SignInSignOut[]>([]);
  const [selectSignOutTime, setSelectSignOutTime] = useState<string>("");
  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [parentInfo, setParentInfo] = useState<ParentInfo[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [selectedDropInOption, setSelectedDropInOption] = useState<any | null>(null);
  const [selectedWhoDropedInOutOptions, setSelectedWhoDropedInOutOptions] = useState<any[]>([]);
  const [dropInOutOptions, setDropInOutOptions] = useState<any[]>([]);
  const [selectedDropInOptions, setSelectedDropInOptions] = useState<{ [key: number]: any }>({});
  const [selectedDropOutOptions, setSelectedDropOutOptions] = useState<{ [key: number]: any }>({});



  const animatedComponents = makeAnimated();

  const options = childInfo.map((parent) => ({
    value: parent.clientID,
    label: `${parent.firstName} ${parent.lastName}`,
  }));

  // const dropInOutOptions = parentInfo.map((parent) => ({
  //   value: parent.parentID,
  //   label: `${parent.parentFirstName} ${parent.parentLastName}`,
  // }));

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const url = `${backEndCodeURLLocation}SignIn/GetAllClientInfoWhereTheClientIsNotAlreadyActive`;

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/GetAllSignInAndOutTimeOfTheDay`
      );
      if (response.ok) {
        const data = await response.json();
        data.forEach((item: SignInSignOut) => {
          item.signInTime = moment(item.signInTime, "HH:mm").format("HH:mm");
          item.signOutTime = moment(item.signOutTime, "HH:mm").format("HH:mm");
        });
        setSchedule(data);
      } else {
        console.error("Error fetching schedule:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleUpdateTime = async (
    id: number,
    field: "signInTime" | "signOutTime",
    newValue: string
  ) => {
    try {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      // Parse the input time (newValue) into hours and minutes
      const [newHours, newMinutes] = newValue.split(":").map(Number);

      // Convert both current and input times to minutes
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const newValueInMinutes = newHours * 60 + newMinutes;

      console.log("New value = " + newValue);
      console.log("Current time = " + newValueInMinutes);
      if (newValueInMinutes > currentTimeInMinutes) {
        alert("Choose a time [not greater] than the current time.");

        return;
      }

      if (field === "signInTime") {
        const [newSignInHours, newSignInMinutes] = newValue
          .split(":")
          .map(Number);

        const newSignInTime = newSignInHours * 60 + newSignInMinutes;

        const [signOutHours, signOutMinutes] = selectSignOutTime
          .split(":")
          .map(Number);

        const currentSignOutTime = signOutHours * 60 + signOutMinutes;

        if (newSignInTime > currentSignOutTime) {
          alert("[Sign In Time] Greater Than [Sign Out Time]");

          return;
        }
      }

      if (field === "signOutTime") {
        setSelectSignOutTime(() => newValue);
      }

      setSchedule((prevSchedule) =>
        prevSchedule.map((item) =>
          item.id === id ? { ...item, [field]: newValue } : item
        )
      );
    } catch (error) {
      console.error("Error updating time:", error);
    }
  };

  const handleUpdateTimeForManualTime = async (
    field: "signInTime" | "signOutTime",
    newValue: string
  ) => {
    try {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      // Parse the input time (newValue) into hours and minutes
      const [newHours, newMinutes] = newValue.split(":").map(Number);

      // Convert both current and input times to minutes
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const newValueInMinutes = newHours * 60 + newMinutes;

      console.log("New value = " + newValue);
      console.log("Current time = " + newValueInMinutes);
      if (newValueInMinutes > currentTimeInMinutes) {
        alert("Choose a time [not greater] than the current time.");

        return;
      }

      if (field === "signInTime") {
        const [newSignInHours, newSignInMinutes] = newValue
          .split(":")
          .map(Number);

        const newSignInTime = newSignInHours * 60 + newSignInMinutes;

        const [signOutHours, signOutMinutes] = selectSignOutTime
          .split(":")
          .map(Number);

        const currentSignOutTime = signOutHours * 60 + signOutMinutes;

        if (newSignInTime > currentSignOutTime) {
          alert("[Sign In Time] Greater Than [Sign Out Time]");

          return;
        }
      }

      if (field === "signOutTime") {
        setSelectSignOutTime(() => newValue);
      }

    } catch (error) {
      console.error("Error updating time:", error);
    }
  };

  const UpdateSignInSignOutTime = async (
    id: number,
    signInTime: string,
    signOutTime: string
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/EditSignInSignOutTime?id=${id}&signInTime=${signInTime}&signOutTime=${signOutTime}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(clientIDs),
        }
      );
      CancelEditSignInSignOutTime();
      if (!response.ok) {
        console.error(`Failed to post data :`, response.statusText);
      }
    } catch (error) {
      console.error(`Error posting data:`, error);
    }
  };

  const CancelEditSignInSignOutTime = () => {
    setEditingItemId(null);
  };

  const DownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${backEndCodeURLLocation}SignIn/ConvertExcelToPDF`,
        {
          responseType: "blob", // Specify response type as blob
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";

      // Append the anchor element to the body and click it
      document.body.appendChild(a);
      a.click();

      // Remove the anchor element after download
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const AddNewSignOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${backEndCodeURLLocation}SignIn/ConvertExcelToPDF`,
        {
          responseType: "blob", // Specify response type as blob
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";

      // Append the anchor element to the body and click it
      document.body.appendChild(a);
      a.click();

      // Remove the anchor element after download
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  
  const fetchAutoriziedParentsForTheClient = async (parentID: number, parentIDWhoDropIn: number, parentIDWhoPickedUp: number, itemId: number) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/GetAllParentsAndGuardiansWhoCanDropInOutAClient?clientID=${parentID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setParentInfo(data);
  
        const options = data.map((parent: any) => ({
          value: parent.parentID,
          label: `${parent.parentFirstName} ${parent.parentLastName}`,
        }));
  
        setDropInOutOptions(() => options);
  
        const selectedOptionForDropIn = options.find(
          (option: { value: number; label: string }) => option.value === parentIDWhoDropIn
        );
  
        setSelectedDropInOptions((prevSelectedOptions) => ({
          ...prevSelectedOptions,
          [itemId]: selectedOptionForDropIn,
        }));

        
        const selectedOptionForPickedUp = options.find(
          (option: { value: number; label: string }) => option.value === parentIDWhoPickedUp
        );

        setSelectedDropOutOptions((prevSelectedOptions) => ({
          ...prevSelectedOptions,
          [itemId]: selectedOptionForPickedUp,
        }));
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const EditSignInSignOutTime = (
    itemId: number,
    clientId: number,
    parentIDWhoDropIn: number,
    parentIDWhoPickedUp: number,
    currentSignOutTime: string
  ) => {
    console.log("clientId = " + clientId);
    setSelectSignOutTime(() => currentSignOutTime);
    setEditingItemId(itemId);
    fetchAutoriziedParentsForTheClient(clientId, parentIDWhoDropIn, parentIDWhoPickedUp, itemId);
  };

  // const handleSelectChange = (selectedOptions: any) => {
  //   setSelectedOptions(selectedOptions); // Update state with selected options
  //   const selectedOption = dropInOutOptions.find(
  //     (option: { value: number; label: string }) => option.value === selectedOptions.value
  //   );
  //   setSelectedDropInOption(() => selectedOption);
  //   console.log("dropInOutOptions = ", selectedOption);
  // };

  const handleSelectChange = (selectedOption: any, itemId: number) => {
    setSelectedDropInOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [itemId]: selectedOption,
    }));
  };

  return (
    <div className="time-schedule-editor">
      <h2>Time Schedule Editor</h2>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Client Name</th>
            <th>Sign In Time</th>
            <th>Who</th>
            <th>Sign Out Time</th>
            <th>Who</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td>
                {item.clientFirstName} {item.clientLastName}
              </td>
              
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={item.signInTime}
                  onChange={(e) =>
                    handleUpdateTime(item.id, "signInTime", e.target.value)
                  }
                  disabled={editingItemId !== item.id}
                />
              </td>
              <td>
                <Select
                  required
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={dropInOutOptions}
                  isClearable={true}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, item.id)}
                  value={
                    selectedDropInOptions[item.id]
                      ? selectedDropInOptions[item.id]
                      : {
                          value: "",
                          label: `${item.droppedInParentFirstName} ${item.droppedInParentLastName}`,
                        }
                  }
                  isDisabled={editingItemId !== item.id}
                  styles={{
                    // Styles for the container of the Select component
                    control: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for the dropdown menu
                    menu: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for individual options
                    option: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                  }}
                />
              </td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={item.signOutTime}
                  onChange={(e) =>
                    handleUpdateTime(item.id, "signOutTime", e.target.value)
                  }
                  disabled={editingItemId !== item.id}
                />
              </td>
              <td>
              <Select
                  required
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={dropInOutOptions}
                  isClearable={true}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, item.id)}
                  value={
                    selectedDropOutOptions[item.id]
                      ? selectedDropOutOptions[item.id]
                      : {
                          value: "",
                          label: `${item.pickedOutParentFirstName} ${item.pickedOutParentLastName}`,
                        }
                  }
                  isDisabled={editingItemId !== item.id}
                  styles={{
                    // Styles for the container of the Select component
                    control: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for the dropdown menu
                    menu: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for individual options
                    option: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                  }}
                />
              </td>
              <td>
                {editingItemId !== item.id ? (
                  <button
                    className="btn btn-edit"
                    onClick={() =>
                      EditSignInSignOutTime(item.id, item.clientID, item.droppedInParentID, item.pickedOutParentID, item.signOutTime)
                    }
                  >
                    Edit
                  </button>
                ) : (
                  <span>
                    <button
                      className="btn btn-cancel"
                      onClick={() => CancelEditSignInSignOutTime()}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-update"
                      onClick={() =>
                        UpdateSignInSignOutTime(
                          item.id,
                          item.signInTime,
                          item.signOutTime
                        )
                      }
                    >
                      Update
                    </button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        
            <tr>
              {/* <td>{item.id}</td> */}
              <td>
                {/* <Select
                  required
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={options}
                  isClearable={true}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  styles={{
                    // Styles for the container of the Select component
                    control: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for the dropdown menu
                    menu: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for individual options
                    option: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                  }}
                /> */}
              </td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={selectedOptions}
                  onChange={(e) =>
                    handleUpdateTimeForManualTime("signInTime", e.target.value)
                   }
                />
              </td>
              <td>
              {/* <Select
                  required
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={options}
                  isClearable={true}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  styles={{
                    // Styles for the container of the Select component
                    control: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for the dropdown menu
                    menu: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                    // Styles for individual options
                    option: (provided) => ({
                      ...provided,
                      fontSize: "20px", // Adjust the font size here
                    }),
                  }}
                /> */}
              </td>
              <td>
                <span>
                  <button className="btn btn-update">Add</button>
                </span>
              </td>
            </tr>
          
        </tbody>
      </table>
      <button onClick={DownloadPDF}>Download PDF</button>
    </div>
  );
};

export default EditChildTime;
