import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { backEndCodeURLLocation } from "../config";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import ErrorMessage from "../Components/ErrorMessage";

const ValidateEmailAddress: React.FC = () => {
  const [didUserPutAnEmailAddress, setDidUserPutAnEmailAddress] =
    useState(true);
  const location = useLocation();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [parentsEmailAddress, setParentsEmailAddress] = useState<string>("");
  const [hideParentsEmailAddress, setHideParentsEmailAddress] = useState<string>("");
  const [parentLastFourDigitPhoneNumber] = useState<string>(
    location.state?.parentLastFourDigitPhoneNumber
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const hasAtSymbol = parentsEmailAddress.includes("@");
    console.log("hello");
    if (hasAtSymbol === true) setDidUserPutAnEmailAddress(false);
    else setDidUserPutAnEmailAddress(true);
  }, [parentsEmailAddress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const url = `${backEndCodeURLLocation}SignIn/GetParentEmailAddressOnFile?phoneNumber=${parentLastFourDigitPhoneNumber}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data. Response status: ${response.status}`
          );
        }

        
        const parentEmailAddress = await response.text();
        const hiddenEmailAddress = parentEmailAddress.replace(/^(..).*?(?=@)/, (_, firstChar) => `${firstChar}${'.'.repeat(parentEmailAddress.indexOf('@'))}`);
        setParentsEmailAddress(parentEmailAddress);
        setHideParentsEmailAddress(hiddenEmailAddress);
        console.log(hiddenEmailAddress);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setDidUserPutAnEmailAddress(true);
    const token = localStorage.getItem("token");
    try {
      console.log(
        "parentLastFourDigitPhoneNumber = " + parentLastFourDigitPhoneNumber
      );
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
        console.error(`Error:`, response.statusText);
        setShowErrorMessage(true);
        return;
      }
      navigate("/ValidateTemporaryPin", {
        replace: true,
        state: {
          parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
        },
      });
    } catch (error) {
      console.error(`Error:`, error);
    }
  };

  const ReceptionistGetsTemporaryPin = async () => {
    const token = localStorage.getItem("token");
    try {
      console.log(
        "parentLastFourDigitPhoneNumber = " + parentLastFourDigitPhoneNumber
      );
      console.log("parentsEmailAddress = " + parentsEmailAddress);

      const response = await fetch(
        `${backEndCodeURLLocation}SignIn/SendTemporaryEmailVerificationSoReceptionistCanReadIt?parentPhoneNumber=${parentLastFourDigitPhoneNumber}&parentEmailAddress=${parentsEmailAddress}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error(`Error:`, response.statusText);
        setShowErrorMessage(true);
        return;
      }
      navigate("/ValidateTemporaryPin", {
        replace: true,
        state: {
          parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
        },
      });
    } catch (error) {
      console.error(`Error:`, error);
    }


    navigate("/ValidateTemporaryPin", {
      replace: true,
      state: {
        parentLastFourDigitPhoneNumber: parentLastFourDigitPhoneNumber,
      },
    });
  };

  return (
    <div className="ContentComponentBody" id="my_fullscreen">
      <div className="CommentDropDown_Grid">
        <img src={BehavenLogo} alt="My Image" style={{ height: "75px" }} />
        <br />
        <form onSubmit={handleSubmit}>
          <p style={{ fontSize: "20px" }}>
            Please enter your email address to retrive your Pin
          </p>
          <br />
          <div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroupPrepend2"
                  style={{
                    height: "65px",
                    fontSize: "35px",
                    backgroundColor: "lightblue",
                  }}
                >
                  &#9993;
                </span>
              </div>
              <input
              disabled = {true}
                type="email"
                style={{
                  height: "65px",
                  fontSize: "25px",
                  width: "500px",
                  textAlign: "center",
                }}
                className="form-control"
                id="validationDefaultUsername"
                placeholder="Your Email"
                aria-describedby="inputGroupPrepend2"
                onChange={(e) => setParentsEmailAddress(e.target.value)}
                value={hideParentsEmailAddress}
                required
              />
            </div>
            
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={didUserPutAnEmailAddress}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <button
            type="button"
            className="btn btn-outline-dark"
            style={{
              backgroundColor: "white",
              color: "goldenrod",
              fontSize: "20px",
            }}
            onClick={ReceptionistGetsTemporaryPin}
          >
            Verify in a different way?
          </button>
      </div>

      {showErrorMessage && (
        <ErrorMessage message={"Couldn't Find Email Address"} />
      )}
    </div>
  );
};

export default ValidateEmailAddress;
