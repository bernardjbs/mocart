import React from 'react';
import Button from '@mui/material/Button';
import Dropdown from '../../components/dropdown/Dropdown';

function CartItem({item, addToCart, removeFromCart}) {

  console.log(item);
  return (
    <>
      <div>
        <p>{item.filename}</p>
        <p>Quantity</p>
        <Dropdown />
      </div>
    </>
  );
};

export default CartItem;