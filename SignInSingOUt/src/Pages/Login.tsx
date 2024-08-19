import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import personLogInImage from "../assets/personLogIn.svg";
import lockPassword from "../assets/lockPassword.svg";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import { jwtDecode } from "jwt-decode";
import { ApiCall } from "../utils/ApiCall";
import { Toast } from "../Components/common/Toast/Toast";

interface DecodedToken {
  role: string;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (role: string) => {
    switch (role) {
      case "parent":
        navigate("/PhoneNumber");
        break;
      case "admin":
      case "secretary":
        navigate("/EditChildTime");
        break;
      case "floor":
        navigate("/CbsAddOrTransferClientsToRooms");
        break;
      case "rbt":
      case "thr":
        navigate("/rbtaddortransferclientstorooms");
        break;
      default:
        if (role.includes("tor")) navigate("/timeoutselectaclient");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await ApiCall(
        "UserAuthentication/SignIn",
        "POST",
        null,
        { username, password }
      );
      if (response?.token) {
        Toast("User Logged-In Successfully.");
        localStorage.setItem("token", response.token);
        const { role } = jwtDecode(response.token) as DecodedToken;
        handleNavigation(role);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <img
        src={BehavenLogo}
        alt="Behaven Logo"
        style={{
          height: "125px",
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form onSubmit={handleLogin}>
          <div className="card" style={{ width: "500px", textAlign: "center" }}>
            <div className="card-body">
              <h2 style={{ fontWeight: "700", marginBottom: "30px" }}>Login</h2>
              {["username", "password"].map((field) => (
                <div className="input-group mb-3" key={field}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src={
                          field === "username" ? personLogInImage : lockPassword
                        }
                        style={{ height: "46px", width: "46px" }}
                        alt={`${field} icon`}
                      />
                    </span>
                  </div>
                  <input
                    style={{ height: "60px", width: "200px", fontSize: "25px" }}
                    type={field === "username" ? "text" : "password"}
                    className="form-control"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={field === "username" ? username : password}
                    onChange={(e) =>
                      field === "username"
                        ? setUsername(e.target.value)
                        : setPassword(e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ marginTop: "30px", width: "100%" }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
