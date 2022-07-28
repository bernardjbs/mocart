import React from 'react';
import './nav.css';
import logo from '../../assets/img/sflogo.jpg';
import Auth from '../../utils/auth';


function Nav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <section className="nav-bar">
      <div>
        <img className="logo-image" src={logo} alt="sin fat logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a className="nav-text" href="/" >Home</a>
          </li>
          <li>
            <a className="nav-text" href="gallery" >Gallery</a>
          </li>
          <li>
            <a className="nav-text" href="contact" >Contact</a>
          </li>

          {Auth.loggedIn() ? (
            <li>
              <a className="nav-text" href="logout" onClick={logout}>Logout</a>
            </li>
          ) : (
            <React.Fragment>
              <li>
                <a className="nav-text" href="login" >Login</a>
              </li>
              <li>
                <a className="nav-text" href="signup" >Sign Up</a>
              </li>
            </ React.Fragment>
          )}

        </ul>
      </nav>
    </section>
  );
};

export default Nav;
