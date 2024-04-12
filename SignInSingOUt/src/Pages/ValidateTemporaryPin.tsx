import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";

const ValidateTemporaryPin: React.FC = () => {
  const [parentTemporaryFiveDigitPin, setParentTemporaryFiveDigitPin] = useState<string>("");

  const navigate = useNavigate();
  const [dotsClicked, setDotsClicked] = useState<number>(0);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/", { replace: true });
  //   }

  //   if (parentLastFourDigitPhoneNumber === undefined) {
  //     navigate("/", { replace: true });
  //   }
  // });

  useEffect(() => {
    const fetchData = async () => {
      if (parentTemporaryFiveDigitPin.length >= 5) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
          }

          const url = `${backEndCodeURLLocation}SignIn/VerifyIfParentsTemporaryPinExist?temporaryPin=${parentTemporaryFiveDigitPin}`;

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

          const getParentID = await response.json();

          // setShowErrorMessage(false);
           navigate("/ResetPin", {
             replace: true,
            state: { parentID: getParentID },
           });
          // setShow(true);
          //   navigate("/", { replace: true });
        } catch (error) {
          setParentTemporaryFiveDigitPin("");
          setShowErrorMessage(true);
          const timer = setTimeout(() => {
            setShowErrorMessage(false);
          }, 3000);
          () => clearTimeout(timer);
          setDotsClicked((prevDotsClicked) => prevDotsClicked * 0);
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [parentTemporaryFiveDigitPin]);

  const InsertPhoneNumber = async (value: string) => {
    setParentTemporaryFiveDigitPin((prevValue) => prevValue + value);
console.log("testing " + parentTemporaryFiveDigitPin);
    if (dotsClicked < 5) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked + 1);
    }
  };

  const DeletePhoneNumber = () => {
    setParentTemporaryFiveDigitPin((prevValue) => prevValue.slice(0, -1));

    if (dotsClicked > 0) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked - 1);
    }
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <>
      <div className="ContentComponentBody" id="my_fullscreen">
        <div className="CommentDropDown_Grid">
          <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
          <br />
          <div>
            <h3>Enter Your 5 Digit Security Pin To Reset Pin</h3>
            <div style={{ marginTop: "15px" }}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index < dotsClicked ? "dot-clicked" : ""}`}
                ></span>
              ))}
            </div>
          </div>
          <br />
          <br />
          <div className="PhoneNumber_Grid">
            {numbers.map((number) => (
              <button
                key={number}
                className="grid-item"
                onClick={() => InsertPhoneNumber(number.toString())}
              >
                {number}
              </button>
            ))}

            <button
              className="grid-item"
              style={{
                backgroundColor: "white",
                color: "goldenrod",
                border: "1px solid black",
              }}
              onClick={() => DeletePhoneNumber()}
            >
              {"\u232B"}
            </button>
          </div>
        </div>
        {/* <CongratulationsPopup showModel={show} setShowModel={setShow} parentFirstName={parentName}/> */}
        {showErrorMessage && (
          <ErrorMessage message={"Incorrect 5 Digit Pin"} />
        )}
      </div>
    </>
  );
};

export default ValidateTemporaryPin;
