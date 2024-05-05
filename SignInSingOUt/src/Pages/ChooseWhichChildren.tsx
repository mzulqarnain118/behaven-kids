import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import "./CSS/ChooseWhichChildren.css";
import ClientsCheckinCheckoutPopup from "../Components/PopupCheckInOutSuccess"

interface ClientInfo {
  clientID: number;
  firstName: string;
  lastName: string;
}

interface ParentGuardianInfo {
  parentID: number;
  parentFirstName: string;
  parentLastName: string;
}

interface ChildInfo {
  childId: number;
  ChildFirstName: string;
  ChildLastName: string;
  isChecked: boolean;
  signInTimeData: string;
  signOutTimeData: string;
}

interface SignInSignOutTime {
  clientID: number;
  signInTime: string; // Adjust type if needed
  signOutTime?: string; // Adjust type if needed
}

const ChooseWhichChildren: React.FC = () => {
  const location = useLocation();
  const parentFourDigitPin = location.state?.parentFourDigitPin;
  const parentLastFourDigitPhoneNumber = location.state?.parentLastFourDigitPhoneNumber;
  const parentID = location.state?.parentID;

  const [childrenInfo, setChildrenInfo] = useState<ChildInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didUserCheckAClient, setDidUserCheckAClient] = useState(true);
  const [clientClockInClockOutData, setClientClockInClockOutData] = useState<SignInSignOutTime[]>([]);
  const [parentName, setParentName] = useState<string>("");
  const [blurAmount, setBlurAmount] = useState<number>(0);
  const [showModel, setShowModel] = useState<boolean>(false);


  const navigate = useNavigate();
  const [pointerEventsSignIn, setPointerEventsSignIn] = useState<
    "auto" | "none"
  >("auto");
  const [pointerEventsSignOut, setPointerEventsSignOut] = useState<
    "auto" | "none"
  >("auto");

  const [boxShadowEventsSignIn, setBoxShadowEventsSignIn] = useState(
    "0 4px 8px rgba(0, 0, 0, 0.4)"
  );
  const [boxShadowEventsSignOut, setBoxShadowEventsSignOut] = useState(
    "0 4px 8px rgba(0, 0, 0, 0.4)"
  );

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token not found in localStorage");
        }
        
        const responseForDigitPin = await fetch(`${backEndCodeURLLocation}Parent/GetTheParentWhoSignInInfo?parentID=${parentID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!responseForDigitPin.ok) {
          alert("Network issues");
        }

        const getParentInfo: ParentGuardianInfo = await responseForDigitPin.json();

        setParentName(getParentInfo.parentFirstName + " " + getParentInfo.parentLastName);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("parentID = " + parentID);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
        console.log(
          "parentLastFourDigitPhoneNumber = " + parentLastFourDigitPhoneNumber
        );
        const urlForDigitPin = `${backEndCodeURLLocation}SignIn/GetParentsChildrenInfo?parentPinID=${parentFourDigitPin}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;
        console.log(urlForDigitPin);
        const responseForDigitPin = await fetch(urlForDigitPin, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!responseForDigitPin.ok) {
          throw new Error("Network response was not ok");
        }

        const dataForDigitPin = await responseForDigitPin.json();

        const childrenDataPromises = dataForDigitPin.map(
          async (item: { clientInfo: ClientInfo }) => {
            const signInTimeResponse = await fetchSignInTime(
              item.clientInfo.clientID,
              token
            );

            const signOutTimeResponse = await fetchSignOutTime(
              item.clientInfo.clientID,
              token
            );
            
            try {
              const urlForSignInAndSignOut = `${backEndCodeURLLocation}SignIn/GetClientSignInSignOutTime?clientID=${item.clientInfo.clientID}`;
              console.log(urlForSignInAndSignOut);
              const responseForGettingSignInSignOutData = await fetch(
                urlForSignInAndSignOut,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!responseForGettingSignInSignOutData.ok) {
                throw new Error("Network response was not ok");
              }

              const dataForDigitPin: SignInSignOutTime[] =
                await responseForGettingSignInSignOutData.json();

              // Iterate over dataForDigitPin array using for loop
              for (const item of dataForDigitPin) {
                setClientClockInClockOutData((prevState) => [
                  ...prevState,
                  item,
                ]);
              }
            } catch (error) {
              // console.log("hello");
            }

            try {
              if (signInTimeResponse !== null) {
                const signInTimeData = await signInTimeResponse.json();

                if (signOutTimeResponse !== null) {
                  try {
                    // console.log("Sign In = " + signInTimeData);

                    const signOutTimeData = await signOutTimeResponse.json();
                    // console.log("Sign Out = " + signOutTimeData);

                    if (signInTimeData !== null && signOutTimeData != null) {
                      // console.log("hello 1");
                      return {
                        childId: item.clientInfo.clientID,
                        ChildFirstName: item.clientInfo.firstName,
                        ChildLastName: item.clientInfo.lastName,
                        isChecked: false,
                        signInTimeData: null,
                        signOutTimeData: null,
                      };
                    }
                    // console.log("hello 2");
                    return {
                      childId: item.clientInfo.clientID,
                      ChildFirstName: item.clientInfo.firstName,
                      ChildLastName: item.clientInfo.lastName,
                      isChecked: false,
                      signInTimeData: signInTimeData,
                      signOutTimeData: signOutTimeData,
                    };
                  } catch (error) {
                    // console.log("hello 3");
                    return {
                      childId: item.clientInfo.clientID,
                      ChildFirstName: item.clientInfo.firstName,
                      ChildLastName: item.clientInfo.lastName,
                      isChecked: false,
                      signInTimeData: signInTimeData,
                      signOutTimeData: null,
                    };
                  }
                }
                // console.log("hello 4");
                return {
                  childId: item.clientInfo.clientID,
                  ChildFirstName: item.clientInfo.firstName,
                  ChildLastName: item.clientInfo.lastName,
                  isChecked: false,
                  signInTimeData: signInTimeData,
                  signOutTimeData: null,
                };
              }
            } catch (error) {
              // console.log("hello 5");
              return {
                childId: item.clientInfo.clientID,
                ChildFirstName: item.clientInfo.firstName,
                ChildLastName: item.clientInfo.lastName,
                isChecked: false,
                signInTimeData: null,
                signOutTimeData: null,
              };
            }
          }
        );

        const resolvedChildrenData = await Promise.all(childrenDataPromises);
        setChildrenInfo(resolvedChildrenData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [parentFourDigitPin]);

  const fetchSignInTime = async (clientID: number, token: string | null) => {
    try {
      const url = `${backEndCodeURLLocation}SignIn/GetClientSignInTime?clientID=${clientID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  };

  const fetchSignOutTime = async (clientID: number, token: string | null) => {
    try {
      const url = `${backEndCodeURLLocation}SignIn/GetClientSignOutTime?clientID=${clientID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  };
  // useEffect(() => {
  //   for (const item of childrenInfo) {
  //     console.log(item);
  //   }
  // }, [childrenInfo]);

  const handleDivClick = (
    childId: number,
    isSignIn: string
    // isSignOut: string,
    // isChecked: boolean
  ) => {
    const updatedChildrenInfo = [...childrenInfo]; // Copy the original array to avoid mutating it

    for (let i = 0; i < updatedChildrenInfo.length; i++) {
      const item = updatedChildrenInfo[i];
      if (item.childId === childId) {
        // Update the isChecked property of the specific child
        updatedChildrenInfo[i] = { ...item, isChecked: !item.isChecked };
        break; // Once the item is updated, exit the loop
      }
    }

    setChildrenInfo((prevState) => {
      return prevState.map((child) => {
        if (child.childId === childId) {
          return { ...child, isChecked: !child.isChecked };
        }
        return child;
      });
    });

    // for (const item of childrenInfo) {
    //   console.log(item);
    // }
    const isCheckedPresent = updatedChildrenInfo.some(
      (child) => child.isChecked === true
    );

    if (isCheckedPresent === true) {
      setDidUserCheckAClient(false);
      if (isSignIn !== null) {
        setPointerEventsSignIn(() => "auto");
        setPointerEventsSignOut(() => "none");
      } else if (isSignIn === null) {
        setPointerEventsSignIn(() => "none");
        setPointerEventsSignOut(() => "auto");
      }
    } else {
      setDidUserCheckAClient(true);
      setPointerEventsSignIn(() => "auto");
      setPointerEventsSignOut(() => "auto");
    }

    for (let i = 0; i < updatedChildrenInfo.length; i++) {
      if (isCheckedPresent === true) {
        if (isSignIn !== null) {
          setBoxShadowEventsSignIn(() => "0 4px 8px rgba(255, 0, 0, 0.4)");
          console.log("hello");
        } else if (isSignIn === null) {
          console.log("hello 2");
          setBoxShadowEventsSignOut(() => "0 4px 8px rgba(0, 128, 0, 0.4)");
        }
        break;
      } else {
        console.log("hello 3");
        setBoxShadowEventsSignIn(() => "0 4px 8px rgba(0, 0, 0, 0.4)");
        setBoxShadowEventsSignOut(() => "0 4px 8px rgba(0, 0, 0, 0.4)");
      }
    }
  };

  const handleSubmit = async () => {
   

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found in localStorage");
        navigate("/", { replace: true });
        return;
      }
      for (const child of childrenInfo.filter((child) => child.isChecked)) {
        if (
          child.signInTimeData === null ||
          child.signInTimeData === undefined
        ) {
          await signInClient(child.childId, token);
        } else {
          await signOutClient(child.childId, token);
        }
      }
      setBlurAmount(20);
      setShowModel(true);
      
    } catch (error) {
      alert("Error submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInClient = async (clientID: number, token: string | null) => {
    try {
      console.log("ClientID = " + clientID);
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddClientTimeOfSignIn?clientID=${clientID}&parentID=${parentID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify({ clientID }),
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to post data for client ID ${clientID}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID ${clientID}:`, error);
    }
  };

  const signOutClient = async (clientID: number, token: string | null) => {
    try {
      console.log("ClientID = " + clientID);
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/AddClientTimeOfSignOut?clientID=${clientID}&parentID=${parentID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify({ clientID }),
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to post data for client ID ${clientID}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error posting data for client ID ${clientID}:`, error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginTop: "50px",
        filter: `blur(${blurAmount}px)`
      }}

    >
      <br/><br/><br/>
      <img
        src={BehavenLogo}
        alt="Behaven Logo"
        style={{ height: "75px", marginBottom: "25px" }}
      />

    <h4>&#128198; {new Date().toLocaleDateString()}</h4>
    <h4 style={{marginTop: "10px"}}>&#128336; {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h4>

      <br />
      <div style={{border: "solid 1px", padding: "25px"}}>
      <h4 style={{color: "#ffc107"}}>{parentName}</h4>
      <br />
      {childrenInfo.map((info) => (
        <div
          className="card"
          style={{
            width: "600px",
            textAlign: "left",
            marginBottom: "20px",
            cursor: "pointer",
            // pointerEvents: info.signInTimeData !== "" ? pointerEventsSignIn : info.signOutTimeData !== "" ? pointerEventsSignOut : "auto",
            pointerEvents:
              info.signInTimeData !== null
                ? pointerEventsSignIn
                : pointerEventsSignOut,
            opacity: "1",
          }}
          key={info.childId}
          onClick={() =>
            handleDivClick(info.childId, info.signInTimeData)
          }
        >
          <div
            className="card-body"
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow:
                info.signInTimeData !== null
                  ? boxShadowEventsSignIn
                  : boxShadowEventsSignOut,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <input
                type="checkbox"
                checked={info.isChecked}
                onChange={() => {}}
                style={{ marginRight: "15px", height: "15px", width: "15px" }}
              />
              <div className="circle" style={{ marginRight: "15px" }}>
                <span className="initials">
                  {info.ChildFirstName.charAt(0)}
                  {info.ChildLastName.charAt(0)}
                </span>
              </div>
              <span>
                {info.ChildFirstName} {info.ChildLastName}
              </span>
            </div>

            <div style={{ alignItems: "flex-end", marginTop: "8px" }}>
              {clientClockInClockOutData ? (
                clientClockInClockOutData
                  .filter(
                    (clockInOutInfo) => clockInOutInfo.clientID === info.childId
                  )
                  .map((clockInOutInfo, index) => (
                    <div key={index}>
                      {clockInOutInfo.signInTime !== null && (
                        <span style={{ color: "green", fontSize: "20px" }}>
                          &#x1F550; ({clockInOutInfo.signInTime}) {" "}
                        </span>
                      )}
                      {clockInOutInfo.signOutTime !== "" ? (
                        <span style={{ color: "red", fontSize: "20px" }}>
                           - ({clockInOutInfo.signOutTime})
                        </span>
                      ) :  
                      <span style={{ color: "red", fontSize: "20px" }}>
                      - ( -- : -- )
                    </span>
                    }
                      <br />
                    </div>
                  ))
              ) : (
                <span>No clock in/out data available</span>
              )}
            </div>
          </div>
        </div>
      ))}
</div>
<ClientsCheckinCheckoutPopup showModel={showModel} setShowModel={setShowModel} />
<br/>
      <button
        className="btn btn-primary btn-lg"
        style={{ width: "200px", height: "75px", backgroundColor: "#ffc107", color: "black", fontWeight: "bold", fontSize: "25px"}}
        onClick={handleSubmit}
        disabled={didUserCheckAClient}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ChooseWhichChildren;
