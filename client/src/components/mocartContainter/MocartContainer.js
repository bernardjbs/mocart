import React, { useState, useEffect } from 'react';
import Nav from '../nav/Nav';
import Login from '../login/Login';
import Home from '../home/Home';
import Gallery from '../gallery/Gallery';
import Contact from '../contact/Contact';
import Signup from '../signup/Signup';
import Auth from '../../utils/auth';
import axios from 'axios'

function MocartContainer() {
  const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

  const [currentPage, setCurrentPage] = useState('Home');
  const [pictureFiles, setPictureFiles] = useState([]);

  const getPictureFiles = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/picture`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  const getPicturesList = async () => {
    try {
      const pictureslist = await getPictureFiles();
      setPictureFiles(pictureslist);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPicturesList();
  }, []);

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Gallery') {
      return <Gallery getPictures={() => getPicturesList()} />;
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
