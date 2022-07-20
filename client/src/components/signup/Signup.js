import React, { useState } from "react";
import Axios from 'axios';
import Auth from '../../utils/auth';

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
        userType: 'User'
      });

      // signup the user and redirect to homepage
      Auth.login(response.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signup-form">
      <form onSubmit={handleFormSubmit}>
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
        <button
          className="btn btn-block btn-primary"
          style={{ cursor: 'pointer' }}
          type="submit"
        >
          Sign Up
        </button>
      </form>

    </div>
  );
};

export default Signup;