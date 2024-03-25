import './App.css'
import Navbar from './Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import ParentSignIn from './Pages/ParentSignIn'
import Login from './Pages/Login'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/ParentSignIn' element={<ParentSignIn/>}></Route>
        
        {/* <Route path='/AddYourOwnComments' element={<AddYourOwnComments/>}></Route> */}
      </Routes>
    </>
  )
}

export default App