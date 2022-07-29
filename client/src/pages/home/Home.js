import React, { useContext } from 'react';
import { useUserContext } from '../../utils/userContext';

function Home() {
  const loggedInUser = useUserContext().data;
  console.log(loggedInUser)

  return (
    <>

    </>
  )
};

export default Home;