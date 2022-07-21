import React, { useState } from 'react';
import Nav from '../nav/Nav';
import Login from '../login/Login';
import Home from '../home/Home';
import Gallery from '../gallery/Gallery';
import Contact from '../contact/Contact';
import Signup from '../signup/Signup';
import Auth from '../../utils/auth';

function MocartContainer() {
  const [currentPage, setCurrentPage] = useState('Home');
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Gallery') {
      return <Gallery />;
    }
    if (currentPage === 'Login') {
      return <Login />;
    }
    if (currentPage === 'Contact') {
      return <Contact />;
    }
    if (currentPage === 'Logout') {
      Auth.logout();
      return <Home />;
    }
    if (currentPage === 'SignUp') {
      return <Signup />;
    }
    return <Home />;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

  }

  return (
    <div className='mocart-container'>
      <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
    </div>
  );
};

export default MocartContainer;
