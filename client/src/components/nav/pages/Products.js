import React from 'react';
import Auth from '../../../utils/auth';

function Products(props) {
  return (
    <div>
      <h1>Products page</h1>
      {Auth.loggedIn() ? (
        <p>Purchase options</p>
      ) : (
        <p>No Purchase options</p>
      )}
    </div>
  );
};

export default Products;