import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Forgotpass from './pages/Forgotpass'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgotpassword" element={<Forgotpass/>} />
      </Routes>
    </Router>

  );
}

export default App
