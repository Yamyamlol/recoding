import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Emailverify from './pages/Emailverify'
import ResetPassword from './pages/ResetPassword'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Landing from './pages/Landing'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element = {<Landing/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/email-verify" element={<Emailverify/>} />
        <Route path="/password-reset" element={<ResetPassword/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
