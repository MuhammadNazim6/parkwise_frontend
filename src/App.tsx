import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/Users/LandingPage';
import Login_Signup from './screens/Users/Login_Signup';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' />
        <Route path='/user/login' element={<Login_Signup/>}/>
        <Route path='/user/signup' element={<Login_Signup/>} />
      </Routes>
    </Router>
  )
}

export default App
