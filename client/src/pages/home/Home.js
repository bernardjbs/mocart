import React, { useContext } from 'react';
// import { useUserContext } from '../../utils/userContext';
import useUserContext from '../../hooks/useUserContext';

function Home() {
  const loggedInUser = useUserContext();
  console.log(loggedInUser)

  return (
    <>

    </>
  )
};

export default Home;