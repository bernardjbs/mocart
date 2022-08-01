import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav'
import useUserContext from '../../hooks/useUserContext';

function Home() {
  const loggedInUser = useUserContext();
  const [user, setUser] = useState({})

  useEffect(() => {
    if (user === undefined) {
    } else {
      setUser(loggedInUser);
      return
    }
  }, [user]); 
  
  return (
    <>
      <Nav />
      {user ?
        (<h1>Welcome {user.firstName} { user.lastName }</h1>)
        :
          (<h1>Logged out</h1>)
        }
    </>
  )
};

export default Home;