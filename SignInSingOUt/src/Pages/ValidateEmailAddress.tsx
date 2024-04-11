import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";

const ValidateEmailAddress: React.FC = () => {
  const location = useLocation();
  const [showErrorMessage, ] = useState<boolean>(false);
  const [parentsEmailAddress, setParentsEmailAddress] = useState<string>("");
  const [parentLastFourDigitPhoneNumber, ] = useState<string>(location.state?.parentLastFourDigitPhoneNumber);

  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      console.log("parentLastFourDigitPhoneNumber = " + parentLastFourDigitPhoneNumber);
      console.log("parentsEmailAddress = " + parentsEmailAddress);

      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/SendAnEmail?parentPhoneNumber=${parentLastFourDigitPhoneNumber}&parentEmailAddress=${parentsEmailAddress}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error(
          `Error:`,
          response.statusText
        );
        return;
      }
      navigate("/ValidateTemporaryPin", { replace: true, state: {
        parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
      }, });
    } catch (error) {
      console.error(`Error:`, error);
    }
  };

  return (
    <div className="ContentComponentBody" id="my_fullscreen">
      <div className="CommentDropDown_Grid">
        <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
        <br />
        <form onSubmit={handleSubmit}>
        <p style={{ fontSize: "20px" }} >
          Please enter your account email to retrive your Pin
        </p>

        <div>
          <label htmlFor="validationDefaultUsername">Email</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend2">
                &#9993;
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              id="validationDefaultUsername"
              placeholder="Your Email"
              aria-describedby="inputGroupPrepend2"
              onChange={(e) => setParentsEmailAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
        </form>
        
      </div>

      {showErrorMessage && (
        <ErrorMessage message={"Couldn't Find Email Address"} />
      )}
    </div>
  );
};

export default ValidateEmailAddress;
