import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";
// import { jwtDecode } from "jwt-decode";

const ParentSignIn: React.FC = () => {
  const [parentLastFourDigitPhoneNumber, setParentLastFourDigitPhoneNumber] =
    useState<string>("");

  const navigate = useNavigate();
  const [dotsClicked, setDotsClicked] = useState<number>(0);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessagText, setErrorMessageText] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
    // else {
    //   // Set the state to redirect to dashboard
    //   const decoded = jwtDecode(token) as DecodedToken;
    //   const userRole = decoded.role;

    //   if (userRole === "parent")
    //     navigate("/PhoneNumber");
    //   else if (userRole === "admin" || userRole === "secretary" )
    //     navigate("/EditChildTime");
      
    
    // }
  });

  useEffect(() => {
    FindParentPhoneNumber();
  }, [parentLastFourDigitPhoneNumber]);

  const FindParentPhoneNumber = async () => {
    if (parentLastFourDigitPhoneNumber.length >= 4) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/", {
            replace: true,
          });
        }

        const response = await fetch(`${backEndCodeURLLocation}SignIn/CheckParentPhoneNumber?parentPhoneNumber=${parentLastFourDigitPhoneNumber}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
            ShowErrorMessageToUser("Couldn't Find Phone Number Or Network issues.");
            return;
        }

        setShowErrorMessage(false);

        navigate("/ParentsPin", {
          replace: true,
          state: {
            parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
          },
        });

       
      } catch (error) {
        ShowErrorMessageToUser("Error: " + error);
      }
    }
    else{
      return;
    }
  };


  const ShowErrorMessageToUser = async (errorMessage: string) => {
    setErrorMessageText("Error: " + errorMessage);
    setParentLastFourDigitPhoneNumber("");
    setShowErrorMessage(true);
    const timer = setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
    () => clearTimeout(timer);
    setDotsClicked((prevDotsClicked) => prevDotsClicked * 0);

  }

  const InsertPhoneNumber = async (value: string) => {
    setParentLastFourDigitPhoneNumber((prevValue) => prevValue + value);

    if (dotsClicked < 4) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked + 1);
    }
  };

  const DeletePhoneNumber = () => {
    setParentLastFourDigitPhoneNumber((prevValue) => prevValue.slice(0, -1));

    if (dotsClicked > 0) {
      setDotsClicked((prevDotsClicked) => prevDotsClicked - 1);
    }
  };
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ];
  return (
    <>
      <div className="ContentComponentBody" id="my_fullscreen">
        <div className="CommentDropDown_Grid">
          <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
          <br />

          <div>
          <h3>Enter Last 4 digits of Phone Number (📞)</h3>
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
                 onTouchEnd={() => InsertPhoneNumber(number.toString())}
                //onClick={() => InsertPhoneNumber(number.toString())}
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
              // onClick={() => DeletePhoneNumber()}
              onTouchEnd={() => DeletePhoneNumber()}
            >
              {"\u232B"}
            </button>
          </div>
        </div>
      </div>
      {showErrorMessage && (
        <ErrorMessage message={errorMessagText} />
      )}
    </>
  );
};

export default ParentSignIn;
