import React from 'react'
import UserNavbar from '../../components/User/UserNavbar';
import Hero from '../../components/User/Hero';
import Hero_second from '../../components/User/Hero_second';
import Hero_third from '../../components/User/Hero_third';
import Footer from '../../components/User/Footer';
import Paypal from '@/components/User/Paypal';

function UserLandingPage() {
  return (
    <>
      <UserNavbar />
      <Hero/>
      <Paypal/>
      <Hero_second/>
      <Hero_third/>
      <Footer/>
    </>
  )
}

export default UserLandingPage