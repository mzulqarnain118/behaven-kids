import { useState } from "react";
import TextField from "@mui/material/TextField";
import CongratulationsPopup from "./Components/PopupCongrats";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const [parentID, setParentID] = useState<string>("");
  const [parentLastFourDigitPhoneNumber, setParentLastFourDigitPhoneNumber] =
    useState<string>("");
  const [parentIDError, setParentIDError] = useState<string>();
  const [isThereParentIDError, setIsThereParentIDError] = useState<boolean>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://localhost:7021/UserAuthentication/SignIn?userName=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token } = await response.json();

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
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
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <CongratulationsPopup showModel={show} setShowModel={setShow}/>

          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
}

export default App;
