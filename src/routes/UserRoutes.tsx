import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLogin from '../screens/Common/CommonLogin';
import UserLayout from '@/screens/Users/UserLayout';
import UserSignup from '../screens/Users/UserSignup';
import UserLandingPage from '../screens/Users/UserLandingPage';
import UserEmailVerify from '../screens/Users/UserEmailVerify';
import UserFindLots from '../screens/Users/UserFindLots';
import CommonForgotPassword from '../screens/Common/CommonForgotPassword';
import UserProtect from '@/components/User/protected/UserProtect';
import CommonLeftSideLayout from '@/screens/Common/CommonLeftSideLayout';
import CommonChangePassword from '@/screens/Common/CommonChangePassword';
import UserParkingLotDetails from '@/screens/Users/UserParkingLotDetails';
import UserProfile from '@/screens/Users/UserProfile';
import UserChats from '@/screens/Users/UserChats';

function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<UserLandingPage />} />
      <Route path='login' element={<CommonLeftSideLayout />}>
        <Route path='' element={<CommonLogin />} />
        <Route path='forgotpassword' element={<CommonForgotPassword />} />
        <Route path='changePassword' element={<CommonChangePassword />} />
      </Route>
      <Route path='user/signup' element={<UserSignup />} />
      <Route path='user/email-verify' element={<UserEmailVerify />} />

      <Route path='user' element={<UserLayout />} >
        <Route path='find' element={<UserFindLots />} />
        <Route path='find/lotDetails/:id' element={<UserParkingLotDetails />} />
        <Route element={<UserProtect />}>
          <Route path='profile' element={<UserProfile />} />
          <Route path='profile/chats' element={<UserChats />} />
        </Route>

      </Route>


      {/* protected start */}

    </Routes>
  )
}

export default UserRoutes