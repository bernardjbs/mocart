import React, { useState, useEffect, useCallback } from 'react';

import './gallery.css'
import Auth from '../../utils/auth';
import axios from 'axios';

// Import components
import Dropdown from '../../components/dropdown/Dropdown';
import Item from '../../components/item/Item';
import Cart from '../../components/cart/Cart';

import { Badge, Button, Drawer, Grid } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;


function Gallery() {

  const getTotalItems = (items) => {
    const reducedAmount = items.reduce((acc, item) => acc + item.amount, 0);
    // console.log(reducedAmount);
    return reducedAmount
  }

  const handleAddToCart = (clickedItem) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item._id === clickedItem._id);

      if (isItemInCart) {
        const items = prev.map(item =>
          item._id === clickedItem._id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return items;
      }
      // First time the item is added
      
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = () => null;

  const handlePictureFileChange = (e) => {
    setPictureFiles(e.target.files);
  }

  const handleUploadPictures = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < pictureFiles.length; i++) {
      formData.append('files', pictureFiles[i]);
    }
    await pictureFilesUpload(formData);
    getPictures();
  }

  // Declaring States
  const [pictureFiles, setPictureFiles] = useState('');
  const [getPicturesData, setGetPicturesData] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  // Get pictures data
  const getPictureFiles = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URI}/api/picture/pictures`);
      console.log(data)
      setGetPicturesData(data);
      return data;
    } catch (error) {
      throw error;
    };
  }, []);

  // Upload Pictures API
  const pictureFilesUpload = async (data) => {
    try {
      await axios.post(`${URI}/api/picture/uploadmultiple`, data);
    } catch (error) {
      throw error;
    }
  }

  const getPictures = async () => {
    try {
      const pictures = await getPictureFiles();
      // console.log(pictures)
      setGetPicturesData(pictures);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPictureFiles()
      .catch(console.error);
  }, [getPictureFiles]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Select Picture Files</label>
            <input type="file" onChange={(e) => handlePictureFileChange(e)} className="form-control" multiple />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <button type="button" onClick={() => handleUploadPictures()} className="btn btn-danger">Upload</button>
        </div>
      </div>
      <section className="pictures-section">
        <h1 className="test">My Pictures</h1>

        {getPicturesData.map((data) =>
          <div key={data._id} className="row">
            {data.filename}
            <div className='row quantity'>
              Quantity
              <input />
            </div>
            <Dropdown />
          </div>
        )}
      </section>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Button onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </Button>
      <Grid container spacing={3}>
        {getPicturesData?.map(item => (
          <Grid item key={item._id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </>

  )


};

export default Gallery;