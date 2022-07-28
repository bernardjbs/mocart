import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/home/Home'
import Gallery from './pages/gallery/Gallery'
import Nav from './components/nav/Nav'

function App() {
  return (
    <>
      <Nav />
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          </Route>
          <Route path="/gallery" element={<Gallery/>}>
          </Route>
        </Routes>
      </Router>
      {/* <MocartContainer /> */}
    </>
  );
}

export default App;
