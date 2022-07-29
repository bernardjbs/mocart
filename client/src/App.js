import './App.css';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home'
import Gallery from './pages/gallery/Gallery'
import Contact from './pages/contact/Contact'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Customer from './pages/customer/Customer'
import Admin from './pages/admin/Admin'
import Missing from './pages/missing/Missing'
import MainContainer from './components/mainContainter/MainContainer';
import RequireAuth from './components/RequireAuth';

import Nav from './components/nav/Nav'
import Auth from '../src/utils/auth';


function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainContainer />}>
          {/* Public routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            {/* RequireAuth Outlet */}
            <Route path="customer" element={<Customer />} />
            <Route path="admin" element={<Admin />} />
            <Route path="/logout" element={<Home />} />
          </Route>

          {/* Undefined paths */}
          <Route path="*" element={<Missing />} />
        </Route>


        <Route path="/gallery" element={<Gallery />}>
        </Route>

      </Routes>
      {/* <MocartContainer /> */}
    </>
  );
}

export default App;
