import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // check if user is already signed in
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const setAuthData = (newUserData) => {
    setUserData(newUserData);
    // send it to localStorage
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  // logging out, future use when/if token is expired?
  const clearAuthData = () => {
    setUserData(null);
    // remove it from localStorage
    localStorage.removeItem('userData');
  };

  const getTokenInfo = () => {
    // const storedUserData = localStorage.getItem('userData');
    return userData ? userData.token : null;
  };

  const getUserInfo = () => {
    // const storedUserData = localStorage.getItem('userData');
    return userData ? userData : null;
  };

  const isLoggedIn = () => {
    return !!userData?.token || false;
  };

  // returns whether the user has verified their email
  const isVerifiedUser = () => {
    return !!userData?.verified || false;
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setAuthData,
        clearAuthData,
        getTokenInfo,
        getUserInfo,
        isLoggedIn,
        isVerifiedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};