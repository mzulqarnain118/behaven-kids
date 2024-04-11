import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";

const ParentSignIn: React.FC = () => {
  const location = useLocation();
  const parentLastFourDigitPhoneNumber =
    location.state?.parentLastFourDigitPhoneNumber;
  console.log(parentLastFourDigitPhoneNumber);
  const [parentFourDigitPin, setParentFourDigitPin] = useState<string>("");

  const [, setParentName] = useState<string>("");

  const navigate = useNavigate();
  const [, setShow] = useState(false);
  const [dotsClicked, setDotsClicked] = useState<number>(0);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }

    if (parentLastFourDigitPhoneNumber === undefined) {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (parentFourDigitPin.length >= 4) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
          }

          const url = `${backEndCodeURLLocation}SignIn/VerifyIfParentPinAndPhoneNumberMatch?parentPinNumber=${parentFourDigitPin}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;

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
          console.log("parentFourDigitPin = " + parentFourDigitPin);
          navigate("/ChooseWhichChildren", {
            replace: true,
            state: { parentFourDigitPin: parentFourDigitPin },
          });
          setShow(true);
          //   navigate("/", { replace: true });
        } catch (error) {
          setParentFourDigitPin("");
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
  }, [parentFourDigitPin]);

  const InsertPhoneNumber = async (value: string) => {
    setParentFourDigitPin((prevValue) => prevValue + value);

    if (dotsClicked < 4) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked + 1);
    }
  };

  const DeletePhoneNumber = () => {
    setParentFourDigitPin((prevValue) => prevValue.slice(0, -1));

    if (dotsClicked > 0) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked - 1);
    }
  };

  const GoToForgotPinPage = () => {
    navigate("/ValidateEmailAddress", { replace: true,
      state: {
        parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
      }, });
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <>
      <div className="ContentComponentBody" id="my_fullscreen">
        <div className="CommentDropDown_Grid">
          <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
          <br />
          <div>
            <h3>Enter Last 4 digt Pin</h3>
            <div style={{ marginTop: "15px" }}>
              {[...Array(4)].map((_, index) => (
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
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{
              backgroundColor: "white",
              color: "goldenrod",
              fontSize: "20px",
            }}
            onClick={GoToForgotPinPage}
          >
            Forgot Pin?
          </button>
        </div>
        {/* <CongratulationsPopup showModel={show} setShowModel={setShow} parentFirstName={parentName}/> */}
        {showErrorMessage && (
          <ErrorMessage message={"Couldn't Find Pin Number"} />
        )}
      </div>
    </>
  );
};

export default ParentSignIn;
