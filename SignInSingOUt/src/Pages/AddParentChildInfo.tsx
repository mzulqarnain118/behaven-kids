import React, { useState } from "react";
import "./CSS/AddParentChildInfo.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface ParentInfo {
  firstName: string;
  lastName: string;
  pin: string;
  lastDigitPhoneNumber: string;
  children: ChildInfo[];
}

interface ChildInfo {
  firstName: string;
  lastName: string;
}

const AddParentInfo: React.FC = () => {
  const [parentInfo, setParentInfo] = useState<ParentInfo>({
    firstName: "",
    lastName: "",
    pin: "",
    lastDigitPhoneNumber: "",
    children: [],
  });

  const [phone, setPhone] = useState("");

  const addNewChild = () => {
    setParentInfo((prevInfo) => ({
      ...prevInfo,
      children: [...prevInfo.children, { firstName: "", lastName: "" }],
    }));
  };

  const handleChildChange = (index: number, key: string, value: string) => {
    setParentInfo((prevInfo) => ({
      ...prevInfo,
      children: prevInfo.children.map((child, i) =>
        i === index ? { ...child, [key]: value } : child
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Parent Info:", parentInfo);
    // Here you can send the parentInfo to your backend or do whatever you need with it
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
          width: "1250px",
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
                  className="form-control parentInputField"
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
                  onChange={(phone) => setPhone(phone)}
                  inputStyle={{
                    width: "100%",
                  }}
                />
                {/*<input
                  type="tel"  
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="form-control"
                  id="parentPhoneNumber"
                  placeholder="Last 4 Digit Phone Number"
                  value={parentInfo.lastDigitPhoneNumber}
                  onChange={(e) =>
                    setParentInfo({
                      ...parentInfo,
                      lastDigitPhoneNumber: e.target.value,
                    })
                  }
                  required
                /> */}
              </div>

              <div className="form-group parentGridContaineritem">
                <label htmlFor="parentPin">4 Digit Pin</label>
                <input
                  type="input"
                  className="form-control"
                  id="parentPin"
                  placeholder="4 Digit Pin"
                  value={parentInfo.pin}
                  onChange={(e) =>
                    setParentInfo({
                      ...parentInfo,
                      pin: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

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
            ))}

            <button type="button" onClick={addNewChild}>
              Add Child
            </button>

            <div className="list-group">
  <label className="list-group-item">
    <input className="form-check-input me-1" type="checkbox" value=""/>
    First checkbox
  </label>
  <label className="list-group-item">
    <input className="form-check-input me-1" type="checkbox" value=""/>
    Second checkbox
  </label>
  <label className="list-group-item">
    <input className="form-check-input me-1" type="checkbox" value=""/>
    Third checkbox
  </label>
  <label className="list-group-item">
    <input className="form-check-input me-1" type="checkbox" value=""/>
    Fourth checkbox
  </label>
  <label className="list-group-item">
    <input className="form-check-input me-1" type="checkbox" value=""/>
    Fifth checkbox
  </label>
</div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddParentInfo;
