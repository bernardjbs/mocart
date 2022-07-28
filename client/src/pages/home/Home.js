import React, { useContext } from 'react';
import { useUserContext } from '../../utils/userContext';

function Home() {
  const loggedInUser = useUserContext();
  const test = () => {
    if (loggedInUser === '') {
      console.log("null")
    } else {
      console.log(loggedInUser)
    }
  }
  return (
  
    <div>
      
        {test()}
        <p>Home page</p>
      </div>
    
  );
};

export default Home;