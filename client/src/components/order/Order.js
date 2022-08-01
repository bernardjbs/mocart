import React from 'react';
import OrderItem from '../../components/orderItem/OrderItem';

function Order({ customers }) {
  const orders = customers[0].orders;
  return (
    <>
      <h2>Order for {customers[0].name}</h2>
      {customers.length === 0 ? <p>There is no Order</p> : null}
      {customers.map(customer => {
        <h2>{ customer.name} </h2>    
      })}
        <OrderItem orders={ orders } />
    </>
  )

};

export default Order;