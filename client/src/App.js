import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home'
import Gallery from './pages/gallery/Gallery'
import Contact from './pages/contact/Contact'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Orders from './pages/orders/Orders'
import PriceList from './pages/pricelist/PriceList'
import Missing from './pages/missing/Missing'
import MainContainer from './components/mainContainter/MainContainer';
import RequireAuth from './components/RequireAuth';
import Unauthorised from './pages/unauthorised/Unauthorised';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<MainContainer />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorised" element={<Unauthorised />} />


          {/* Protected routes */}
          <Route element={<RequireAuth userType='Customer' />}>
            <Route path="/gallery" element={<Gallery />} />
          </Route>
          <Route element={<RequireAuth userType='Admin' />}>
            <Route path="orders" element={<Orders />} />
            <Route path="pricelist" element={<PriceList />} />
          </Route>

          {/* Undefined paths */}
          <Route path="*" element={<Missing />} />
          <Route path="/logout" element={<Home />} />
        </Route>



      </Routes>
      {/* <MocartContainer /> */}
    </>
  );
}

export default App;
