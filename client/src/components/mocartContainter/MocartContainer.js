import React, { useState } from 'react';
import Nav from '../nav/Nav';
import Login from '../nav/pages/Login';
import Home from '../nav/pages/Home';
import Products from '../nav/pages/Products';
import Contact from '../nav/pages/Contact';
import Signup from '../nav/pages/Signup';

function MocartContainer() {
  const [currentPage, setCurrentPage] = useState('Home');
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Products') {
      return <Products />;
    }
    if (currentPage === 'Login') {
      return <Login />;
    }
    if (currentPage === 'Contact') {
      return <Contact />;
    }
    return <Signup />;
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
