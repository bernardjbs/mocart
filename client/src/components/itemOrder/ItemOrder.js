import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function ItemOrder({ item, quantity }) {

 

  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState('');
  const [value, setValue] = useState('');

  const getSizes = async () => {
    // Fetch data
    const { data } = await axios.get(`${URI}/api/printsize`);
    setSizes(data.map((data) => (
      {
        id: data._id,
        price: data.price,
        label: data.dimension,
        value: data.dimension
      })));
  }
  useEffect(() => {
    // Fetch sizes
    getSizes()
    // Trigger the fetch
    getSizes();
  }, []);

  const itemSubTotal = () => {
    return price * quantity;
  }

  const selectPrice = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const dataPrice = option.getAttribute('data-price');
    setPrice(dataPrice);
    item.size = e.target.value;
  }

  return (
    <>
      <select
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
          { selectPrice(e) }
        }}
      >
        <option>{item.size}</option>
        {sizes.map((size) => (
          <option className='price-option' key={size.id} value={size.value} data-price={size.price}>
            {size.label}
          </option>
        )
        )}
      </select>
      ${itemSubTotal().toFixed(2)}

    </>

  );
};

export default ItemOrder;