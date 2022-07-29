import React, { createContext, useContext, useEffect, useState } from 'react';
import Auth from './auth';

// Initialize new context for users
const UserContext = createContext();

// We create a custom hook to provide immediate usage of the user context in other components
export const useUserContext = () => useContext(UserContext);

// UserProvider component that holds initial state, returns provider component
export const UserProvider = ({ children }) => {
  let loggedInUser 
  if (Auth.loggedIn()) {
    loggedInUser = Auth.getProfile()
  } else {
    loggedInUser = ''
  }
  // Provider components expect a value prop to be passed
  return (
    <UserContext.Provider value={loggedInUser}>
      {/* Render children passed from props */}
      {children}
    </UserContext.Provider>
  );
};
