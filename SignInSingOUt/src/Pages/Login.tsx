import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backEndCodeURLLocation } from "../config";
import personLogInImage from "../assets/personLogIn.svg";
import lockPassword from "../assets/lockPassword.svg";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  // Add other properties if needed
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [didUserClickedOnTheLoginButton, setDidUserClickedOnTheLoginButton] = useState<boolean>(false);
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set the state to redirect to dashboard
      const decoded = jwtDecode(token) as DecodedToken;
      const userRole = decoded.role;
      if (userRole === "parent")
        navigate("/PhoneNumber");
      else if (userRole === "admin" || userRole === "secretary")
        navigate("/EditChildTime");
      else if (userRole === "floor")
        navigate("/CbsAddOrTransferClientsToRooms");
      else if (userRole.includes("tor"))
        navigate("/timeoutselectaclient")

    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setDidUserClickedOnTheLoginButton(true);
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

      const decoded = jwtDecode(token) as DecodedToken;
      const userRole = decoded.role;

      if (userRole === "parent")
        navigate("/PhoneNumber");
      else if (userRole === "admin" || userRole === "secretary")
        navigate("/EditChildTime");
      else if (userRole.includes("tor"))
        navigate("/timeoutselectaclient") 

      window.location.reload();
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        alert("Connection lost. Please check your internet connection.");
        window.location.reload();
      } else {
        alert("Login failed:" + error.message);
        window.location.reload();
      }
    }
  };

  return (
    <>
      <img
        src={BehavenLogo}
        alt="My Image"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "125px",
          margin: "0 auto",
          position: "absolute",
          top: "20%",
          left: "49%",
          transform: "translate(-50%, -50%)",

        }}
      />
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
                disabled={didUserClickedOnTheLoginButton}
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
