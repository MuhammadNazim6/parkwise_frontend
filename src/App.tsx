import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import './App.css';

function App() {

  return (
    <Router>
      <LandingPage />
      <Routes>
        <Route path='/home' element={<LandingPage/>}/>
        <Route path='/user/login' />
        <Route path='/admin/login' />
      </Routes>
    </Router>
  )
}

export default App
