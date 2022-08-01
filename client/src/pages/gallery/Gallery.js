import React, { useState, useEffect, useCallback } from 'react';
import Nav from '../../components/nav/Nav'

import './gallery.css'
import Auth from '../../utils/auth';
import axios from 'axios';

// Import components
import Item from '../../components/item/Item';
import Cart from '../../components/cart/Cart';

import { Badge, Button, Drawer, Grid } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;
const STRIPE_KEY = process.env.REACT_APP_STRIPE;

let loggedInUser;
if (Auth.loggedIn()) {
  loggedInUser = Auth.getProfile().data;
}

function Gallery() {

  const getTotalItems = (items) => {
    const reducedAmount = items.reduce((acc, item) => acc + item.amount, 0);
    return reducedAmount
  }

  const handleSelectedSize = (selectedItem) => {
    console.log("i am here - handleSelectedSize() Gallery.js")
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item._id === selectedItem._id);

      if (isItemInCart) {
        const items = prev.map(item =>
          item._id === selectedItem._id
            ? { ...item, selectedSize: selectedItem.size }
            : item
        );
        return items;
      }
    });
  };
  const handlePrice = (selectedItem) => {
    // console.log("i am here")
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item._id === selectedItem._id);

      if (isItemInCart) {
        const items = prev.map(item =>
          item._id === selectedItem._id
            ? { ...item, price: selectedItem.price }
            : item
        );
        return items;
      }
    });
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item._id === clickedItem._id);

      if (isItemInCart) {
        const items = prev.map(item =>
          item._id === clickedItem._id
            ? { ...item, amount: item.amount + 1, id: clickedItem._id }
            : item
        );
        return items;
      }

      // First time the item is added, initialize the amount and the size
      return [...prev, { ...clickedItem, amount: 1, id: clickedItem._id }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item._id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  const handlePictureFileChange = (e) => {
    setPictureFiles(e.target.files);
  }

  const handleUploadPictures = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < pictureFiles.length; i++) {
      formData.append('files', pictureFiles[i]);
      formData.append('userId', loggedInUser._id);
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
      const { data } = await axios.get(`${URI}/api/picture/pictures/${loggedInUser._id}`);
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
      <Nav />
      <section className='select-files-container'>
        <div className="form-group">
          <h2>Select Picture Files</h2>
        </div>
        <section className='upload-section'>
          <input type="file" onChange={(e) => handlePictureFileChange(e)} className="form-control" multiple />
          <div className="col-10">
            <button type="button" onClick={() => handleUploadPictures()} className="btn btn-primary">Upload</button>
          </div>
        </section>
      </section>

      <section className="pictures-section">
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            handlePrice={handlePrice}
            stripeKey={STRIPE_KEY}
            handleSelectedSize={handleSelectedSize}
          />
        </Drawer>

        <section className='gallery-container'>
          <section className='badge-container'>
            <Button onClick={() => setCartOpen(true)}>
              <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                <AddShoppingCart />
              </Badge>
            </Button>
          </section>
          <h1>My Pictures</h1>

          <Grid container spacing={3}>
            {getPicturesData?.map(item => (
              <Grid item key={item._id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </section>
      </section>
    </>

  )


};

export default Gallery;