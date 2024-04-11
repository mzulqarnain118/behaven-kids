import './App.css'
import Navbar from './Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import PhoneNumber from './Pages/PhoneNumber'
import ParentsPin from './Pages/ParentsPin'
import AddParentInfo from './Pages/AddParentChildInfo'
import ChooseWhichChildren from './Pages/ChooseWhichChildren'
import ConnectParentAndChildTogeter from './Pages/ConnectParentAndChildTogether'
import EditChildTime from './Pages/EditChildTime'
import Login from './Pages/Login'
import ValidateEmailAddress from './Pages/ValidateEmailAddress'
import ValidateTemporaryPin from './Pages/ValidateTemporaryPin'
import ResetPin from './Pages/ResetPin'
import AddChildInfo from './Pages/AddChildInfo'

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
      <Route path='/AddChildInfo' element={<AddChildInfo/>}></Route>
      </Routes>
    </>
  )
}

export default App