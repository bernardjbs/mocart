import React from 'react';
import { useNavigate } from "react-router-dom";

import Nav from '../../components/nav/Nav';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

const Unauthorised = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <>
      <Nav />
      <section>
        <h1>Unauthorised</h1>
        <br />
        <p>You do not have access to the requested page. Please login again</p>
        <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
        </div>
      </section>
    </>
  );
};

export default Unauthorised