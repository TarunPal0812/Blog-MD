import React, { useState, useEffect } from 'react';
import Loader from './components/Loader'; 

import './index.css'
import "./style.scss"
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Write from './pages/Write';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000);
  }, []);



  return (
    <div className="app">

      {isLoading ? <Loader /> :

      <div className="container">
        <Routes>
          <Route path='/' element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/:id' element={<>
            <Navbar />
            <Single />
            <Footer />
          </>} />
          <Route path='/write' element={<>
            <Navbar />
            <Write />
            <Footer />
          </>} />
        </Routes>
      </div>
}
    </div>


  )
}

export default App
