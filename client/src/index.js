import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { UserProvider } from './utils/userContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
