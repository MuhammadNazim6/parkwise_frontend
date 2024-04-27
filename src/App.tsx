import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/Users/LandingPage';
import Login_Signup from './screens/Users/Login_Signup';
import Login_SignupProvider from './screens/Provider/Login_SignupProvider';
import Login_Admin from './screens/Admin/Login_Admin';
import EmailVerification from './screens/Common/EmailVerification';
import FindSpots from './screens/Users/FindSpots';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' />
        <Route path='/user/login' element={<Login_Signup/>}/>
        <Route path='/user/signup' element={<Login_Signup/>} />
        <Route path='/user/forgotpassword' element={<Login_Signup/>} />
        <Route path='/provider/login' element={<Login_SignupProvider/>} />
        <Route path='/provider/signup' element={<Login_SignupProvider/>} />
        <Route path='/provider/forgotpassword' element={<Login_SignupProvider/>} />
        <Route path='/admin/login' element={<Login_Admin/>} />
        <Route path='/email' element={<EmailVerification/>} />
        <Route path='/find' element={<FindSpots/>} />
      </Routes>
    </Router>
  )
}

export default App
