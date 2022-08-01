import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function ItemOrder({ item, handlePrice, handleSelectedSize }) {
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('10x15');
  const [price, setPrice] = useState(2.5);
  const [selectValue, setSelectValue] = useState('');

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
    getSizes();
    // Trigger the fetch
    getSizes();
  }, []);

  useEffect(() => {
    const selectSize = document.querySelector('.select-size');
    setSelectValue(item.size)
    if (item.price === undefined) {
      item.price = price;
      item.size = size;
    } else {
      setPrice(item.price);
      setSize(item.size);
    };
    handlePrice(item);
    handleSelectedSize(item);
  }, []);

  const itemSubTotal = () => {
    if (price === undefined) {
      setPrice(item.price);
    }
    const calcPrice = item.price * item.amount;
    if (calcPrice) {
      return calcPrice;
    }
    else return 0;
  };

  const selectPrice = (e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const dataPrice = option.getAttribute('data-price');
    item.size = e.target.value;
    item.price = dataPrice;
    item.test = 'test'
    setPrice(dataPrice);
    handlePrice(item);
    setSize(item.size);
    handleSelectedSize(item);
  };

  return (
    <>
      <select
        className='select-size'
        value={selectValue}
        onChange={(e) => {
          setSelectValue(e.currentTarget.value)
          selectPrice(e) 
        }}
      >
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