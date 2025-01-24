import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Landingpage from './pages/Landingpage'
import Forgotpass from './pages/Forgotpass'
import OtpVerification from './pages/Otpverification'
import ChangePassword from './pages/Changepassword'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgotpassword" element={<Forgotpass/>} />
      <Route path="/otp" element={<OtpVerification/>} />
      <Route path="/changepassword" element={<ChangePassword/>} />
      </Routes>
    </Router>

  );
}

export default App
