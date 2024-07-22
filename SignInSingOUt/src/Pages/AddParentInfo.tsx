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
  EmailAdress: string;
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
    EmailAdress: "",
    children: [],
  });

  const [childInfo, setChildInfo] = useState<ChildInfo[]>([]);

  const [phone,] = useState("");

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


  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log("Parent Info:", parentInfo);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddParentGuardianDetail?firstName=${parentInfo.firstName}&lastName=${parentInfo.lastName}&phoneNumber=${parentInfo.PhoneNumber.substring(1)}&parentEmailAddress=${parentInfo.EmailAdress}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ parentInfo }),
        }
      );

      if (!response.ok) {
        alert("Parent might already exist. Please check the database");
        return;
      }

      if (response.ok) {
      window.location.reload();
      }

      if (response.status === 200) {
        console.log('Data posted successfully');
      } else {
        console.error(`Failed to post data for client ID ${parentInfo}: ${response.statusText}`);
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
                  style={{ height: "50px", fontSize: "25px" }}
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
                <label htmlFor="parentPin">Email Address</label>
                <input
                  type="email"
                  style={{ height: "50px", fontSize: "25px" }}
                  className="form-control"
                  id="parentPin"
                  placeholder="Email Address"
                  value={parentInfo.EmailAdress}
                  onChange={(e) =>
                    setParentInfo({
                      ...parentInfo,
                      EmailAdress: e.target.value,
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
              <br />
              <br />
              <button type="submit" className="btn btn-primary btn-lg" >
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
