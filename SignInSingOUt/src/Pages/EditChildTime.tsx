import React, { useState, useEffect } from 'react';
import { backEndCodeURLLocation } from "../config";

interface SignInSignOut {
  id: number;
  signInTime: string;
  signOutTime: string;
}

const EditChildTime: React.FC = () => {
  const [schedule, setSchedule] = useState<SignInSignOut[]>([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`${backEndCodeURLLocation}SignIn/GetAllSignInAndOutTimeOfTheDay`);
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      } else {
        console.error('Error fetching schedule:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const handleUpdateTime = async (id: number, field: 'signInTime' | 'signOutTime', newValue: string) => {
    try {
      const response = await fetch(`/api/UpdateSignInSignOutTime/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: newValue }),
      });
      if (response.ok) {
        // Assuming successful update, update the local state
        setSchedule(prevSchedule =>
          prevSchedule.map(item => (item.id === id ? { ...item, [field]: newValue } : item))
        );
      } else {
        console.error('Error updating time:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating time:', error);
    }
  };

  return (
    <div>
      <h2>Time Schedule Editor</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sign In Time</th>
            <th>Sign Out Time</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <input
                  type="time"
                  value={item.signInTime}
                  onChange={e => handleUpdateTime(item.id, 'signInTime', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={item.signOutTime}
                  onChange={e => handleUpdateTime(item.id, 'signOutTime', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditChildTime;
