import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserProvider } from './utils/userContext';

import Home from './pages/home/Home'
import Gallery from './pages/gallery/Gallery'
import Contact from './pages/contact/Contact'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Nav from './components/nav/Nav'
import Auth from '../src/utils/auth';


function App() {
  return (
    <>
      <Nav />
      <UserProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />}>
            </Route>
            <Route path="/gallery" element={<Gallery />}>
            </Route>
            <Route path="/contact" element={<Contact />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/signup" element={<Signup />}>
            </Route>
            <Route path="/logout" element={<Home />}>
            </Route>
          </Routes>
        </Router>
      </UserProvider>
      {/* <MocartContainer /> */}
    </>
  );
}

export default App;
