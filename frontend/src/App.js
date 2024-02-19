// App.js
import React from 'react';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import JoinPlan from './component/JoinPlan.js';
import Login from './component/Login.js';
import SignUp from './component/SignUp.js';
import { AuthProvider } from './context/AuthContext.js';
import { AlertProvider } from './context/AlertContext.js';
import ForgotPassword from './component/ForgotPassword.js';
import ResetPassword from './component/ResetPassword.js';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:resetCode" element={<ResetPassword />} />
            <Route path="/join-plan/:planCode" element={<JoinPlan />} />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
