import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  const [goFullScreen, setGoFullScreen] = useState(false);
  const [parentID, setParentID] = useState<string>();
  const [parentLastFourDigitPhoneNumber, setParentLastFourDigitPhoneNumber] = useState<string>();


  useEffect(() => {
    let e = document.getElementById("my_fullscreen");
    e?.requestFullscreen();
  }, [goFullScreen]);

  const CheckIfParentExist = async (
  ) => {
    try {
      // if (date === undefined) {
      //   return null; // or whatever value you want to return for empty dates
      // }

      const url = `https://localhost:7021/SignIn/GetParentInfo?parentID=${parentID}&parentPhoneNumber=${parentLastFourDigitPhoneNumber}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ParentID = ${parentID}. Response status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("data = " + data);
        // return data;
      } catch (error) {
        console.error(
          `Failed to fetch schedule for date: ${parentID}. Error: ${error}`
        );
        return null; // or whatever value you want to return for failed fetch calls
      }
    } catch (error) {
      console.error("There is an error:", error);
    }
  };

  return (
    <>
      <div className="ContentComponentBody">
        <button
          onClick={() => {
            setGoFullScreen(!goFullScreen);
          }}
          id="my_fullscreen"
          style={{ color: "blue", backgroundColor: "yellow" }}
        >
          Go Full Screen
        </button>
        <div className="CommentDropDown_Grid">
          <form onSubmit={CheckIfParentExist}>
          <TextField
            label="Your Personal PIN"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "100%" }}
            onChange={(event) => setParentID(event.target.value)}
          />

          <TextField
            className="textAreaFullWidth"
            label="Last 4 Digit Phone Number"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "100%" }}
            onChange={(event) => setParentLastFourDigitPhoneNumber(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
