import React, { useState } from "react";
import "./CSS/AddParentChildInfo.css";

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
                <input
                  type="input"
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
                />
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
                    <label htmlFor={`childLastName${index}`}>
                      Last Name:
                    </label>
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
