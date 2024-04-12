
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { frontEndURLLocation } from "../config";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showAddNewParent, setShowAddNewParent] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const handleGoFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    if (window.location.href === frontEndURLLocation) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    const token = localStorage.getItem("token");
    setShowAddNewParent(!!token);
  }, [window.location.href]);

  const GoToAddNewParent = () => {
    navigate("/AddParentInfo", { replace: true });
  };

  const GoToConnectParentWithChild = () => {
    navigate("/ConnectParentAndChildTogeter", { replace: true });
  };

  const GoToParentSignInSignOut = () => {
    navigate("/PhoneNumber", { replace: true });
  };

  const EditClientSignInSignOutTime = () => {
    navigate("/EditChildTime", { replace: true });
  };

  const AddNewClientAsCurrent = () => {
    navigate("/addchildinfo", { replace: true });
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

  return (
    <>
      {showNavbar && (
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "white" }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item" style={{marginRight: "25px"}}>
                  {showAddNewParent ? (
                    <button
                    style={{width: "150px", height: "50px"}}
                      className="btn btn-light"
                      onClick={GoToAddNewParent}
                    >
                      Add New Parent
                    </button>
                  ) : null}
                </li>

                <li className="nav-item" style={{marginRight: "25px"}}>
                  {showAddNewParent ? (
                    <button
                    style={{width: "250px", height: "50px"}}
                      className="btn btn-light"
                      onClick={AddNewClientAsCurrent}
                    >
                      Add New Client As Current
                    </button>
                  ) : null}
                </li>

                <li className="nav-item" style={{marginRight: "25px"}}>
                  {showAddNewParent ? (
                    <button
                    style={{width: "200px", height: "50px"}}
                      className="btn btn-light"
                      onClick={EditClientSignInSignOutTime}
                    >
                      Edit Sign in/out Time
                    </button>
                  ) : null}
                </li>
               
                <li className="nav-item" style={{marginRight: "25px"}}>
                  {showAddNewParent ? (
                    <button
                    style={{width: "150px", height: "50px"}}
                      className="btn btn-light"
                      onClick={GoToConnectParentWithChild}
                    >
                      Connect
                    </button>
                  ) : null}
                </li>
                <li className="nav-item" style={{marginRight: "25px"}}>
                  {showAddNewParent ? (
                    <button
                    style={{width: "175px", height: "50px"}}
                      className="btn btn-light"
                      onClick={GoToParentSignInSignOut}
                    >
                      Parent Sign In/Out
                    </button>
                  ) : null}
                </li>
                <li className="nav-item" style={{marginRight: "25px"}}>
                  <button
                   style={{width: "150px", height: "50px"}}
                    className="btn btn-info"
                    onClick={handleGoFullScreen}
                  >
                    Go Full Screen
                  </button>
                </li>
                <li className="nav-item" style={{marginRight: "25px"}}>
                  <button
                    style={{width: "150px", height: "50px"}}
                    className="btn btn-danger"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
