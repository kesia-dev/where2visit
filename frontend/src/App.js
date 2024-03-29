// App.js
import React from 'react';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import './App.css';
import JoinPlan from './component/JoinPlan.js';
import PlanningCard from './component/Planning.js';
import Instructions from './component/Instructions.js';

const domain = "dev-rkjah3umfq8c82at.us.auth0.com"
const clientId = "xbeT4PtSPVwbkexbBRsCKmzveb3aNIE0"

function App() {
  return (
    <Router>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join-plan/:planCode" element={<JoinPlan />} />
            <Route path="/create-plan" element={<PlanningCard />} />
          <Route path="/instructions" element={<Instructions />} />
          {/* Add other routes as needed */}
        </Routes>
      </Auth0Provider>
    </Router>
  );
}

export default App;
