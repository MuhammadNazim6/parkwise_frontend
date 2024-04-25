import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import {
//   NavbarContainer,
//   LeftContainer,
//   RightContainer,
//   NavbarInnerContainer,
//   NavbarExtendedContainer,
//   NavbarLinkContainer,
//   NavbarLink,
//   Logo,
//   OpenLinkButton,
//   NavbarLinkExtended,
//   NavbarButton
// } from '../styles/Navbar.style';

import LogoImg1 from "../../assets/Images/Plogo.png";
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";
import LogoImgBlack from "../../assets/Images/parkwise-high-resolution-logo-black-transparent.png";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


function Navbar() {
  // const [extendNavbar, setExtendNavbar] = useState(false)
  const [nav, setNav] = useState(true)
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4  text-black'>
      <h1 className='w-full text-3xl font-bold'><img className='w-40 cursor-pointer' src={LogoImg} /></h1>
      <ul className='hidden md:flex'>
        <Link to='/'>
          <li className='p-4 cursor-pointer text-lg w-28'>Home</li>
        </Link>
        <Link to='/user/find'>
          <li className='p-4 cursor-pointer text-lg w-32'>Find spots</li>
        </Link>
        <Link to='/about'>
          <li className='p-4 cursor-pointer text-lg w-28'>About</li>
        </Link>
        <Link to='/user/login'>
          <li className='p-4 cursor-pointer text-lg w-28'>Signin</li>
        </Link>
        <Link className='bg-secondary-blue w-48 p-1 text-white font-semibold rounded-md flex justify-center items-center tracking-normal' to='/provider/login'>
        <button className=''>
        List your property / Login as provider
        </button>
        </Link>

      </ul>
      <div onClick={handleNav} className='block md:hidden '>
        {!nav ? <AiOutlineClose size={25} className='cursor-pointer' /> : <AiOutlineMenu size={25} className='cursor-pointer' />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[70%] h-full border-r bg-white ease-in-out duration-500  md:hidden' : 'fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-primary-blue ease-in-out duration-500'}>
        <h1 className='w-full text-3xl font-bold m-8 text-white'><img className='w-40 cursor-pointer' src={LogoImgBlack} /></h1>

        <ul className='uppercase p-4'>
        <li className='p-4 border-t-2'><Link to="/">Home</Link></li>
      <li className='p-4 border-t-2'><Link to="/find_spots">Find spots</Link></li>
      <li className='p-4 border-t-2'><Link to="/about">About</Link></li>
      <li className='p-4 border-t-2'><Link to="user/login">Signin</Link></li>
      <li className='p-4 border-t-2 capitalize'><Link to="/provider/login">List your property / Sign in as a provider</Link></li>
        </ul>
      </div>
    </div>


    // <NavbarContainer extendNavbar={extendNavbar}>
    //   <NavbarInnerContainer>
    //     <LeftContainer>

    //       <NavbarLinkContainer>
    //         <NavbarLink to='/'> Home </NavbarLink>
    //         <NavbarLink to='/findSpots' > Find spots </NavbarLink>
    //         <NavbarLink to='/about' > About </NavbarLink>
    //         <NavbarLink to='/signup' > Profile </NavbarLink>
    //         <OpenLinkButton onClick={() => setExtendNavbar((curr) => !curr)}>
    //           {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
    //         </OpenLinkButton>
    //       </NavbarLinkContainer>
    //     </LeftContainer>
    //     <RightContainer>
    //         <NavbarButton>List your properties / Login </NavbarButton>
    //       <Logo src={LogoImg}></Logo>
    //     </RightContainer>
    //   </NavbarInnerContainer>
    //   {extendNavbar && (<NavbarExtendedContainer>
    //     <NavbarLinkExtended to=''> Home </NavbarLinkExtended>
    //     <NavbarLinkExtended to=''> Find spots </NavbarLinkExtended>
    //     <NavbarLinkExtended to=''> About </NavbarLinkExtended>
    //     <NavbarLinkExtended to=''> Profile </NavbarLinkExtended>
    //     <NavbarLinkExtended to=''> List your properties / Login </NavbarLinkExtended>
    //   </NavbarExtendedContainer>)}
    // </NavbarContainer>
  )
}

export default Navbar