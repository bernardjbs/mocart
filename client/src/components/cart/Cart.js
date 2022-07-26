import React, { useState } from 'react';
import CartItem from '../../components/cartItem/CartItem'
import Button from '@mui/material/Button';

function Cart({ cartItems, addToCart, removeFromCart, handlePrice }) {

  // const getTotal = (total) => { }

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);
  return (
    <>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item._id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          handlePrice={handlePrice}
        />
      ))}
      {console.log(cartItems)}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </>
  );
};

export default Cart;