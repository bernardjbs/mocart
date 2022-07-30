import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Button, TextareaAutosize } from '@mui/material';
import Auth from '../../utils/auth';

import CartItem from '../../components/cartItem/CartItem';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

let loggedInUser;

if (Auth.loggedIn()) {
  loggedInUser = Auth.getProfile().data;
}

function Cart({ cartItems, addToCart, removeFromCart, handleSelectedSize, handlePrice, stripeKey }) {
  const [stripeToken, setStripeToken] = useState(null);
  const [note, setNote] = useState('');

  const onToken = (token) => {
    setStripeToken(token);
  }

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setNote(value);
  }
  const saveOrder = async () => {
    let subOrder = []
    cartItems.forEach(async item => {
      subOrder.push([{
          id: item._id,
          filename: item.filename,
          quantity: item.amount,
          size: item.size,
        }],
      )
    });
    const order = {
      imageInfo: subOrder,
      status: 'Open',
      note: note,
    };
    console.log(subOrder);
    console.log(order);

    try {
      await axios.post(`${URI}/api/orders/neworder`, {
        ...order,
      });

      const user = await (await axios.put(`${URI}/api/users/${loggedInUser._id}`)).data;
      console.log(user.orders);
      console.log(loggedInUser._id)
      const newOrders = [...user.orders, order]
      const response = await axios.put(`${URI}/api/users/${loggedInUser._id}`, { orders: newOrders });
      console.log(response);
    } catch (err) {
      console.error(err);
    }

  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  }
  useEffect(() => {
    const paymentRequest = async () => {
      try {
        await axios.post(`${URI}/api/checkout/payment`, {
          stripeTokenId: stripeToken.id,
          amount: totalAmount * 100, // Multiply by 100 - Stripe use cents
        });
        routeChange();
      } catch { }
    };
    stripeToken && paymentRequest();
  }, [stripeToken]);

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
          handleSelectedSize={handleSelectedSize}
        />
      ))}
      {/* {console.log(cartItems)} */}
      <h2>Total: ${totalAmount}</h2>
      <TextareaAutosize
        aria-label='textarea'
        placeholder='Add a note'
        name='note'
        value={note || ''}
        onChange={handleNoteChange}
        style={{ width: 200 }}
      />
      <StripeCheckout
        name='Pictura'
        description='Please enter card details'
        amount={totalAmount * 100} // Multiply by 100 - Stripe use cents
        token={onToken}
        stripeKey={stripeKey}
      >
        <Button onClick={saveOrder}>
          Make Payment
        </Button>
      </StripeCheckout>
    </>
  );
};

export default Cart;