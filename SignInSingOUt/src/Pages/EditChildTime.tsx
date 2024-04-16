import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import moment, { min } from "moment";
import "./CSS/EditChildTime.css";
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';

interface SignInSignOut {
  id: number;
  signInTime: string;
  signOutTime: string;
  signInAndOutDate: string;
  clientFirstName: string;
  clientLastName: string;
}

const EditChildTime: React.FC = () => {
  const [schedule, setSchedule] = useState<SignInSignOut[]>([]);
  const [selectSignOutTime, setSelectSignOutTime] = useState<string>("");

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/GetAllSignInAndOutTimeOfTheDay`
      );
      if (response.ok) {
        const data = await response.json();
        data.forEach((item: SignInSignOut) => {
          item.signInTime = moment(item.signInTime, "HH:mm").format("HH:mm");
          item.signOutTime = moment(item.signOutTime, "HH:mm").format("HH:mm");
        });
        setSchedule(data);
      } else {
        console.error("Error fetching schedule:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleUpdateTime = async (
    id: number,
    field: "signInTime" | "signOutTime",
    newValue: string
  ) => {
    try {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      // Parse the input time (newValue) into hours and minutes
      const [newHours, newMinutes] = newValue.split(":").map(Number);

      // Convert both current and input times to minutes
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const newValueInMinutes = newHours * 60 + newMinutes;

      console.log("New value = " + newValue);
      console.log("Current time = " + newValueInMinutes);
      if (newValueInMinutes > currentTimeInMinutes) {
        alert("Choose a time [not greater] than the current time.");

        return;
      }

      if (field === "signInTime") {
        const [newSignInHours, newSignInMinutes] = newValue
          .split(":")
          .map(Number);

        const newSignInTime = newSignInHours * 60 + newSignInMinutes;

        const [signOutHours, signOutMinutes] = selectSignOutTime
          .split(":")
          .map(Number);

        const currentSignOutTime = signOutHours * 60 + signOutMinutes;

        if (newSignInTime > currentSignOutTime) {
          alert("[Sign In Time] Greater Than [Sign Out Time]");

          return;
        }
      }

      if (field === "signOutTime") {
        setSelectSignOutTime(() => newValue);
      }

      setSchedule((prevSchedule) =>
        prevSchedule.map((item) =>
          item.id === id ? { ...item, [field]: newValue } : item
        )
      );
    } catch (error) {
      console.error("Error updating time:", error);
    }
  };

  const UpdateSignInSignOutTime = async (
    id: number,
    signInTime: string,
    signOutTime: string
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/EditSignInSignOutTime?id=${id}&signInTime=${signInTime}&signOutTime=${signOutTime}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(clientIDs),
        }
      );
      CancelEditSignInSignOutTime();
      if (!response.ok) {
        console.error(`Failed to post data :`, response.statusText);
      }
    } catch (error) {
      console.error(`Error posting data:`, error);
    }
  };

  const CancelEditSignInSignOutTime = () => {
    setEditingItemId(null);
  };

  const SaveToExcelAndConvertToPDF = async () => {
    const ws = XLSX.utils.json_to_sheet(schedule);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert workbook to a binary Excel file
    const excelData = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    const excelBlob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('excelFile', excelBlob, 'data.xlsx');

        const response = await fetch(`${backEndCodeURLLocation}SignIn/ConvertExcelToPDF`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });

        if (!response.ok) {
            console.error('Error:', response.statusText);
            // Handle error
        } else {
            // File successfully sent and converted to PDF
            const pdfBlob = await response.blob();
            // Handle the PDF blob, for example, you can download it or display it
        }
    } catch (error) {
        // Handle fetch error
        console.error('Fetch Error:', error);
    }
};


  // const EditSignInSignOutTime = async () => {
  //   setEditing(true);
  // };
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const EditSignInSignOutTime = (
    itemId: number,
    currentSignOutTime: string
  ) => {
    setSelectSignOutTime(() => currentSignOutTime);
    setEditingItemId(itemId);
  };

  return (
    <div className="time-schedule-editor">
      <h2>Time Schedule Editor</h2>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Client Name</th>
            <th>Sign In Time</th>
            <th>Sign Out Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td>
                {item.clientFirstName} {item.clientLastName}
              </td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={item.signInTime}
                  onChange={(e) =>
                    handleUpdateTime(item.id, "signInTime", e.target.value)
                  }
                  disabled={editingItemId !== item.id}
                />
              </td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={item.signOutTime}
                  onChange={(e) =>
                    handleUpdateTime(item.id, "signOutTime", e.target.value)
                  }
                  disabled={editingItemId !== item.id}
                />
              </td>
              <td>
                {editingItemId !== item.id ? (
                  <button
                    className="btn btn-edit"
                    onClick={() =>
                      EditSignInSignOutTime(item.id, item.signOutTime)
                    }
                  >
                    Edit
                  </button>
                ) : (
                  <span>
                    <button
                      className="btn btn-cancel"
                      onClick={() => CancelEditSignInSignOutTime()}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-update"
                      onClick={() =>
                        UpdateSignInSignOutTime(
                          item.id,
                          item.signInTime,
                          item.signOutTime
                        )
                      }
                    >
                      Update
                    </button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={SaveToExcelAndConvertToPDF}>Hello</button>
    </div>
  );
};

export default EditChildTime;
