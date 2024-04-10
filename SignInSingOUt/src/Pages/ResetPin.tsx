import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";

const ResetPin: React.FC = () => {
  const location = useLocation();
  const parentLastFourDigitPhoneNumber =
    location.state?.parentLastFourDigitPhoneNumber;
  console.log(parentLastFourDigitPhoneNumber);
  const [parentPersonalPin, setParentPersonalPin] = useState<string>("");
  const [reParentPersonalPin, setReParentPersonalPin] = useState<string>("");
  const [canUserResetPin, setCanUserResetPin] = useState<boolean>(false);

  const [, setParentName] = useState<string>("");

  const navigate = useNavigate();
  const [, setShow] = useState(false);
  const [dotsClicked, setDotsClicked] = useState<number>(0);
  const [reDotsClicked, setReDotsClicked] = useState<number>(0);
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
      if (reParentPersonalPin.length >= 4) {
        if (parentPersonalPin === reParentPersonalPin) {
          console.log("same");
        } else {
          console.log("Not same");
          setCanUserResetPin(false);
          setParentPersonalPin("");
          setReParentPersonalPin("");
          setDotsClicked((prevDotsClicked) => prevDotsClicked * 0);
          setReDotsClicked((prevDotsClicked) => prevDotsClicked * 0);
            setParentPersonalPin("");
            setShowErrorMessage(true);
            const timer = setTimeout(() => {
              setShowErrorMessage(false);
            }, 3000);
            () => clearTimeout(timer);

          return;
        }

        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
          }

          const url = `${backEndCodeURLLocation}SignIn/VerifyIfParentPinAndPhoneNumberMatch?parentPinNumber=${parentPersonalPin}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;

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

          setParentName(data.parentFirstName);
          setShowErrorMessage(false);
          console.log("parentFourDigitPin = " + parentPersonalPin);
          navigate("/ChooseWhichChildren", {
            replace: true,
            state: { parentFourDigitPin: parentPersonalPin },
          });
          setShow(true);
          //   navigate("/", { replace: true });
        } catch (error) {
          setParentPersonalPin("");
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
  }, [reParentPersonalPin]);

  const InsertParentPersonalPin = async (value: string) => {
    setParentPersonalPin((prevValue) => prevValue + value);
    if (dotsClicked < 4 && canUserResetPin === false) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked + 1);
    }
    if (dotsClicked >= 3) {
      setCanUserResetPin((prevDotsClicked) => (prevDotsClicked = true));
    }
  };

  const ReInsertParentPersonalPin = async (value: string) => {
    setReParentPersonalPin((prevValue) => prevValue + value);
    if (reDotsClicked < 4) {
      setReDotsClicked((prevDotsClicked) => prevDotsClicked + 1);
    }
  };

  const DeletePhoneNumber = () => {
    setParentPersonalPin((prevValue) => prevValue.slice(0, -1));

    if (dotsClicked > 0) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked - 1);
    }
  };

  const GoToForgotPinPage = () => {
    navigate("/ResetPin", { replace: true });
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <>
      <div className="ContentComponentBody" id="my_fullscreen">
        <div className="CommentDropDown_Grid">
          <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
          <br />
          <div>
            <h4>Enter Your Personal 4 Digit Pin</h4>
            <div style={{ marginTop: "15px" }}>
              {[...Array(4)].map((_, index) => (
                <span
                  key={index}
                  className={`resetPinDot ${
                    index < dotsClicked ? "resetDot-clicked" : ""
                  }`}
                ></span>
              ))}
            </div>
            <h4>Re-Enter Your Personal 4 Digit Pin</h4>
            <div style={{ marginTop: "15px" }}>
              {[...Array(4)].map((_, index) => (
                <span
                  key={index}
                  className={`resetPinDot ${
                    index < reDotsClicked ? "resetDot-clicked" : ""
                  }`}
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
                onClick={() =>
                  canUserResetPin === false
                    ? InsertParentPersonalPin(number.toString())
                    : ReInsertParentPersonalPin(number.toString())
                }
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
          <ErrorMessage message={"Personal 4 Digit Pin Not The Same"} />
        )}
      </div>
    </>
  );
};

export default ResetPin;
