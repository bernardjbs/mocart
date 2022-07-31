import React from 'react';
import './orderItem.css';
const saveOrder = () => {

}

const downloadImages = () => {

}
function OrderItem({ orders }) {
  console.log(orders)
  return (
    <>
      {orders.map(order => (
        <section className='item-card'>
          {(order.imageInfo).map(image => (
            <>
              <section className='sub-card'>
                <p>Filename: {image[0].filename}</p>
                <p>Quantity: {image[0].quantity}</p>
                <p>Size: {image[0].size}</p>
              </section>
            </>
          ))}


          <section className='sub-card status-card'>
            <h3>Status</h3>
            <section className='status-container'>
              <select>
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
                <option>Shipped</option>
              </select>
              <button className='btn btn-primary' onClick={saveOrder}>
                Save
              </button>
            </section>
          </section>

          <div className='download'>
            <button className='btn btn-primary' onClick={downloadImages}>
              Download Order
            </button>
          </div>

        </section>
      )
      )}
    </>

  )
}

export default OrderItem