// App.js
import React from 'react';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import JoinPlan from './component/JoinPlan.js';
import Login from './component/Login.js';
import SignUp from './component/SignUp.js';

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/join-plan/:planCode" element={<JoinPlan />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
