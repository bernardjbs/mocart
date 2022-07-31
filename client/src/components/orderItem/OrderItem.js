import React from 'react';
import './orderItem.css';

function OrderItem({ orders }) {

  const saveOrder = () => {
    
  //   let file = convertBase64ToFile(base64String, fileName);
  //   saveAs(file, fileName);
  // }

  // const convertBase64ToFile = (base64String, fileName) => {
  //   let arr = base64String.split(',');
  //   let mime = arr[0].match(/:(.*?);/)[1];
  //   let bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   let uint8Array = new Uint8Array(n);
  //   while (n--) {
  //      uint8Array[n] = bstr.charCodeAt(n);
  //   }
  //   let file = new File([uint8Array], fileName, { type: mime });
  //   return file;
  }
  
  const downloadImages = () => {
    console.log("hello")
    // console.log(orders)
  }

  console.log(orders)
  return (
    <>
      {orders.map(order => (
        <section className='item-card'>
          {(order.imageInfo).map(image => (
            <>
              
              <section className='sub-card'>
                <p>Filename: {image.filename}</p>
                <p>Quantity: {image.quantity}</p>
                <p>Size: {image.size}</p>
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
            <button onClick={downloadImages} className='btn btn-primary'>
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