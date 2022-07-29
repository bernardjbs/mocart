import React, { useContext } from 'react';
import Nav from '../../components/nav/Nav'

import useUserContext from '../../hooks/useUserContext';

function Home() {
  const loggedInUser = useUserContext();
  console.log(loggedInUser)

  return (
    <>
      <Nav />
    </>
  )
};

export default Home;