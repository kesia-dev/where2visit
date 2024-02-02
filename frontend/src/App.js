import React from 'react';
import HomePage from './component/HomePage';
import CreateRoom from './component/CreateRoom';
import SignInPage from './component/SignInPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import JoinRoom from './component/JoinRoom';
import Planning1 from './component/Planning1';
import Planning2 from './component/Planning2';
import Planning3 from './component/Planning3';
import Planning5 from './component/Planning5';
import Planning6 from './component/Planning6';

import PlanCreatedPage from './component/PlanCreatedPage';
import Restaurant1Welcome from './component/Restaurant1Welcome';
import Restaurants1 from './component/Restaurants1'; 
import Restaurants1Members from './component/Restaurants1Members'; 
import Restaurants1Vote from './component/Restaurants1Vote'; 
import Restaurants10ThankYou from './component/Restaurants10ThankYou';
import WaitingPage from './component/WaitingPage';
import FinalPolls from './component/FinalPolls'
import ResultsPage from './component/ResultsPage';

function App() {
  return (
    <Router>
      <Auth0Provider
        domain="dev-rkjah3umfq8c82at.us.auth0.com"
        clientId="xbeT4PtSPVwbkexbBRsCKmzveb3aNIE0"
        redirectUri={window.location.origin}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/Planning1" element={<Planning1 />} />
          <Route path="/Planning2" element={<Planning2 />} />
          <Route path="/Planning3" element={<Planning3 />} />
          <Route path="/Planning5" element={<Planning5 />} />
          <Route path="/Planning6" element={<Planning6 />} />

          <Route path="/PlanCreatedPage" element={<PlanCreatedPage />} />
          <Route path="/Restaurant1Welcome" element={<Restaurant1Welcome />} />
          <Route path="/Restaurants1" element={<Restaurants1 />} />
          <Route path="/Restaurants1Members" element={<Restaurants1Members />} />
          <Route path="/Restaurants1Vote" element={<Restaurants1Vote />} />
          <Route path="/Restaurants10ThankYou" element={<Restaurants10ThankYou />} />
          <Route path="/WaitingPage" element={<WaitingPage />} />
          <Route path="/FinalPolls" element={<FinalPolls />} />
          <Route path="/ResultsPage" element={<ResultsPage />} />


        </Routes>
      </Auth0Provider>
    </Router>
  );
}

export default App;
