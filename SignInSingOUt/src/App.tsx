import './App.css'
import Navbar from './Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import PhoneNumber from './Pages/PhoneNumber'
import ParentsPin from './Pages/ParentsPin'
import AddParentInfo from './Pages/AddParentInfo'
import ChooseWhichChildren from './Pages/ChooseWhichChildren'
import ConnectParentAndChildTogeter from './Pages/ConnectParentAndChildTogether'
import EditChildTime from './Pages/EditChildTime'
import Login from './Pages/Login'
import ValidateEmailAddress from './Pages/ValidateEmailAddress'
import ValidateTemporaryPin from './Pages/ValidateTemporaryPin'
import ResetPin from './Pages/ResetPin'
import MakeClientCurrent from './Pages/MakeClientCurrent'
import ReceptionistGivesTemporaryPinToParent from './Pages/ReceptionistGivesTemporaryPinToParent'
import ClientInOutNoShow from './Pages/ClientInOutNoShow'
import CbsAddOrTransferClientsToRooms from './Pages/CbsAddOrTransferClientsToRooms'
import RbtAddOrTransferClientsToRooms from './Pages/RbtAddOrTransferClientsToRooms'
import SdpPanel from './Pages/SdpPanel'
import TimeOutObservation from './Pages/TimeOutObservation'
import TimeOutSelectAClient from './Pages/TimeOutSelectAClient'
import SsnPin from './Pages/SsnPin'
import AbaPanel from './Pages/AbaPanel'
import HealthCheckSelectedRegion from './Pages/HealthCheckSelectedRegion'
import HealthCheck from './Pages/HealthCheck'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/PhoneNumber' element={<PhoneNumber/>}></Route>
      <Route path='/ParentsPin' element={<ParentsPin/>}></Route>
      <Route path='/AddParentInfo' element={<AddParentInfo/>}></Route>
      <Route path='/ChooseWhichChildren' element={<ChooseWhichChildren/>}></Route>
      <Route path='/ConnectParentAndChildTogeter' element={<ConnectParentAndChildTogeter/>}></Route>
      <Route path='/EditChildTime' element={<EditChildTime/>}></Route>
      <Route path='/ValidateEmailAddress' element={<ValidateEmailAddress/>}></Route>
      <Route path='/ValidateTemporaryPin' element={<ValidateTemporaryPin/>}></Route>
      <Route path='/ResetPin' element={<ResetPin/>}></Route>
      <Route path='/MakeClientCurrent' element={<MakeClientCurrent/>}></Route>
      <Route path='/ReceptionistGivesTemporaryPinToParent' element={<ReceptionistGivesTemporaryPinToParent/>}></Route>
      <Route path='/ClientInOutNoShow' element={<ClientInOutNoShow/>}></Route>
      <Route path='/CbsAddOrTransferClientsToRooms' element={<CbsAddOrTransferClientsToRooms/>}></Route>
      <Route path='/RbtAddOrTransferClientsToRooms' element={<RbtAddOrTransferClientsToRooms/>}></Route>
      <Route path='/SdpPanel' element={<SdpPanel/>}></Route>
      <Route path='/TimeOutObservation' element={<TimeOutObservation/>}></Route>
      <Route path='/TimeOutSelectAClient' element={<TimeOutSelectAClient/>}></Route>
      <Route path='/SsnPin' element={<SsnPin/>}></Route>
      <Route path='/AbaPanel' element={<AbaPanel/>}></Route>
      <Route path='/HealthCheckSelectedRegion' element={<HealthCheckSelectedRegion/>}></Route>
      <Route path='/HealthCheck' element={<HealthCheck/>}></Route>
      </Routes>
    </>
  )
}

export default App