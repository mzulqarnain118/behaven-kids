import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
import LogoutLogo from "../assets/logout.png";
import FullScreenLogo from "../assets/expand.png";
import Refresh from "../assets/refresh.png";

interface DecodedToken {
  role: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [role, setRole] = useState<string>("");

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const closeOffcanvas = useCallback(() => setIsOffcanvasOpen(false), []);

  const handleToggleOffcanvas = useCallback(
    () => setIsOffcanvasOpen((prev) => !prev),
    []
  );

  const handleGoFullScreen = useCallback(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setShowNavbar(false);
    }
    closeOffcanvas();
  }, [closeOffcanvas]);

  const setRoleFromToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token) as DecodedToken;
      setRole(decoded.role);
      setShowNavbar(true);
    } else {
      console.log("Token not found");
    }
  }, []);

  useEffect(() => {
    setRoleFromToken();
  }, [setRoleFromToken]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/#") {
      setShowNavbar(false);
    }
  }, [location.pathname]);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path, { replace: true });
      closeOffcanvas();
    },
    [navigate, closeOffcanvas]
  );

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    handleNavigation("/");
  }, [handleNavigation]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setShowNavbar(true);
      }
    };

    const escapeKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setShowNavbar(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("keydown", escapeKeyHandler);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("keydown", escapeKeyHandler);
    };
  }, []);

  const renderNavItem = useCallback(
    (text: string, onClick: () => void, icon?: string) => (
      <li className="nav-item" style={{ height: "65px" }}>
        <a
          className="nav-link active"
          aria-current="page"
          href="#"
          onClick={onClick}
        >
          <span style={{ fontSize: "20px" }}>
            {icon && (
              <img
                src={icon}
                style={{
                  width: "22px",
                  height: "22px",
                  marginRight: "5px",
                  marginBottom: "3px",
                }}
                alt=""
              />
            )}
            {text}
          </span>
        </a>
      </li>
    ),
    []
  );

  const renderParentNavbar = () => (
    <nav className="navbar bg-white fixed-top">
      <div className="container-fluid">
        {location.pathname.includes("ParentsPin") ||
        location.pathname.includes("ChooseWhichChildren") ||
        location.pathname.includes("ValidateEmailAddress") ||
        location.pathname.includes("ValidateTemporaryPin") ||
        location.pathname.includes("ResetPin") ? (
          <a
            className="navbar-brand"
            href="#"
            onClick={() => handleNavigation("/PhoneNumber")}
            style={{ fontSize: "60px", color: "black" }}
          >
            {"\u2190"}
          </a>
        ) : (
          <a className="navbar-brand" href="#" style={{ fontSize: "60px" }}></a>
        )}
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
          className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ width: "350px" }}
        >
          <div className="offcanvas-header">
            <img src={BehavenLogo} alt="My Image" style={{ height: "60px" }} />
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
              {renderNavItem(
                "Refresh",
                () => handleNavigation("/PhoneNumber"),
                Refresh
              )}
              {renderNavItem("Full Screen", handleGoFullScreen, FullScreenLogo)}
              {renderNavItem("Sign Out", handleSignOut, LogoutLogo)}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderStaffNavbar = () => (
    <nav className="navbar bg-white">
      <div className="container-fluid">
        {location.pathname.includes("ssnpin") ? (
          <a
            className="navbar-brand"
            href="#"
            onClick={() => handleNavigation("/timeoutselectaclient")}
            style={{ fontSize: "60px", color: "black" }}
          >
            {"\u2190"}
          </a>
        ) : (
          <a className="navbar-brand" href="#" style={{ fontSize: "60px" }}></a>
        )}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleOffcanvas}
          aria-controls="offcanvasNavbar"
          style={{ marginTop: "15px", marginRight: "15px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {!location.pathname.includes("ssnpin") && (
          <img
            src={BehavenLogo}
            alt="My Image"
            style={{
              height: "75px",
              position: "fixed",
              top: "5%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <div
          className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ width: "350px" }}
        >
          <div className="offcanvas-header">
            <img src={BehavenLogo} alt="My Image" style={{ height: "60px" }} />
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
              {renderNavItem(
                "Refresh",
                () => handleNavigation("/timeoutselectaclient"),
                Refresh
              )}
              {renderNavItem("Full Screen", handleGoFullScreen, FullScreenLogo)}
              {renderNavItem("Sign Out", handleSignOut, LogoutLogo)}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderAdminNavbar = () => (
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
        <img
          src={BehavenLogo}
          alt="My Image"
          style={{ height: "75px", marginRight: "45%" }}
        />
        <div
          className={`offcanvas offcanvas-start ${
            isOffcanvasOpen ? "show" : ""
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
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {role === "admin" && (
                <>
                  {renderNavItem("Add New Parent", () =>
                    handleNavigation("/AddParentInfo")
                  )}
                  {renderNavItem("Make Clients Active", () =>
                    handleNavigation("/MakeClientCurrent")
                  )}
                  {renderNavItem("Connect Parents To Client(s)", () =>
                    handleNavigation("/ConnectParentAndChildTogeter")
                  )}
                  {renderNavItem("Client In/Out/No show", () =>
                    handleNavigation("/ClientInOutNoShow")
                  )}
                  {renderNavItem("SDP Panel", () =>
                    handleNavigation("/SdpPanel")
                  )}
                  {renderNavItem("ABA Panel", () =>
                    handleNavigation("/AbaPanel")
                  )}
                  {renderNavItem("CMS", () => handleNavigation("/cms"))}
                  {renderNavItem("Staff", () => handleNavigation("/staff"))}
                </>
              )}
              {(role === "admin" || role === "secretary") && (
                <>
                  {renderNavItem("Check Parents Temporary Pin", () =>
                    handleNavigation("/ReceptionistGivesTemporaryPinToParent")
                  )}
                  {renderNavItem("Sign In/Out Management", () =>
                    handleNavigation("/EditChildTime")
                  )}
                </>
              )}
              {renderNavItem("Sign Out", handleSignOut)}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );

  if (!showNavbar) return null;

  if (role === "parent") return renderParentNavbar();
  if (role === "floor" || role === "rbt" || role.includes("tor"))
    return renderStaffNavbar();
  return renderAdminNavbar();
};

export default Navbar;
