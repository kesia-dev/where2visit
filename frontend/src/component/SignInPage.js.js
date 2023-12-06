// SignInPage.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignInPage = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <div>
      <h2>Sign In</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  );
};

export default SignInPage;
