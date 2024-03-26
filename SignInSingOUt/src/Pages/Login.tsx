import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    // Check if the user is already authenticated (e.g., token exists)
    const token = localStorage.getItem('token');
    if (token) {
      // Set the state to redirect to dashboard
      navigate("/PhoneNumber", { replace: true });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        // `https://192.168.0.9:9999/UserAuthentication/SignIn?userName=${username}&password=${password}`,
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
      
      navigate("/ParentSignIn", { replace: true });

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginPage;
