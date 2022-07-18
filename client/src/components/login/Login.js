import React, { useState } from 'react';
import Axios from 'axios';
import './login.css';
import Auth from '../../utils/auth';

const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

// Test on local build 
// const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : http://www.localhost:5000;

function LoginForm(props) {

  const [loginFormState, setLoginFormState] = useState([{ email: '', password: '' }]);
  
  const loginAction = props.action;

  if (loginAction === 'login') {
    console.log('login');
  } else if (loginAction === 'logout') {
    console.log('logout');
  } else {
    console.log('Signup');
  }

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginFormState({
      ...loginFormState,
      [name]: value,
    }); 
  };
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${URI}/api/users/login`, {
        username: loginFormState.username,
        password: loginFormState.password
      });
      console.log("URI: " + URI)
      console.log(response)
      // Login the user and redirect to homepage
      Auth.login(response.data.token);
  
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Your email"
          name="email"
          type="email"
          value={loginFormState.email || ''}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="******"
          name="password"
          type="password"
          value={loginFormState.password || ''}
          onChange={handleChange}
        />
        <button
          className="btn btn-block btn-primary"
          style={{ cursor: 'pointer' }}
          type="submit"
        >
          Login
        </button>
      </form>

    </div>
  );
}

export default LoginForm;