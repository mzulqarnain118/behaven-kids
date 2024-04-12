import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface ChildInfo {
  clientID: number;
  firstName: string;
  lastName: string;
  locationID: string;
}

const AddChildInfo: React.FC = () => {
  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

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
  // `${backEndCodeURLLocation}SignIn/AddCurrentChildIntoAbaDetail?clientFirstName=${clientFirstName}&clientLastName=${clientLastName}&locationID=${clientLocation}`,
  const handleSubmit = async () => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
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
        console.error(
          `Failed to post data for client ID:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID:`, error);
    }
  };
  const animatedComponents = makeAnimated();

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions); // Update state with selected options
    console.log(selectedOptions);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
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
                <div style={{fontSize: "20px"}}>
                  <br/>
                <h5>Choose client Location: </h5>
                <input type="radio" id="omaha" name="age" value="Omaha" onChange={handleLocationChange} required/>
                <label htmlFor="omaha" style={{marginLeft: "6px"}}>Omaha</label>
                <br />
                <input type="radio" id="lincoln" name="age" value="Lincoln" onChange={handleLocationChange} />
                <label htmlFor="lincoln" style={{marginLeft: "6px"}}> Lincoln</label>
                <br />
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

export default AddChildInfo;
