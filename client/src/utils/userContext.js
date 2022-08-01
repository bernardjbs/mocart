import React, { createContext, useContext, useEffect, useState } from 'react';
import Auth from './auth';

// Initialize new context for users
const UserContext = createContext();

// UserProvider component that holds initial state, returns provider component
export const UserProvider = ({ children }) => {
  let loggedInUser 
  if (Auth.loggedIn()) {
    loggedInUser = Auth.getProfile()
  } else {
    loggedInUser = ''
  };
  // Provider components expect a value prop to be passed
  return (
    <UserContext.Provider value={loggedInUser.data}>
      {/* Render children passed from props */}
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;