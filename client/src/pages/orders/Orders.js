import React, { useState, useEffect } from 'react';
import Order from '../../components/order/Order';
import Nav from '../../components/nav/Nav';
import axios from 'axios';
import './orders.css';
import { Grid, Drawer } from '@mui/material';
const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Orders() {
  const [customers, setCustomers] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);

  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/users`);
      console.log(Array.isArray(data))
      let openOrders = [];
      let filteredOrders = [];
      let customerOrder = {};
      if (Array.isArray(data)) {
        data.map(user => {
          if (user.orders.length > 0) {
            const orders = user.orders;
            orders.map(order => {
              if (order.status === 'Open') {
                openOrders.push(user);
              }
            });
          };
        });
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
      } else {
        return null;
      }

    } catch (error) {
      throw error;
    }
  };

  useEffect(async () => {
    // Get customer orders
    const [customers] = await getUserOrders();
    setCustomers(customers);
    let tempOrders = [];
    customers.map(customer => {
      tempOrders = [...tempOrders, customer.orders, {}]
    });
    setCustomerOrders(tempOrders);

  }, []);
  return (
    <>
      <Nav />
      <Drawer anchor='right' open={orderOpen} onClose={() => setOrderOpen(false)}>
        <Order customers={customers} />
      </Drawer>
      <h1>Orders</h1>
      <section className='orders-container'>
        <section className='order-cards-container'>
          <Grid container spacing={3}>

            {customers.map(customer => (

              <section className='order-card'>
                <Grid item key={customer.id} xs={12} sm={12}>
                  <p>Customer: {customer.name}</p>
                  <p>Orders: {customer.orders.length}</p>
                  <button className='btn btn-primary btn-view-order' onClick={() => setOrderOpen(true)}>View Order</button>
                </Grid>
              </section>
            ))}
          </Grid>
        </section>
      </section>
    </>
  );
};

export default Orders;