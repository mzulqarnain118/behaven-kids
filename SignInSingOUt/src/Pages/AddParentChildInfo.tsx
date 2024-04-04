import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import "./CSS/AddParentChildInfo.css";

interface ParentInfo {
  firstName: string;
  lastName: string;
  pin: string;
  PhoneNumber: string;
  children: ChildInfo[];
}

interface ChildInfo {
  isChecked: boolean;
  clientID: number;
  firstName: string;
  lastName: string;
  locationID: string;
}

const AddParentInfo: React.FC = () => {
  const [parentInfo, setParentInfo] = useState<ParentInfo>({
    firstName: "",
    lastName: "",
    pin: "",
    PhoneNumber: "",
    children: [],
  });

  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);

  const [phone, ] = useState("");

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

  // const addNewChild = () => {
  //   setParentInfo((prevInfo) => ({
  //     ...prevInfo,
  //     children: [...prevInfo.children, { firstName: "", lastName: "" }],
  //   }));
  // };

  // const handleChildChange = (index: number, key: string, value: string) => {
  //   setParentInfo((prevInfo) => ({
  //     ...prevInfo,
  //     children: prevInfo.children.map((child, i) =>
  //       i === index ? { ...child, [key]: value } : child
  //     ),
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Parent Info:", parentInfo);
    const token = localStorage.getItem("token");
    try {
      console.log(`${backEndCodeURLLocation}SignIn/AddParentGuardianDetail?firstName=${parentInfo.firstName}&lastName=${parentInfo.lastName}&phoneNumber=${parentInfo.PhoneNumber}&fourDigitPin=${parentInfo.pin}`);
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddParentGuardianDetail?firstName=${parentInfo.firstName}&lastName=${parentInfo.lastName}&phoneNumber=${parentInfo.PhoneNumber.substring(1)}&fourDigitPin=${parentInfo.pin}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify({ parentInfo }),
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
          <h2>Add Guardian Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="parentInfoGridContainer">
              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentFirstName">First Name</label>
                <input
                  type="input"
                  style={{height: "50px", fontSize: "25px"}}
                  className="form-control"
                  id="parentFirstName"
                  placeholder="First Name"
                  value={parentInfo.firstName}
                  onChange={(e) =>
                    setParentInfo({
                      ...parentInfo,
                      firstName: e.target.value,
                    })
                  }
                  // style={{height: "50px", fontSize: "20px"}}
                  required
                />
              </div>
              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentLastName">Last Name</label>
                <input
                  type="input"
                  className="form-control"
                  style={{height: "50px", fontSize: "25px"}}
                  id="parentLastName"
                  placeholder="Last Name"
                  value={parentInfo.lastName}
                  onChange={(e) =>
                    setParentInfo({
                      ...parentInfo,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentPhoneNumber">
                  Last 4 Digit Phone Number
                </label>
                <PhoneInput
                  defaultCountry="us"
                  value={phone}
                  onChange={(e) =>
                    setParentInfo({
                      ...parentInfo,
                      PhoneNumber: e,
                    })
                  }
                  style={
                    {
                      // style with css variables or with ".react-international-phone-flag-emoji" class
                      '--react-international-phone-flag-width': '40px',
                      '--react-international-phone-flag-height': '40px',
                      '--react-international-phone-height': '50px',
                      '--react-international-phone-width': '50px',
                    } as React.CSSProperties
                  }
                  inputStyle={{
                    width: "100%",
                    height: "50px",
                    fontSize: "25px",
                    
                  }}
                  
                  
                />
              </div>

              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentPin">4 Digit Pin</label>
                <input
                  type="number"
                  maxLength={4} 
                  style={{height: "50px", fontSize: "25px"}}
                  className="form-control"
                  id="parentPin"
                  placeholder="4 Digit Pin"
                  value={parentInfo.pin}
                  onChange={(e) => {
                    let pin = e.target.value;
                    // Ensure only numbers are entered and limit to 4 digits
                    pin = pin.replace(/\D/g, '').slice(0, 4);
                    setParentInfo({
                      ...parentInfo,
                      pin
                    })
                  }
                    
                  }
                  required
                />
              </div>
              <br />
            <button type="submit" className="btn btn-primary btn-lg" >
              Submit
            </button>
            </div>
{/* 
            {parentInfo.children.map((child, index) => (
              <div key={index}>
                <h4>Child {index + 1}</h4>
                <div className="parentInfoGridContainer">
                  <div className="form-group parentGridContaineritem">
                    <label htmlFor={`childFirstName${index}`}>
                      First Name:
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      id={`childFirstName${index}`}
                      name={`childFirstName${index}`}
                      value={child.firstName}
                      onChange={(e) =>
                        handleChildChange(index, "firstName", e.target.value)
                      }
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor={`childLastName${index}`}>Last Name:</label>
                    <input
                      type="input"
                      className="form-control"
                      id={`childLastName${index}`}
                      name={`childLastName${index}`}
                      value={child.lastName}
                      onChange={(e) =>
                        handleChildChange(index, "lastName", e.target.value)
                      }
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
              </div>
            ))} */}

            {/* <button type="button" onClick={addNewChild}>
              Add Child
            </button> */}
            {/* <div>
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
                        <p className="flex-grow-1"> {info.firstName}</p>
                        <p className="flex-grow-1"> {info.lastName}</p>
                        <p className="flex-grow-1"> {info.locationID}</p>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No child information available</p>
              )}
            </div> */}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddParentInfo;
