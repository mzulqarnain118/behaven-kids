import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import personLogInImage from "../assets/personLogIn.svg";
import lockPassword from "../assets/lockPassword.svg";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated (e.g., token exists)
    const token = localStorage.getItem("token");
    if (token) {
      // Set the state to redirect to dashboard
      navigate("/PhoneNumber", { replace: true });
      
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${backEndCodeURLLocation}UserAuthentication/SignIn?userName=${username}&password=${password}`,
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

      navigate("/PhoneNumber");
    
    // Refresh the page
    window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: "0 auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <form onSubmit={handleLogin}>
          <div className="card" style={{ width: "500px", textAlign: "center" }}>
            <div className="card-body">
              <h2 style={{ fontWeight: "700", marginBottom: "30px" }}>Login</h2>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <img
                      src={personLogInImage}
                      style={{ height: "46px", width: "46px" }}
                    />
                  </span>
                </div>
                <input
                  style={{ height: "60px", width: "200px", fontSize: "25px" }}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></input>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <img
                      src={lockPassword}
                      style={{ height: "46px", width: "46px" }}
                    />
                  </span>
                </div>
                <input
                  style={{ height: "60px", width: "200px", fontSize: "25px" }}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ marginTop: "30px", width: "100%" }}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
