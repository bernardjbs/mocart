import React from 'react';
import './cartItem.css';
import Button from '@mui/material/Button';
import ItemOrder from '../itemOrder/ItemOrder';

function CartItem({ item, addToCart, removeFromCart, handlePrice, handleSelectedSize }) {


  return (
    <>
      <section className='cart-item-container'>
        <p>{item.filename}</p>
        <img className='cart-item-image' src={`data:image;base64,${item.imageBase64}`} alt={item.filename} />
        {/* <img src={item.imageBase64} alt={item.title} /> */}
        <div className='picture-size-order'>
          <Button
            size='small'
            sx={{ minWidth: 30, padding: 0.5, margin: 1 }}
            disableElevation
            variant='contained'
            onClick={() => {
              removeFromCart(item._id)
            }}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size='small'
            sx={{ minWidth: 30, padding: 0.5, margin: 1 }}
            disableElevation
            variant='contained'
            onClick={() => addToCart(item)}
          >
            +
          </Button>
          <ItemOrder
            item={item}
            handlePrice={handlePrice}
            handleSelectedSize={handleSelectedSize}
          />
        </div>
      </section>
    </>
  );
};

export default CartItem;