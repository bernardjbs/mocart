import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function ItemOrder({ item, handlePrice }) {

  const [sizes, setSizes] = useState([]);
  // const [price, setPrice] = useState('');
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

  useEffect(() => {
    item.price = 2.5;
    handlePrice(item);
  },[])

  const itemSubTotal = () => {
    const calcPrice = item.price * item.amount
    if (calcPrice) {
      return item.price * item.amount;
    }
    else return 0;
  }

  const selectPrice = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const dataPrice = option.getAttribute('data-price');
    item.size = e.target.value;
    item.price = dataPrice;
    handlePrice(item);
  }

  const setOption = (itemSize) => {
    console.log(itemSize)
    if (itemSize === 'Size') {
      return 'Size'
    }
    else {
      return itemSize;
    }
  }

  return (
    <>
      <select
        className='select-size'
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
          selectPrice(e) 
        }}
      >
        {/* <option>{setOption(item.size)}</option> */}
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