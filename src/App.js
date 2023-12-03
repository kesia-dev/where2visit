// App.js
import React from 'react';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import CreateRoom from './component/CreateRoom';
import SignInPage from './component/SignInPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import './App.css';
import JoinRoom from './component/JoinRoom';

function App() {
  return (
    
    <Router>
      <Auth0Provider
        domain="dev-rkjah3umfq8c82at.us.auth0.com"
        clientId="xbeT4PtSPVwbkexbBRsCKmzveb3aNIE0"
        redirectUri={window.location.origin}
      >
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            {/* Add other routes as needed */}
          </Routes>
      </Auth0Provider>
    </Router>
  );
}

export default App;
