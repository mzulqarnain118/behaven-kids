import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface ChildInfo {
  clientID: number;
  firstName: string;
  lastName: string;
  locationID: string;
}

interface OptionType {
  label: string;
  value: string;
}

const omahaSdpRoomNames: OptionType[] = [
  { value: '6', label: 'Apple' },
  { value: '8', label: 'Bee' },
  { value: '10', label: 'Bird' },
  { value: '12', label: 'Parrot' },
  { value: '14', label: 'Horse' },
];

const lincolnSdpRoomNames: OptionType[] = [
  { value: '5', label: 'Apple' },
  { value: '7', label: 'Bee' },
  { value: '9', label: 'Bird' },
  { value: '11', label: 'Parrot' },
  { value: '13', label: 'Horse' },
];

const MakeClientCurrent: React.FC = () => {
  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [selectedRoomOption, setSelectedRoomOption] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [roomID, setRoomID] = useState<string>();

  const options = childInfo.map((parent) => ({
    value: parent.clientID,
    label: `${parent.firstName} ${parent.lastName}`,
  }));

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

  const handleSubmit = async () => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("roomID = " + roomID);
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddCurrentChildIntoAbaDetail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: selectedLocation,
            roomID: roomID,
            childInfo: selectedOptions.map(option => ({
              clientID: option.value,
              firstName: option.label.split(' ')[0], // Assuming first name is before the space
              lastName: option.label.split(' ')[1], // Assuming last name is after the space
              locationID: selectedLocation // Assuming locationID is the same as selectedLocation
            }))
          })
        }
      );

      if (!response.ok) {
        alert(`Failed to post data for client ID:` + response.statusText)
        return;
      }
      window.location.reload();

    } catch (error) {
      alert(`Error posting data for client ID:` + error);
    }
  };
  const animatedComponents = makeAnimated();

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions); 
  };

  const handleRoomSelectedChange = (selectedOptions: any) => {
    setSelectedRoomOption(selectedOptions);
    setRoomID(selectedOptions.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
    setSelectedRoomOption([]);
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
          {/* <h2>Add Current Client Information</h2> */}

          <form onSubmit={handleSubmit}>
            <div className="parentInfoGridContainer">
              <div className="form-group parentGridContaineritem">
                <h5>Make a client current: </h5>
                <Select
                  required
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  styles={{
                    // Styles for the container of the Select component
                    control: (provided) => ({
                      ...provided,
                      fontSize: '20px', // Adjust the font size here
                    }),
                    // Styles for the dropdown menu
                    menu: (provided) => ({
                      ...provided,
                      fontSize: '20px', // Adjust the font size here
                    }),
                    // Styles for individual options
                    option: (provided) => ({
                      ...provided,
                      fontSize: '20px', // Adjust the font size here
                    }),
                  }}
                />
                <div style={{ fontSize: "20px" }}>
                  <br />
                  <h5>Choose client Location: </h5>
                  <input type="radio" id="omaha" name="age" value="OHCU" onChange={handleLocationChange} required />
                  <label htmlFor="omaha" style={{ marginLeft: "6px" }}>Omaha - Cuming Street</label>
                  <br />
                  <input type="radio" id="lincoln" name="age" value="LIHG" onChange={handleLocationChange} />
                  <label htmlFor="lincoln" style={{ marginLeft: "6px" }}> Lincoln - Hight</label>
                  <br />
                  <input type="radio" id="lincoln" name="age" value="LIET" onChange={handleLocationChange} />
                  <label htmlFor="lincoln" style={{ marginLeft: "6px" }}> Lincoln - East</label>
                  <br />
                  <input type="radio" id="lincoln" name="age" value="LAVI" onChange={handleLocationChange} />
                  <label htmlFor="lincoln" style={{ marginLeft: "6px" }}> LaVista - WRTS</label>
                  <br />
                </div>
                <div style={{ fontSize: "20px", display: selectedLocation !== "OHCU" && selectedLocation !== "LIHG" ? "none" : "grid"}}>
                  <br />
                  <h5>Choose Which Room </h5>
                  <Select
                  required={selectedLocation === "OHCU" || selectedLocation === "LIHG" ? true : false}
                  components={animatedComponents}
                  options={selectedLocation === "OHCU" ? omahaSdpRoomNames : lincolnSdpRoomNames}
                  onChange={handleRoomSelectedChange}
                  value={selectedRoomOption}
                  styles={{
                    // Styles for the container of the Select component
                    control: (provided) => ({
                      ...provided,
                      fontSize: '20px', // Adjust the font size here
                    }),
                    // Styles for the dropdown menu
                    menu: (provided) => ({
                      ...provided,
                      fontSize: '20px', // Adjust the font size here
                    }),
                    // Styles for individual options
                    option: (provided) => ({
                      ...provided,
                      fontSize: '20px', // Adjust the font size here
                    }),
                  }}
                />
                </div>
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

export default MakeClientCurrent;
