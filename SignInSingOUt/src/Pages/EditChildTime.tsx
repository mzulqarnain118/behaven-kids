import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import moment from "moment";
import "./CSS/EditChildTime.css";

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
    newValue: string,
  ) => {
    try {
      // Assuming successful update, update the local state
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

  // const EditSignInSignOutTime = async () => {
  //   setEditing(true);
  // };
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const EditSignInSignOutTime = (itemId: number) => {
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
                  onClick={() => EditSignInSignOutTime(item.id)}
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
  </div>
  );
};

export default EditChildTime;
