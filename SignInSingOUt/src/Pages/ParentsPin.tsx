import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";
import ParentPinFialedAttemptsPopup from "../Components/PopupParentPinFailedAttemts";

const ParentSignIn: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const parentLastFourDigitPhoneNumber = location.state?.parentLastFourDigitPhoneNumber;
  console.log(parentLastFourDigitPhoneNumber);


  const [parentFourDigitPin, setParentFourDigitPin] = useState<string>("");
  const [, setParentName] = useState<string>("");
  const [, setShow] = useState(false);
  const [dotsClicked, setDotsClicked] = useState<number>(0);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessagText, setErrorMessageText] = useState<string>("");
  const [howManyFailedAttemps, setHowManyFailedAttemps] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

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
            navigate("/", {
              replace: true,
            }); 
          }
          const response = await fetch(`${backEndCodeURLLocation}SignIn/VerifyIfParentPinAndPhoneNumberMatch?parentPinNumber=${parentFourDigitPin}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            ShowErrorMessageToUser("Couldn't Find Pin Number");
            setHowManyFailedAttemps((prev => prev + 1));
            console.log("howManyFailedAttemps = " + howManyFailedAttemps);
            if (howManyFailedAttemps == 2)
              {
                setShowModal(true);
                return;
              }
            return;
          }
          const data = await response.json();
          setParentName(data.parentFirstName);
          setShowErrorMessage(false);
          navigate("/ChooseWhichChildren", {
            replace: true,
            state: { parentFourDigitPin: parentFourDigitPin, parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber, parentID: data.parentId },
          });
          setShow(true);
          //   navigate("/", { replace: true });
        } catch (error) {

          ShowErrorMessageToUser("error" + error); 
        }
      }
    };

    fetchData();
  }, [parentFourDigitPin]);

  const ShowErrorMessageToUser = async (errorMessage: string) => {
    setErrorMessageText(errorMessage);
    setParentFourDigitPin("");
    setShowErrorMessage(true);
    const timer = setTimeout(() => { 
      setShowErrorMessage(false);
    }, 3000);
    () => clearTimeout(timer);
    setDotsClicked((prevDotsClicked) => prevDotsClicked * 0);


  }

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
    navigate("/ValidateEmailAddress", {
      replace: true,
      state: {
        parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
      },
    });
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <>
      <div className="ContentComponentBody" id="my_fullscreen">

        <div className="CommentDropDown_Grid">
          <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
          <br />
          <div>
            <h3>Enter Last 4 digt Pin (🔒) </h3>
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
                //onClick={() => InsertPhoneNumber(number.toString())}
                onTouchEnd={() => InsertPhoneNumber(number.toString())}
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
              //onClick={() => DeletePhoneNumber()}
              onTouchEnd={() => DeletePhoneNumber()}
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
              fontSize: "24px",
            }}
            onTouchEnd={GoToForgotPinPage}
          >
            Forgot Pin?
          </button>
        </div>
      </div>
      <ParentPinFialedAttemptsPopup showModal={showModal} setShowModal={setShowModal} />
      {showErrorMessage && (
        <ErrorMessage message={errorMessagText} />
      )}
    </>
  );
};

export default ParentSignIn;
