import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Button, TextareaAutosize } from '@mui/material';

// import Success from '../../components/success/Success';
import Success from '../../pages/success/Success';

import CartItem from '../../components/cartItem/CartItem';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Cart({ cartItems, addToCart, removeFromCart, setSelectedSize, handlePrice, stripeKey }) {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  useEffect(() => {
    const paymentRequest = async () => {
      try {
      //   const res = await axios.post(`${URI}/api/checkout/payment`, {
      //     stripeTokenId: stripeToken.id,
      //     quantity: totalAmount * 100, // Multiply by 100 - Stripe use cents
      //   });
        // todo: Save Order
        console.log(cartItems)
        routeChange()
      } catch { }
    };
    stripeToken && paymentRequest();
  }, [stripeToken]);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalAmount = calculateTotal(cartItems).toFixed(2);

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
          setSelectedSize={setSelectedSize}
        />
      ))}
      {/* {console.log(cartItems)} */}
      <h2>Total: ${totalAmount}</h2>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Add a note"
        style={{ width: 200 }}
      />
      <StripeCheckout
        name='Pictura'
        billingAddress
        shippingAddress
        description='Your total is '{...totalAmount}
        quantity={totalAmount * 100} // Multiply by 100 - Stripe use cents
        token={onToken}
        stripeKey={stripeKey}
      >
        <Button>
          Make Payment
        </Button>
      </StripeCheckout>
    </>
  );
};

export default Cart;