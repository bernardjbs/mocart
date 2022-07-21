import React, { useState, useRef } from 'react';
import Auth from '../../utils/auth';
import Axios from 'axios';

// import Dropzone from 'react-dropzone';
// import { button, Checkbox, form, Input } from 'antd';
const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Order() {

  const [loginFormState, setLoginFormState] = useState([{ email: '', password: '' }]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${URI}/api/print/uploads`, {
        username: loginFormState.username,
        password: loginFormState.password
      });
      // Login the user and redirect to homepage
      Auth.login(response.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  const uploadSingleFile = async () => {
    const formData = new FormData();

  }
  return (
    <>

      <form onSubmit={handleFormSubmit}>
        <div class="row">
          <div class="col-8">
            <input type="file" class="form-control" name="images" id="formFile" multiple />
          </div>
          <div class="col-2">
            <input type="submit" class="btn btn-warning" value="Upload Images" />
          </div>
        </div>
      </form>
      <section class="mt-5">
        <div class="row">

          {/* LOOP AND DISPLAY IMAGES */}

        </div>
      </section>
    </>
  )


};

export default Order;