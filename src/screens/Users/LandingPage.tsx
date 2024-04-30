import React from 'react'
import Navbar from '../../components/User/Navbar';
import Hero from '../../components/User/Hero';
import Hero_second from '../../components/User/Hero_second';
import Hero_third from '../../components/User/Hero_third';
import Footer from '../../components/User/Footer';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Hero_second/>
      <Hero_third/>
      <Footer/>
    </>
  )
}

export default LandingPage