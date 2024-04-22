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
  droppedInParentFirstName: string;
  droppedInParentLastName: string;
  pickedOutParentFirstName: string;
  pickedOutParentLastName: string;
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
  const [selectManualSignInTime, setSelectManualSignInTime] = useState<string>("");
  const [selectManualParent, setSelectedManualParent] = useState<string>("");
  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [parentInfo, setParentInfo] = useState<ParentInfo[]>([]);
  const [selectedChildOptions, setSelectedChildOptions] = useState<any[]>([]);
  const [selectedDropInOption, setSelectedDropInOption] = useState<any | null>(null);
  const [selectedWhoDropedInOutOptions, setSelectedWhoDropedInOutOptions] = useState<any[]>([]);
  const [dropInOutOptions, setDropInOutOptions] = useState<any[]>([]);
  const [dropInManualOptions, setDropInManualOptions] = useState<any[]>([]);
  const [selectedDropInOptions, setSelectedDropInOptions] = useState<{ [key: number]: any; }>({});
  const [selectedDropOutOptions, setSelectedDropOutOptions] = useState<{ [key: number]: any; }>({});
  const [selectedDropInParentID, setSelectedDropInParentID] = useState<number | null>(null);
  const [selectedDropOutParentID, setSelectedDropOutParentID] = useState<number | null>(null);

  const animatedComponents = makeAnimated();

  const clientNameOptions = childInfo.map((client) => ({
    value: client.clientID,
    label: `${client.firstName} ${client.lastName}`,
  }));

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

        const url = `${backEndCodeURLLocation}SignIn/GetAllClientsThatAreActive`;

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

  const handleUpdateTimeForManualTime = async (newValue: string) => {
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

      setSelectManualSignInTime(() => newValue);
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
        `${backEndCodeURLLocation}SignIn/EditSignInSignOutTime?id=${id}&signInTime=${signInTime}&signOutTime=${signOutTime}&changeParentDropInID=${selectedDropInParentID}&changeParentPickUpID=${selectedDropOutParentID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(clientIDs),
        }
      );
      setEditingItemId(null);
      setSelectedDropInParentID(null);
      setSelectedDropOutParentID(null);
      if (!response.ok) {
        console.error(`Failed to post data :`, response.statusText);
      }
    } catch (error) {
      console.error(`Error posting data:`, error);
    }
  };

  const CancelEditSignInSignOutTime = () => {
    setEditingItemId(null);
    setDropInOutOptions([]);
    setSelectedDropInOptions({});
    setSelectedDropOutOptions({});
    setSelectedDropInParentID(null);
    setSelectedDropOutParentID(null);
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

  // const AddNewSignOut = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `${backEndCodeURLLocation}SignIn/ConvertExcelToPDF`,
  //       {
  //         responseType: "blob", // Specify response type as blob
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Create a temporary URL for the blob
  //     const url = window.URL.createObjectURL(new Blob([response.data]));

  //     // Create an anchor element to trigger the download
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "converted.pdf";

  //     // Append the anchor element to the body and click it
  //     document.body.appendChild(a);
  //     a.click();

  //     // Remove the anchor element after download
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.error("Error downloading PDF:", error);
  //   }
  // };

  const fetchAutoriziedParentsForTheClient = async (
    clientID: number,
    parentIDWhoDropIn: number,
    parentIDWhoPickedUp: number,
    itemId: number
  ) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/GetAllParentsAndGuardiansWhoCanDropInOutAClient?clientID=${clientID}`,
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
          (option: { value: number; label: string }) =>
            option.value === parentIDWhoDropIn
        );

        setSelectedDropInOptions((prevSelectedOptions) => ({
          ...prevSelectedOptions,
          [itemId]: selectedOptionForDropIn,
        }));

        const selectedOptionForPickedUp = options.find(
          (option: { value: number; label: string }) =>
            option.value === parentIDWhoPickedUp
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
    fetchAutoriziedParentsForTheClient(
      clientId,
      parentIDWhoDropIn,
      parentIDWhoPickedUp,
      itemId
    );
  };

  const SelectAChildNameManually = async (selectedOptions: any) => {
    setSelectedChildOptions(selectedOptions); // Update state with selected options
    const selectedOption = clientNameOptions.find(
      (option: { value: number; label: string }) =>
        option.value === selectedOptions.value
    );
    setSelectedDropInOption(() => selectedOption);

    console.log("selectedOption ", selectedOption);
    
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/GetAllParentsAndGuardiansWhoCanDropInOutAClient?clientID=${selectedOption?.value}`,
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

        setDropInManualOptions(() => options);

      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  const SelectAParentNameManually = async (selectedOptions: any) => {
    // setSelectedChildOptions(selectedOptions); // Update state with selected options
    // const selectedOption = clientNameOptions.find(
    //   (option: { value: number; label: string }) =>
    //     option.value === selectedOptions.value
    // );
    // setSelectedDropInOption(() => selectedOption);
    setSelectedManualParent(selectedOptions)
    console.log("selectedOption ", selectedOptions);
    
  };

  const ChangeDropInParentOption = (selectedOption: any, itemId: number) => {
    console.log("itemId = " + itemId);
    setSelectedDropInOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [itemId]: selectedOption,
    }));
    setSelectedDropInParentID(selectedOption.value);
  };

  const ChangePickUpParentOption = (selectedOption: any, itemId: number) => {
    console.log("itemId = " + itemId);
    setSelectedDropOutOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [itemId]: selectedOption,
    }));
    setSelectedDropOutParentID(selectedOption.value);
  };

  const AddClientNewSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("selectedChildOptions ", selectedChildOptions.value);
    console.log("SelectManualSignInTime ", selectManualSignInTime);
    console.log("setSelectedManualParent ", selectManualParent);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddManualClientSignInAndWhichParentDropChildIn?clientID=${selectedChildOptions.value}&signInTime=${selectManualSignInTime}&parentID=${selectManualParent.value}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(clientIDs),
        }
      );
      // setEditingItemId(null);
      // setSelectedDropInParentID(null);
      // setSelectedDropOutParentID(null);
      if (!response.ok) {
        console.error(`Failed to post data :`, response.statusText);
      }
      fetchSchedule();
    } catch (error) {
      console.error(`Error posting data:`, error);
    }

   }

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
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={dropInOutOptions}
                  onChange={(selectedOption) =>
                    ChangeDropInParentOption(selectedOption, item.id)
                  }
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
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={dropInOutOptions}
                  onChange={(selectedOption) =>
                    ChangePickUpParentOption(selectedOption, item.id)
                  }
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
                      EditSignInSignOutTime(
                        item.id,
                        item.clientID,
                        item.droppedInParentID,
                        item.pickedOutParentID,
                        item.signOutTime
                      )
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
        </tbody>
      </table>
      <div className="time-schedule-editor">
        <br />
        <form>
          <table>
            {/* Table headers and existing rows */}
            <tbody>
              {/* Existing rows */}
              <tr>
                {/* Form fields for new entry */}
                <td>
                  <Select
                    required
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={clientNameOptions}
                    isClearable={true}
                    onChange={SelectAChildNameManually}
                    value={selectedChildOptions}
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
                    value={selectManualSignInTime}
                    onChange={(e) =>
                      handleUpdateTimeForManualTime(
                        e.target.value
                      )
                    }
                    required
                  />
                </td>
                <td>
                  <Select
                    required
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={dropInManualOptions}
                    isClearable={true}
                    onChange={SelectAParentNameManually}
                    value={selectManualParent}
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
                  <span>
                    <button type="submit" className="btn btn-update" onClick={AddClientNewSignIn}>
                      Add
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <button onClick={DownloadPDF}>Download PDF</button>
    </div>
  );
};

export default EditChildTime;
