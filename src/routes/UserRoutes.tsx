import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLogin from '../screens/Common/CommonLogin';
import UserLayout from '@/screens/Users/UserLayout';
import UserSignup from '../screens/Users/UserSignup';
import UserLandingPage from '../screens/Users/UserLandingPage';
import UserEmailVerify from '../screens/Users/UserEmailVerify';
import UserFindLots from '../screens/Users/UserFindLots';
import CommonForgotPassword from '../screens/Common/CommonForgotPassword';
import UserProtect from '@/routes/protected/UserProtect';
import CommonLeftSideLayout from '@/screens/Common/CommonLeftSideLayout';
import CommonChangePassword from '@/screens/Common/CommonChangePassword';
import UserParkingLotDetails from '@/screens/Users/UserParkingLotDetails';
import UserProfile from '@/screens/Users/UserProfile';
import UserChats from '@/screens/Users/UserChats';
import UserDirections from '@/screens/Users/UserDirections';
import NotFoundPage from '@/screens/Common/NotFoundPage';
import VideoCallRoom from '@/screens/Common/VideoCallRoom';

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

      <Route element={<UserLayout />} >
        <Route path='/user/find' element={<UserFindLots />} />
        <Route path='/user/find/lotDetails/:id' element={<UserParkingLotDetails />} />
        <Route path='/user/find/lotDetails/directions' element={<UserDirections />} /> 
        <Route element={<UserProtect />}>
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/chats' element={<UserChats />} />
        </Route>

      </Route>
      <Route path="/user/chats/video-call/:roomId" element={<VideoCallRoom />} /> 
      <Route path="*" element={<NotFoundPage />} /> 
    </Routes>
  )
}

export default UserRoutes