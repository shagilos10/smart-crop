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
import Tasks from './pages/AddTask';
import Reports from './pages/Reports';
import Weather from './pages/Weather';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CityAdmin from './pages/CityAdmin';
import Schedule from './pages/Schedules';
import AccountPage from './pages/Account';
import SettingsPage from './pages/Setting';

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes without Sidebar */}
                <Route path="/" element={<Landingpage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/farmercrud" element={<FarmerCrud />} />
                <Route path="/cityadmin" element={<CityAdmin />} />
                <Route path="/forgotpassword" element={<Forgotpass />} />
                <Route path="/otp" element={<OtpVerification />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/tasks" element={<Tasks addTask={(task) => {
          // This function will be passed to AddTaskPage to add a new task
          const dashboardElement = document.querySelector('#dashboard');
          if (dashboardElement) {
            dashboardElement.addTask(task);
          }
        }} />} />

                {/* Routes with Sidebar */}
                <Route element={<LayoutWithSidebar />}>

                <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/croprecommendation" element={<Croprecommendation />} />
                    <Route path="/mycrops" element={<Mycrops />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/profile" element={<AccountPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
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
                <div className="flex-grow  bg-[] pt-18 ">
                    <Outlet /> {/* Main content area */}
                </div>
            </div>
        </div>
    );
};

export default App;