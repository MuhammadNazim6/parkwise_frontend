import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLogin from '../screens/Common/CommonLogin';
import UserLayout from '@/screens/Users/UserLayout';
import UserSignup from '../screens/Users/UserSignup';
import UserLandingPage from '../screens/Users/UserLandingPage';
import UserEmailVerify from '../screens/Users/UserEmailVerify';
import UserHome from '../screens/Users/UserHome';
import CommonForgotPassword from '../screens/Common/CommonForgotPassword';
import UserProtect from '@/components/User/protected/UserProtect';
import CommonLeftSideLayout from '@/screens/Common/CommonLeftSideLayout';
import CommonChangePassword from '@/screens/Common/CommonChangePassword';
import UserParkingLotDetails from '@/screens/Users/UserParkingLotDetails';

function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<UserLandingPage />} />
      <Route path='login' element={<CommonLeftSideLayout />}>
        <Route path='' element={<CommonLogin />} />
        <Route path='forgotpassword' element={<CommonForgotPassword />} />
        <Route path='changePassword' element={<CommonChangePassword/>} />
      </Route>
      <Route path='user/signup' element={<UserSignup />} />
      <Route path='user/email-verify' element={<UserEmailVerify />} />

      <Route path='user' element={<UserLayout />} >
        <Route path='home' element={<UserHome />} />
        <Route path='home/lotDetails' element={<UserParkingLotDetails />} />
      </Route>

      
{/* protected start */}
      <Route element={<UserProtect />}>
      </Route>

    </Routes>
  )
}

export default UserRoutes