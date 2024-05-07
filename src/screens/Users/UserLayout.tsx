import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/User/UserNavbar';
import { Outlet } from 'react-router-dom';

function UserLayout() {

  return (
    <>
      <UserNavbar />
      <Outlet/>
    </>
  )
}

export default UserLayout