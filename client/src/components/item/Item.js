import React from 'react';
import Button from '@mui/material/Button';

function Item({ item, handleAddToCart }) {

  return (
    <>
      <img src='' alt='' />
      <div>
        <img className='picture-image' src={`data:image;base64,${item.imageBase64}`} alt={item.filename} />
        <p>File: {item.filename}</p>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </>
  );
};

export default Item;