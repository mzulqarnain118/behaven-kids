import React, { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";
import "./styles/flexboxClasses.css";
import Navbar from "./Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ContainerToast } from "./Components/common/Toast/ContainerToast";
import Controls from "./Components/common";
import WelcomePage from "./Components/WelcomePage";
import PublicRoute from "./PublicRoute";

// Lazy load pages
const PhoneNumber = lazy(() => import("./Pages/PhoneNumber"));
const ParentsPin = lazy(() => import("./Pages/ParentsPin"));
const AddParentInfo = lazy(() => import("./Pages/AddParentInfo"));
const ChooseWhichChildren = lazy(() => import("./Pages/ChooseWhichChildren"));
const ConnectParentAndChildTogether = lazy(
  () => import("./Pages/ConnectParentAndChildTogether")
);
const EditChildTime = lazy(() => import("./Pages/EditChildTime"));
const Login = lazy(() => import("./Pages/Login"));
const ValidateEmailAddress = lazy(() => import("./Pages/ValidateEmailAddress"));
const ValidateTemporaryPin = lazy(() => import("./Pages/ValidateTemporaryPin"));
const ResetPin = lazy(() => import("./Pages/ResetPin"));
const MakeClientCurrent = lazy(() => import("./Pages/MakeClientCurrent"));
const ReceptionistGivesTemporaryPinToParent = lazy(
  () => import("./Pages/ReceptionistGivesTemporaryPinToParent")
);
const ClientInOutNoShow = lazy(() => import("./Pages/ClientInOutNoShow"));
const CbsAddOrTransferClientsToRooms = lazy(
  () => import("./Pages/CbsAddOrTransferClientsToRooms")
);
const RbtAddOrTransferClientsToRooms = lazy(
  () => import("./Pages/RbtAddOrTransferClientsToRooms")
);
const SdpPanel = lazy(() => import("./Pages/SdpPanel"));
const TimeOutObservation = lazy(() => import("./Pages/TimeOutObservation"));
const TimeOutSelectAClient = lazy(() => import("./Pages/TimeOutSelectAClient"));
const SsnPin = lazy(() => import("./Pages/SsnPin"));
const AbaPanel = lazy(() => import("./Pages/AbaPanel"));
const HealthCheckSelectedRegion = lazy(
  () => import("./Pages/HealthCheckSelectedRegion")
);
const HealthCheck = lazy(() => import("./Pages/HealthCheck"));
const TimeoutObservationTesting = lazy(
  () => import("./Pages/TimeoutObservationTesting")
);
const CMS = lazy(() => import("./Components/CMS"));
const Staff = lazy(() => import("./Components/Staff"));

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<any>();
  const checkToken = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };
  useEffect(() => {
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Suspense fallback={<Controls.Spinner isOverlay={true} />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/PhoneNumber" element={<PhoneNumber />} />
            <Route path="/ParentsPin" element={<ParentsPin />} />
            <Route
              path="/ValidateEmailAddress"
              element={<ValidateEmailAddress />}
            />
            <Route
              path="/ValidateTemporaryPin"
              element={<ValidateTemporaryPin />}
            />
            <Route path="/ResetPin" element={<ResetPin />} />
            <Route
              path="/ReceptionistGivesTemporaryPinToParent"
              element={<ReceptionistGivesTemporaryPinToParent />}
            />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/AddParentInfo" element={<AddParentInfo />} />
            <Route index element={<WelcomePage />} />
            <Route
              path="/ChooseWhichChildren"
              element={<ChooseWhichChildren />}
            />
            <Route
              path="/ConnectParentAndChildTogether"
              element={<ConnectParentAndChildTogether />}
            />
            <Route path="/EditChildTime" element={<EditChildTime />} />
            <Route path="/MakeClientCurrent" element={<MakeClientCurrent />} />
            <Route path="/ClientInOutNoShow" element={<ClientInOutNoShow />} />
            <Route
              path="/CbsAddOrTransferClientsToRooms"
              element={<CbsAddOrTransferClientsToRooms />}
            />
            <Route
              path="/RbtAddOrTransferClientsToRooms"
              element={<RbtAddOrTransferClientsToRooms />}
            />
            <Route path="/SdpPanel" element={<SdpPanel />} />
            <Route
              path="/TimeOutObservation"
              element={<TimeOutObservation />}
            />
            <Route
              path="/TimeOutSelectAClient"
              element={<TimeOutSelectAClient />}
            />
            <Route path="/SsnPin" element={<SsnPin />} />
            <Route path="/AbaPanel" element={<AbaPanel />} />
            <Route path="/cms" element={<CMS />} />
            <Route path="/Staff" element={<Staff />} />
            <Route
              path="/HealthCheckSelectedRegion"
              element={<HealthCheckSelectedRegion />}
            />
            <Route path="/HealthCheck" element={<HealthCheck />} />
            <Route
              path="/TimeoutObservationTesting"
              element={<TimeoutObservationTesting />}
            />
          </Route>
        </Routes>
      </Suspense>
      <ContainerToast />
    </>
  );
};

export default App;
