import React from 'react';
import Button from '@mui/material/Button';

function Cart({cartItems}) {

  return (
    <>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {/* {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))} */}
      {/* <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2> */}
    </>
  );
};

export default Cart;