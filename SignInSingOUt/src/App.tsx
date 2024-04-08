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
      </Routes>
    </>
  )
}

export default App