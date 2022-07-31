import React from 'react';
import OrderItem from '../../components/orderItem/OrderItem'


function Order({ customers }) {
  const orders = customers[0].orders
  return (
    <>
      {/* {console.log(customers[0].orders)} */}

      <h2>Order for {customers[0].name}</h2>
      {customers.length === 0 ? <p>There is no Order</p> : null}
      {customers.map(customer => {
        <h2>{ customer.name} </h2>    
      })}
        <OrderItem orders={ orders } />
      {/* {console.log(order)} */}

    </>
  )

}

export default Order