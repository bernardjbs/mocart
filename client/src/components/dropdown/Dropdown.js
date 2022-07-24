import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Dropdown() {


  const [sizes, setSizes] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function getSizes() {
      // Fetch data
      const { data } = await axios.get(`${URI}/api/printsize`);
      setSizes(data.map((data) => ({ label: data.dimension, value: data.dimension })));
    }

    // Trigger the fetch
    getSizes();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      {sizes.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;