import React, { useState } from "react";
import Axios from 'axios';
import Auth from '../../utils/auth';
import Nav from '../../components/nav/Nav'
import './signup.css';

// Todo: Perform check if password is correct by matching another entry, also check if password is valid by regex - maybe in user model schema validation? 

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

function Signup() {
  const [signupFormState, setsignupFormState] = useState([{ email: '', password: '', firstName: '', lastName: '' }]);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setsignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${URI}/api/users/signup`, {
        email: signupFormState.email,
        password: signupFormState.password,
        firstName: signupFormState.firstName,
        lastName: signupFormState.lastName,
        userType: 'Customer',
        shippingDetails: [
          {
            street: signupFormState.street,
            city: signupFormState.city,
            postalCode: signupFormState.postalCode,
            state: signupFormState.state,
            country: signupFormState.country,
          }
        ]
      });

      // signup the user and redirect to homepage
      Auth.login(response.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Nav />

      <form onSubmit={handleFormSubmit}>
        <section className="signup-form-container">
          <input
            className="form-input"
            placeholder="Your first name"
            name="firstName"
            type="text"
            value={signupFormState.firstName || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Your last name"
            name="lastName"
            type="text"
            value={signupFormState.lastName || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={signupFormState.email || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={signupFormState.password || ''}
            onChange={handleChange}
          />
          <h2 className="shipping-details">Shipping Details</h2>
          <input
            className="form-input"
            placeholder="Street"
            name="street"
            type="text"
            value={signupFormState.street || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="City"
            name="city"
            type="text"
            value={signupFormState.city || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Postal Code"
            name="postalCode"
            type="text"
            value={signupFormState.postalCode || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="State"
            name="state"
            type="text"
            value={signupFormState.state || ''}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Country"
            name="country"
            type="text"
            value={signupFormState.country || ''}
            onChange={handleChange}
          />
          <div className="btn-signup">
            <button
              className="btn btn-block btn-primary"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Sign Up
            </button>

          </div>
        </section>
      </form>


    </>

  );
};

export default Signup;