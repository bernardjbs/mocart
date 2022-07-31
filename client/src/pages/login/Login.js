import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import './login.css';
import Auth from '../../utils/auth';
import Nav from '../../components/nav/Nav'


const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

// Test on local build 
// const URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : http://www.localhost:5000;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // Check if location has the state, from and pathname properties, assin that location to const from, else assign '/' to const from
  const from = location.state?.from?.pathname || '/';

  const [loginFormState, setLoginFormState] = useState([{ email: '', password: '' }]);

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
        email: loginFormState.email,
        password: loginFormState.password
      });
      // Login the user and navigate to the from location
      Auth.login(response.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Nav />
      <section className='login-container'>
        <form onSubmit={handleFormSubmit}>
          <section className='login'>
          <section className='input-container'>
              <div><p>Email</p></div>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={loginFormState.email || ''}
                onChange={handleChange}
              />
            </section>
            <section className='input-container'>
              <p>Password</p>
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={loginFormState.password || ''}
                onChange={handleChange}
              />
            </section>
            <section className='button-section'>
              <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                type="submit"
              >Login
              </button>
            </section>
          </section>
            
          </form>
      </section>

    </>

  );
}

export default Login;