import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login_Signup from '../screens/Users/Login_Signup';
import UserSignup from '../screens/Users/UserSignup';
import LandingPage from '../screens/Users/LandingPage';
import EmailVerification from '../screens/Users/EmailVeriyUser';
import FindSpots from '../screens/Users/FindSpots';
import ForgotPassword from '../screens/Users/ForgotPassword';

function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='user/login' element={<Login_Signup />} />
      <Route path='user/signup' element={<UserSignup />} />
      <Route path='user/forgotpassword' element={<ForgotPassword />} />
      <Route path='user/email-verify' element={<EmailVerification />} />
      <Route path='user/find' element={<FindSpots />} />



    </Routes>
  )
}

export default UserRoutes