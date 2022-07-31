import React, { useState, useEffect } from 'react';
import Order from '../../components/order/Order';
import Nav from '../../components/nav/Nav';
import axios from 'axios';
import './orders.css'
import { Grid, Drawer } from '@mui/material';
const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Orders() {
  const [customers, setCustomers] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);


  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/users`);
      // console.log(data); 
      let openOrders = [];
      let filteredOrders = [];
      let customerOrder = {};
      data.map(user => {
        // console.log(user.firstName)
        if (user.orders.length > 0) {
          const orders = user.orders;
          orders.map(order => {
            if (order.status === 'Open') {
              openOrders.push(user);
            }
          })
        }
      })
      const uniqueOrders = [...new Set(openOrders)]
      uniqueOrders.map(order => {
        customerOrder = {
          id: order._id,
          name: `${order.firstName} ${order.lastName}`,
          orders: order.orders,
        }
        filteredOrders.push(customerOrder);
      });
      return [filteredOrders];
    } catch (error) {
      throw error;
    }
  };

  useEffect(async () => {
    // Get customer orders
    const [customers] = await getUserOrders();
    setCustomers(customers);
    // console.log(customers)
    let tempOrders = [];
    customers.map(customer => {
      tempOrders = [...tempOrders, customer.orders, {}]
      // setCustomerOrders(customerOrders.push(customer.orders))
      // {console.log(customer)}
    })
    setCustomerOrders(tempOrders);
    // console.log(customerOrders);


  }, [])
  return (
    <>
      <Nav />
      <h1>Orders</h1>
      
      <Drawer anchor='right' open={orderOpen} onClose={() => setOrderOpen(false)}>
        <Order customers={customers} />
      </Drawer>

      <Grid container spacing={3}>
        {customers.map(customer => (
          <Grid item key={customer.id} xs={12} sm={4}>
            <p>Customer: {customer.name}</p>
            <p>Orders: {customer.orders.length}</p>
            <button onClick={() => setOrderOpen(true)}>View Order</button>
          </Grid>
        ))}

      </Grid>


      {/* <section>
        {customers.map(order => (
          <>
            <section className='order-col'>
              <p>{order.id}</p>
            </section>
            <section className='order-col'>
              <p>{order.name}</p>
            </section>
            <section className='order-col'>
              <p>Order Date</p>
            </section>
            <section className='order-col'>
              <p>Status</p>
            </section>
            <section className='order-col'>
              <button onClick={() => setOrderOpen(true)}>View Order</button>
            </section>
          </>
        ))}
        <Drawer anchor='right' open={orderOpen} onClose={() => setOrderOpen(false)}>
          <Order />
        </Drawer>


      </section> */}



    </>
  )
};

export default Orders;