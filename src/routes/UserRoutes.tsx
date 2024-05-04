import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLogin from '../screens/Common/CommonLogin';
import UserSignup from '../screens/Users/UserSignup';
import UserLandingPage from '../screens/Users/UserLandingPage';
import UserEmailVerify from '../screens/Users/UserEmailVerify';
import UserHome from '../screens/Users/UserHome';
import UserForgotPassword from '../screens/Users/UserForgotPassword';
import UserProtect from '@/components/User/protected/UserProtect';

function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<UserLandingPage />} />
      <Route path='/login' element={<CommonLogin />} />
      <Route path='user/signup' element={<UserSignup />} />
      <Route path='user/forgotpassword' element={<UserForgotPassword />} />
      <Route path='user/email-verify' element={<UserEmailVerify />} />


      <Route element={<UserProtect />}>
      <Route path='user/home' element={<UserHome />} />
      </Route>

    </Routes>
  )
}

export default UserRoutes