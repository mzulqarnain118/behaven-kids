// import "./navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
// import SiteLogo from "../../assets/reportcardhub.png";
// import homeIcon from "../../assets/home.svg";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/ParentSignIn", { replace: true });
      };
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "white" }}
    >
      <div className="container-fluid">
        <Link to="/" className="nav-link active" aria-current="page">
          {/* <img
            src={SiteLogo}
            aria-hidden="true"
            style={{ width: "300px", height: "60px" }}
            alt="Site Logo"
          ></img> */}
        </Link>

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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active LinkStyle"
                aria-current="page"
                style={{
                  marginLeft: "50px",
                  fontSize: "20px",
                  fontWeight: "700",

                }}
              >
                Add New Parent
              </Link>
            </li>
            <li className="nav-item">
            <button onClick={handleSignOut}>Sign Out</button>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
