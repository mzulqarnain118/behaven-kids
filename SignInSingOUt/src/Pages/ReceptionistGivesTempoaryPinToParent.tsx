import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const ResetPin: React.FC = () => {
  const location = useLocation();


  const navigate = useNavigate();


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/", { replace: true });
  //   }

  //   if (parentLastFourDigitPhoneNumber === undefined) {
  //     navigate("/", { replace: true });
  //   }
  // });
  useEffect(() => {

  }, []);



  return (
    <>
      <div className="ContentComponentBody" id="my_fullscreen">
        <div className="CommentDropDown_Grid">
          
        </div>
      </div>
    </>
  );
};

export default ResetPin;
