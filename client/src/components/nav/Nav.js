import React from 'react';
import './nav.css';
import logo from '../../assets/img/sflogo.jpg';
function Nav({ currentPage, handlePageChange }) {
  return (
    <section className="nav-bar">
      <div>
        <img className="logo-image" src={logo} alt="sin fat logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a className="nav-text" href="#home" onClick={() => handlePageChange('Home')}>Home</a>
          </li>
          <li>
            <a className="nav-text" href="#products" onClick={() => handlePageChange('Products')}>Products</a>
          </li>
          <li>
            <a className="nav-text" href="#contact" onClick={() => handlePageChange('Contact')}>Contact</a>
          </li>
          <li>
            <a className="nav-text" href="#login" onClick={() => handlePageChange('Login')}>Login</a>
          </li>
          <li>
            <a className="nav-text" href="#signup" onClick={() => handlePageChange('SignUp')}>Sign Up</a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;
