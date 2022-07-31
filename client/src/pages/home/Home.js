import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav'
import Auth from '../../utils/auth'
import useUserContext from '../../hooks/useUserContext';

function Home() {
  const loggedInUser = useUserContext();
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(user)
    if (user === undefined) {
      console.log("i am undefined in useeffect")      
    } else {
      setUser(loggedInUser);
      console.log('i am logged in') 
      return
    }
  }, [user]); 
  // setUser(loggedInUser);
  
  return (
    <>
      <Nav />
      {/* {console.log(user)} */}
      {user ?
        (<h1>Welcome {user.firstName} { user.lastName }</h1>)
        :
          (<h1>Logged out</h1>)
        }

    </>
  )
};

export default Home;