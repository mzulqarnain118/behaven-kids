import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CongratulationsPopup from "../Components/PopupCongrats";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import "../App.css";

const ParentSignIn: React.FC = () => {
  const [parentID, setParentID] = useState<string>("");
  const [parentLastFourDigitPhoneNumber, setParentLastFourDigitPhoneNumber] =
    useState<string>("");
  const [parentIDError, setParentIDError] = useState<string>();
  const [isThereParentIDError, setIsThereParentIDError] = useState<boolean>();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [
    parentLastFourDigitPhoneNumberError,
    setParentLastFourDigitPhoneNumberError,
  ] = useState<string>("");

  const [
    isParentLastFourDigitPhoneNumberErrorError,
    setParentLastFourDigitPhoneNumberErrorError,
  ] = useState<boolean>();

  const handleParentIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setParentID(inputValue); // Update parentID state

    if (inputValue.length == 4) {
      setParentIDError("");
      setIsThereParentIDError(false);
    }
  };

  const handleParentPhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setParentLastFourDigitPhoneNumber(inputValue); // Update parentID state

    if (inputValue.length == 4) {
      setParentLastFourDigitPhoneNumberError("");
      setParentLastFourDigitPhoneNumberErrorError(false);
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    const token = localStorage.getItem('token');
    if (!token) {
      // Set the state to redirect to dashboard
      navigate("/", { replace: true });
    }
  });

  const handleParentIDBlur = () => {
    // Check if the input is empty on blur and display an error if needed
    if (parentID.length < 4) {
      setParentIDError("Please enter your four digit Personal PIN.");
      setIsThereParentIDError(true);
    } else {
      setParentIDError("");
      setIsThereParentIDError(false);
    }
  };

  const handleParentPhoneNumberBlur = () => {
    if (parentLastFourDigitPhoneNumber.length < 4) {
      setParentLastFourDigitPhoneNumberError(
        "Please enter your last four digit phone number."
      );
      setParentLastFourDigitPhoneNumberErrorError(true);
    } else {
      setParentLastFourDigitPhoneNumberError("");
      setParentLastFourDigitPhoneNumberErrorError(false);
    }
  };

  const CheckIfParentExist = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("token = " + token);
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const fetchPromises = async () => {
        const url = `https://localhost:7021/SignIn/GetParentInfo?parentID=${parentID}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;
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
            `Failed to fetch data: ParentID = ${parentID}. Response status: ${response.status}`
          );
        }

        const data = await response.json();
        return data;
      };
      const results = await fetchPromises();
      console.log("Results:", results);
      // return data;
    } catch (error) {
      console.error("There is an error:", error);
      setParentIDError("Please enter your four digit Personal PIN.");
      setIsThereParentIDError(true);
      setParentLastFourDigitPhoneNumberError(
        "Please enter your last four digit phone number."
      );
      setParentLastFourDigitPhoneNumberErrorError(true);
    }
  };

  const handleGoFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (parentLastFourDigitPhoneNumber.length >= 4) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
          }
  
          const url = `https://localhost:7021/SignIn/GetParentInfo?parentID=${parentID}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;
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
              `Failed to fetch data: ParentID = ${parentID}. Response status: ${response.status}`
            );
          }
  
          const data = await response.json();
          console.log("Results:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [parentLastFourDigitPhoneNumber]);

  const InsertPhoneNumber = async (value: string) => {
    setParentLastFourDigitPhoneNumber(prevValue => prevValue + value);
  };

  const DeletePhoneNumber = () => {
    setParentLastFourDigitPhoneNumber(prevValue => prevValue.slice(0, -1));
  };

  return (
    <>
      <div>
        <button
          onClick={handleGoFullScreen}
          style={{ color: "blue", backgroundColor: "yellow" }}
        >
          Go Full Screen
        </button>
      </div>
      <div className="ContentComponentBody" id="my_fullscreen">
        <div className="CommentDropDown_Grid">
          <form onSubmit={CheckIfParentExist}>
            <TextField
              label="Your Personal PIN"
              sx={{ m: 1, width: "100%" }}
              value={parentID}
              onBlur={handleParentIDBlur}
              onChange={handleParentIDChange}
              // inputProps={{ maxLength: 4, style: { fontSize: "100px" } }}
              inputProps={{ maxLength: 4, inputMode: "numeric" }}
              error={Boolean(isThereParentIDError)}
              helperText={parentIDError}
              type="password"
            />

            <TextField
              className="textAreaFullWidth"
              label="Last 4 Digit Phone Number"
              sx={{ m: 1, width: "100%" }}
              onBlur={handleParentPhoneNumberBlur}
              onChange={handleParentPhoneNumberChange}
              inputProps={{ maxLength: 4, inputMode: "numeric" }}
              error={Boolean(isParentLastFourDigitPhoneNumberErrorError)}
              helperText={parentLastFourDigitPhoneNumberError}
              value={parentLastFourDigitPhoneNumber}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            
          </form>
          <div className="PhoneNumber_Grid">
          <button className="grid-item" onClick={() => InsertPhoneNumber('1')}>1</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('2')}>2</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('3')}>3</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('4')}>4</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('5')}>5</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('6')}>6</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('7')}>7</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('8')}>8</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('9')}>9</button>
          <button className="grid-item" onClick={() => InsertPhoneNumber('0')}>0</button>
          <button className="grid-item" onClick={() => DeletePhoneNumber()}>{'\u232B'}</button>
          </div>
          
          <CongratulationsPopup showModel={show} setShowModel={setShow}/>

          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentSignIn;
