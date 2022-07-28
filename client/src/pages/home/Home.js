import React, { useContext } from 'react';
import { useUserContext } from '../../utils/userContext';

function Home() {
  const loggedInUser = useUserContext();
  return (
  
    <div>
        {console.log(loggedInUser.data.userType)}
        <p>Home page</p>
      </div>
    
  );
};

export default Home;