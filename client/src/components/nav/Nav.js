import React from 'react';
import './nav.css';
import logo from '../../assets/img/sflogo.jpg';
import Auth from '../../utils/auth';
import useUserContext from '../../hooks/useUserContext';

function Nav() {


  let loggedInUserType
  if (Auth.loggedIn()) {
    loggedInUserType = Auth.getProfile().data.userType;
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    
  };
  return (
    <section className="nav-bar">
      <div>
        <img className="logo-image" src={logo} alt="sin fat logo" />
      </div>
      <h1>Pictura Online Printing</h1>
      <nav>
        <ul>
          <li>
            <a className="nav-text" href="/" >Home</a>
          </li>
          {loggedInUserType === 'Admin' && Auth.loggedIn() ? (
            <>
              <li>
                <a className="nav-text" href="orders" >Orders</a>
              </li>
            </>
          ) : loggedInUserType === 'Customer' && Auth.loggedIn() ? (
            <li>
              <a className="nav-text" href="gallery" >Gallery</a>
            </li>
          ) :
            <></>
          }

          {Auth.loggedIn() ? (
            <li>
              <a className="nav-text" href="logout" onClick={logout}>Logout</a>
            </li>
          ) : (
            <>
              <li>
                <a className="nav-text" href="login" >Login</a>
              </li>
              <li>
                <a className="nav-text" href="signup" >Sign Up</a>
              </li>
            </>
          )}

        </ul>
      </nav>
    </section>
  );
};

export default Nav;
