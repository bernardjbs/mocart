import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Button from '@mui/material/Button';

import CartItem from '../../components/cartItem/CartItem';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Cart({ cartItems, addToCart, removeFromCart, handlePrice, stripeKey }) {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  }
  // const getTotal = (total) => { }

  // const paymentRequest = async () => {
  //   try {
  //     console.log(stripeToken)
  //     const res = await axios.post(`${URI}/api/checkout/payment`, {
  //       stripeTokenId: stripeToken.id,
  //       amount: 100
  //     });
  //   } catch (error) {
  //     throw error;
  //   };
  // };

  useEffect(() => {
    const paymentRequest = async () => {
      try {
        const res = await axios.post(`${URI}/api/checkout/payment`, {
          stripeTokenId: stripeToken.id,
          amount: 500,
        });
      } catch {}
    };
    stripeToken && paymentRequest();
  }, [stripeToken]);

  // useEffect(() => {
  //   paymentRequest();
  //   stripeToken && paymentRequest()
  // },[stripeToken]);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);
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
        />
      ))}
      {/* {console.log(cartItems)} */}
      <h2>Total: ${totalAmount}</h2>
      <StripeCheckout
        name='Pictura'
        billingAddress
        shippingAddress
        description='Your total is '{...totalAmount}
        amount={1 * 100} // Multiply by 100 - Stripe use cents
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