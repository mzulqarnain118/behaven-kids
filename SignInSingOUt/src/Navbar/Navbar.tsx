import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { frontEndURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
import LogoutLogo from "../assets/logout.png";
import FullScreenLogo from "../assets/expand.png";
import Refresh from "../assets/refresh.png";

interface DecodedToken {
  role: string;
  // Add other properties if needed
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [, setShowAddNewParent] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [role, setRole] = useState<string>("");

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleToggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleGoFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setShowNavbar(false);
    }
    closeOffcanvas();
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
    if (window.location.href === frontEndURLLocation || window.location.href === frontEndURLLocation + "#") {
      setShowNavbar(false);
    }
  }, [window.location.href]);

  const GoToAddNewParent = () => {
    navigate("/AddParentInfo", { replace: true });
  };

  const GoToConnectParentWithChild = () => {
    navigate("/ConnectParentAndChildTogeter", { replace: true });
  };

  const GoToClientInOutNoShow = () => {
    navigate("/ClientInOutNoShow", { replace: true });
  };

  const EditClientSignInSignOutTime = () => {
    navigate("/EditChildTime", { replace: true });
  };

  const GoToPhoneNumberPage = () => {
    navigate("/PhoneNumber", { replace: true });
    closeOffcanvas();
  };


  const GoToTimeOutSelectAClient = () => {
    navigate("/timeoutselectaclient", { replace: true });
    closeOffcanvas();
  };

  const AddNewClientAsCurrent = () => {
    navigate("/MakeClientCurrent", { replace: true });
  };

  const CheckParentsTemporaryPin = () => {
    navigate("/ReceptionistGivesTemporaryPinToParent", { replace: true });
  };

  const GoToSDPPanel = () => {
    navigate("/SdpPanel", { replace: true });
  };

  const goToABAPanel = () => {
    navigate("/AbaPanel", { replace: true });
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
    closeOffcanvas();
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

  // const [collapsed, setCollapsed] = useState(true);

  // const toggleNavbar = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <>
      {showNavbar === true && role === "parent" && (
        <nav className="navbar bg-white fixed-top">
          <div className="container-fluid">
          

            {(window.location.href.includes('ParentsPin') || window.location.href.includes('ChooseWhichChildren') || window.location.href.includes('ValidateEmailAddress') || window.location.href.includes('ValidateTemporaryPin') || window.location.href.includes('ResetPin')) ? (
              <a className="navbar-brand" href="#" onClick={GoToPhoneNumberPage} style={{fontSize: "60px", color: "black"}}>{'\u2190'}</a>
            ) : (<a className="navbar-brand" href="#" style={{fontSize: "60px"}}></a>)} 
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggleOffcanvas}
              aria-controls="offcanvasNavbar"
              style={{ marginTop: "15px", marginRight: "15px" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            

            <div
              className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""
                }`}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              style={{ width: "350px" }}
            >
              <div className="offcanvas-header">
                <img
                  src={BehavenLogo}
                  alt="My Image"
                  style={{ height: "60px" }}
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{ marginRight: "5px" }}
                  onClick={closeOffcanvas}
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item" style={{ height: "65px" }}>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={GoToPhoneNumberPage}
                    >
                      <span style={{ fontSize: "20px" }}><img src={Refresh} style={{ width: "22px", height: "22px", marginRight: "5px", marginBottom: "3px" }}></img> Refresh </span> 
                    </a>
                  </li>
                  <li className="nav-item" style={{ height: "65px" }}>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={handleGoFullScreen}
                    >
                      <span style={{ fontSize: "20px" }}><img src={FullScreenLogo} style={{ width: "22px", height: "22px", marginRight: "5px", marginBottom: "3px" }}></img> Full Screen </span> 
                    </a>
                  </li>
                  <li className="nav-item" style={{ height: "65px" }}>
                    <a className="nav-link" href="#" onClick={handleSignOut}>
                      <span style={{ fontSize: "20px" }}><img src={LogoutLogo} style={{ width: "25px", height: "25px", marginRight: "5px", marginBottom: "3px" }}></img> Sign Out</span> 
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
      {showNavbar === true && (role === "floor" || role === "rbt" || role.includes("tor")) && (
        <nav className="navbar bg-white">
          <div className="container-fluid">
          

            {(window.location.href.includes('ssnpin')) ? (
              <a className="navbar-brand" href="#" onClick={GoToTimeOutSelectAClient} style={{fontSize: "60px", color: "black"}}>{'\u2190'}</a>
            ) : (<a className="navbar-brand" href="#" style={{fontSize: "60px"}}></a>)} 
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggleOffcanvas}
              aria-controls="offcanvasNavbar"
              style={{ marginTop: "15px", marginRight: "15px" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {!window.location.href.includes('ssnpin') && (
            <img  src={BehavenLogo} alt="My Image" 
                style={{ 
                  height: "75px", 
                  position: "fixed", 
                  top: "5%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)" 
                }} 
              />
            )}

            <div className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              style={{ width: "350px" }}
            >
              <div className="offcanvas-header">
                <img
                  src={BehavenLogo}
                  alt="My Image"
                  style={{ height: "60px" }}
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{ marginRight: "5px" }}
                  onClick={closeOffcanvas}
                ></button>
              </div>
              
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item" style={{ height: "65px" }}>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={GoToTimeOutSelectAClient}
                    >
                      <span style={{ fontSize: "20px" }}><img src={Refresh} style={{ width: "22px", height: "22px", marginRight: "5px", marginBottom: "3px" }}></img> Refresh </span> 
                    </a>
                  </li>
                  <li className="nav-item" style={{ height: "65px" }}>
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={handleGoFullScreen}
                    >
                    <span style={{ fontSize: "20px" }}><img src={FullScreenLogo} style={{ width: "22px", height: "22px", marginRight: "5px", marginBottom: "3px" }}></img> Full Screen </span> 
                    </a>
                  </li>
                  <li className="nav-item" style={{ height: "65px" }}>
                    <a className="nav-link" href="#" aria-current="page" onClick={handleSignOut}>
                    <span style={{ fontSize: "20px" }}><img src={LogoutLogo} style={{ width: "25px", height: "25px", marginRight: "5px", marginBottom: "3px" }}></img> Sign Out</span> 
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
      {showNavbar === true && role !== "parent" && !role.includes("tor") && role !== "floor" && role !== "rbt"  && (
        <nav className="navbar bg-white ">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggleOffcanvas}
              aria-controls="offcanvasNavbar"
              style={{ marginLeft: "25px" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <img src={BehavenLogo} alt="My Image" style={{ height: "75px", marginRight: "45%" }} />

            <div
              className={`offcanvas offcanvas-start ${isOffcanvasOpen ? "show" : ""
                }`}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              style={{ width: "350px" }}
            >
              <div className="offcanvas-header">

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{ marginRight: "5px" }}
                  onClick={closeOffcanvas}
                ></button>
              </div>
              <div className="offcanvas-body">
                {/* <div style={{backgroundColor: "green", height: "50px"}}></div> */}
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  {role === "admin" && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={GoToAddNewParent}
                      >
                        <span style={{ fontSize: "20px" }}>Add New Parent</span>
                      </a>
                    </li>
                  )}
                  {role === "admin" && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={AddNewClientAsCurrent}
                      >
                        <span style={{ fontSize: "20px" }}>Make Clients Active</span>
                      </a>
                    </li>
                  )}
                  {(role === "admin" || role === "secretary") && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={CheckParentsTemporaryPin}
                      >
                        <span style={{ fontSize: "20px" }}>Check Parents Temporary Pin</span>
                      </a>
                    </li>
                  )}
                  {(role === "admin" || role === "secretary") && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={EditClientSignInSignOutTime}
                      >
                        <span style={{ fontSize: "20px" }}>Sign In/Out Management</span>
                      </a>
                    </li>
                  )}
                  {role === "admin" && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={GoToConnectParentWithChild}
                      >
                        <span style={{ fontSize: "20px" }}> Connect Parents To Client(s)</span>
                      </a>
                    </li>
                  )}
                  {role === "admin" && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={GoToClientInOutNoShow}
                      >
                        <span style={{ fontSize: "20px" }}>Client In/Out/No show</span>
                      </a>
                    </li>
                  )}
                  {role === "admin" && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={GoToSDPPanel}
                      >
                        <span style={{ fontSize: "20px" }}>SDP Panel</span>
                      </a>
                    </li>
                  )}
                  {role === "admin" && (
                    <li className="nav-item" style={{ height: "65px" }}>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={goToABAPanel}
                      >
                        <span style={{ fontSize: "20px" }}>ABA Panel</span>
                      </a>
                    </li>
                  )}

                  <li className="nav-item" style={{ height: "65px" }}>
                    <a className="nav-link" href="#" onClick={handleSignOut}>
                      <span style={{ fontSize: "20px" }}></span> Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
