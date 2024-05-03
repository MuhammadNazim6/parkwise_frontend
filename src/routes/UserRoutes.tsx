import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../screens/Common/LoginPage';
import UserSignup from '../screens/Users/UserSignup';
import LandingPage from '../screens/Users/LandingPage';
import EmailVerification from '../screens/Users/EmailVeriyUser';
import UserHome from '../screens/Users/UserHome';
import ForgotPassword from '../screens/Users/ForgotPassword';

function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='user/signup' element={<UserSignup />} />
      <Route path='user/forgotpassword' element={<ForgotPassword />} />
      <Route path='user/email-verify' element={<EmailVerification />} />



      <Route path='user/home' element={<UserHome />} />

    </Routes>
  )
}

export default UserRoutes