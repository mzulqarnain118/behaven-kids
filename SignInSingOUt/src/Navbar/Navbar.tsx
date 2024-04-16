import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { frontEndURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  // Add other properties if needed
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [, setShowAddNewParent] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [role, setRole] = useState<string>("");

  const handleGoFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    const setRoleFromToken = async () => {
      const token = await localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token) as DecodedToken;
        const userRole = decoded.role;

        setRole(userRole);
        setShowNavbar(() => true);
        console.log(userRole);
      } else {
        console.log("Token not found");
      }
    };

    // Call the function to set role once on component mount
    setRoleFromToken();
  }, []);

  useEffect(() => {
    const setRoleFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token) as DecodedToken;
        const userRole = decoded.role;

        setRole(userRole);
        setShowNavbar(() => true);
        console.log(userRole);
      } else {
        console.log("Token not found - v2");
      }
    };

    // Call the function to set role once on component mount
    setRoleFromToken();
  }, [showNavbar]);

  useEffect(() => {
    if (window.location.href === frontEndURLLocation) {
      setShowNavbar(false);
    }
  }, [window.location.href]);

  const GoToAddNewParent = () => {
    navigate("/AddParentInfo", { replace: true });
  };

  const GoToConnectParentWithChild = () => {
    navigate("/ConnectParentAndChildTogeter", { replace: true });
  };

  // const GoToParentSignInSignOut = () => {
  //   navigate("/PhoneNumber", { replace: true });
  // };

  const EditClientSignInSignOutTime = () => {
    navigate("/EditChildTime", { replace: true });
  };

  const GoToPhoneNumberPage = () => {
    navigate("/PhoneNumber", { replace: true });
  };

  const AddNewClientAsCurrent = () => {
    navigate("/addchildinfo", { replace: true });
  };

  const CheckParentsTemporaryPin = () => {
    navigate("/ReceptionistGivesTemporaryPinToParent", { replace: true });
  };

  useEffect(() => {
    const exitFullScreenHandler = () => {
      setShowNavbar(true); // Show the navbar when exiting fullscreen
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        exitFullScreenHandler();
      }
    };

    const handleGoFullScreen = () => {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
        document.addEventListener("fullscreenchange", handleFullScreenChange);
        document.addEventListener("keydown", escapeKeyHandler);
      }
    };

    const escapeKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        exitFullScreenHandler();
      }
    };

    // Call handleGoFullScreen when needed
    handleGoFullScreen();

    // Cleanup function
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("keydown", escapeKeyHandler);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Set the state to redirect to dashboard
      setShowAddNewParent(false);
    } else {
      setShowAddNewParent(true);
    }
  }, [localStorage.getItem("token")]);

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
    {(showNavbar === true && role === "parent") && (
      <nav className="navbar bg-white fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
     
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            style={{marginTop: "15px", marginRight: "15px"}}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{ width: "350px" }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item" style={{ height: "65px" }}>
                  <a className="nav-link active" aria-current="page" href="#" onClick={GoToPhoneNumberPage}>
                  <span style={{fontSize: "20px"}}>&#10227; Refresh</span> 
                  </a>
                </li>
                <li className="nav-item" style={{ height: "65px" }}>
                  <a className="nav-link active" aria-current="page" href="#" onClick={handleGoFullScreen}>
                  <span style={{fontSize: "20px"}}>&#10530; Full Screen</span> 
                  </a>
                </li>
                <li className="nav-item" style={{ height: "65px" }}>
                  <a className="nav-link" href="#" onClick={handleSignOut}>
                  <span style={{ fontSize: "20px" }}>&#x23FB;</span> Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      )}
      {(showNavbar === true && role !== "parent") && (
        <nav className="navbar navbar-expand-lg">
          <div className="container d-flex justify-content-between align-items-center">
            {role !== "parent" && (
              <a className="navbar-brand" href="#">
                <img
                  src={BehavenLogo}
                  alt="My Image"
                  style={{ height: "75px" }}
                />
              </a>
            )}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              aria-expanded={!collapsed ? "true" : "false"}
              aria-label="Toggle navigation"
              style={{ marginLeft: "80%" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
              id="navbarNav"
            >
              <ul className="navbar-nav ml-auto">
                {role === "admin" && (
                  <li className="nav-item active">
                    <a className="nav-link" href="#" onClick={GoToAddNewParent}>
                      Add New Parent
                    </a>
                  </li>
                )}
                {role === "admin" && (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={AddNewClientAsCurrent}
                    >
                      Client To Current
                    </a>
                  </li>
                )}
                {(role === "admin" || role === "secretary") && (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={CheckParentsTemporaryPin}
                    >
                      Parents Pin
                    </a>
                  </li>
                )}
                {(role === "admin" || role === "secretary") && (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={EditClientSignInSignOutTime}
                    >
                      Edit Time
                    </a>
                  </li>
                )}
                {role === "admin" && (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={GoToConnectParentWithChild}
                    >
                      Connect
                    </a>
                  </li>
                )}
              </ul>
               <div style={{ width: "100%", textAlign: "right" }}>
                <div style={{ marginLeft: "100px" }}>
                  <button
                    style={{
                      width: "150px",
                      height: "50px",
                      marginRight: "25px",
                    }}
                    className="btn btn-info"
                    onClick={handleGoFullScreen}
                  >
                    Go Full Screen
                  </button>
                  <button
                    style={{ width: "150px", height: "50px" }}
                    className="btn btn-danger"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div> 
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
