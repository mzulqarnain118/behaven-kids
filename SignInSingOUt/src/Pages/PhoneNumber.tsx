import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from '../config';
import BehavenLogo from '../assets/BehavenLogo.jpg';

const ParentSignIn: React.FC = () => {
  const [parentLastFourDigitPhoneNumber, setParentLastFourDigitPhoneNumber] =
    useState<string>("");

  const navigate = useNavigate();
  const [dotsClicked, setDotsClicked] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  });

 

  useEffect(() => {
    const fetchData = async () => {
      if (parentLastFourDigitPhoneNumber.length >= 4) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
          }
          const url = `${backEndCodeURLLocation}SignIn/CheckParentPhoneNumber?parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;
          console.log(url);

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
          console.log("Results:", data);
          navigate("/ParentsPin", { replace: true, state: { parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber }  });
          // setShow(true);
        } catch (error) {
          setParentLastFourDigitPhoneNumber("");
console.log("here =" + parentLastFourDigitPhoneNumber); 
          setDotsClicked((prevDotsClicked) => prevDotsClicked * 0);
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [parentLastFourDigitPhoneNumber]);

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

  return (
    <>
    
      <div className="ContentComponentBody" id="my_fullscreen">
      
        <div className="CommentDropDown_Grid">
        <img src={BehavenLogo} alt="My Image" style={{height: "75px"}} />
        <br/>
          <div>
            <h4>Enter Last 4 digt of Phone Number</h4>
            <div>
              {[...Array(4)].map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index < dotsClicked ? "dot-clicked" : ""}`}
                ></span>
              ))}
            </div>
          </div>
        <br/><br/>
          <div className="PhoneNumber_Grid">
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("1")}
            >
              1
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("2")}
            >
              2
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("3")}
            >
              3
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("4")}
            >
              4
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("5")}
            >
              5
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("6")}
            >
              6
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("7")}
            >
              7
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("8")}
            >
              8
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("9")}
            >
              9
            </button>
            <button
              className="grid-item"
              onClick={() => InsertPhoneNumber("0")}
            >
              0
            </button>
            <button className="grid-item" style={{backgroundColor: "white", color: "goldenrod", border: "1px solid black"}} onClick={() => DeletePhoneNumber()}>
              {"\u232B"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentSignIn;
