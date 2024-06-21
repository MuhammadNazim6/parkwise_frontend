import React from 'react'
import UserNavbar from '../../components/User/UserNavbar';
import Hero from '../../components/User/Banner1';
import Hero_second from '../../components/User/Banner2';
import Hero_third from '../../components/User/Banner3';
import Footer from '../../components/User/Footer';


function UserLandingPage() {
  return (
    <>
      <UserNavbar />
      <Hero/>
      <Hero_second/>
      <Hero_third/>
      <Footer/>
    </>
  )
}

export default UserLandingPage