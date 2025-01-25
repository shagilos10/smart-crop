import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Landingpage from './pages/Landingpage'
import Forgotpass from './pages/Forgotpass'
import OtpVerification from './pages/Otpverification'
import ChangePassword from './pages/Changepassword'
import Dashboard from './pages/Dashboard'
import FarmerCrud from './pages/FarmerCrud'
import Croprecommendation from './pages/Croprecommendation'
import Mycrops from './pages/Mycrops'
import Tasks from './pages/Tasks'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/farmercrud" element={<FarmerCrud />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgotpassword" element={<Forgotpass/>} />
      <Route path="/otp" element={<OtpVerification/>} />
      <Route path="/changepassword" element={<ChangePassword/>} />
      </Routes>
      <div className='flex'>
        <Sidebar/>
        <div className="flex-grow p-6">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/croprecommendation" element={<Croprecommendation />} />
                        <Route path="/mycrops" element={<Mycrops />} />
                        <Route path="/tasks" element={<Tasks />} />

                    </Routes>
                </div>
        


      </div>
    </Router>

  );
}

export default App
