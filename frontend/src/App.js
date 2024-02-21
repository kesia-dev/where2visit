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
import RestaurantDetails from './component/RestaurantDetails.js';
import FinalPollResult from './component/FinalPollResult.js';
import PlanningCard from './component/Planning.js';
import Instructions from './component/Instructions.js';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:resetCode" element={<ResetPassword />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/create-plan" element={<PlanningCard />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/join-plan/:planCode" element={<JoinPlan />} />
            <Route path="/restaurant-details/:planCode" element={<RestaurantDetails />} />
            <Route path="/final-poll/:planCode" element={<FinalPollResult />} />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
