import { BrowserRouter as Router, Route, Routes,Outlet } from 'react-router-dom';
import './App.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Landingpage from './pages/Landingpage';
import Forgotpass from './pages/Forgotpass';
import OtpVerification from './pages/Otpverification';
import ChangePassword from './pages/Changepassword';
import Dashboard from './pages/Dashboard';
import FarmerCrud from './pages/FarmerCrud';
import Croprecommendation from './pages/Croprecommendation';
import Mycrops from './pages/Mycrops';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import Weather from './pages/Weather';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes without Sidebar */}
                <Route path="/" element={<Landingpage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/farmercrud" element={<FarmerCrud />} />
                <Route path="/forgotpassword" element={<Forgotpass />} />
                <Route path="/otp" element={<OtpVerification />} />
                <Route path="/changepassword" element={<ChangePassword />} />

                {/* Routes with Sidebar */}
                <Route element={<LayoutWithSidebar />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/croprecommendation" element={<Croprecommendation />} />
                    <Route path="/mycrops" element={<Mycrops />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/reports" element={<Reports />} />
                </Route>
            </Routes>
        </Router>
    );
}

const LayoutWithSidebar = () => {
    return (
        
        <div>
            <Navbar /> {/* Navbar at the top */}
            <div className="flex">
                <Sidebar /> {/* Sidebar on the left */}
                <div className="flex-grow p-6 bg-[#E4FFF2]">
                    <Outlet /> {/* Main content area */}
                </div>
            </div>
        </div>
    );
};

export default App;