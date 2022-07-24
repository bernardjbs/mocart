import React from 'react';
import Button from '@mui/material/Button';

function Item({ item, handleAddToCart }) {

  return (
    <>
      <img src='' alt='' />
      <div>
        <p>ID: {item._id}</p>
        <p>File: {item.filename}</p>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </>
  );
};

export default Item;