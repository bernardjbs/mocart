import React, { useState } from 'react';
import Nav from '../nav/Nav';
import Login from '../../pages/login/Login';
import Home from '../../pages/home/Home';
import Gallery from '../../pages/gallery/Gallery';
import Contact from '../../pages/contact/Contact';
import Signup from '../../pages/signup/Signup';
import Auth from '../../utils/auth';

function MocartContainer() {

  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Gallery') {
      return <Gallery />
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
