import React, { useState } from 'react'
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

import LogoImg from "../../assets/Plogo.png";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


function Navbar() {
  // const [extendNavbar, setExtendNavbar] = useState(false)
  const [nav, setNav] = useState(true)
  const handleNav = ()=>{
    setNav(!nav)
  }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4  text-black'>
      <h1 className='w-full text-3xl font-bold'><img className='w-20 cursor-pointer' src={LogoImg}/></h1>
      <ul className='hidden md:flex'>
        <li className='p-4 cursor-pointer text-lg w-28'>Home</li>
        <li className='p-4 cursor-pointer text-lg w-32'>Find spots</li>
        <li className='p-4 cursor-pointer text-lg w-28'>About</li>
        <li className='p-4 cursor-pointer text-lg w-28'>Signin</li>

      </ul>
      <div onClick={handleNav} className='block md:hidden '>
        {!nav ? <AiOutlineClose size={25} className='cursor-pointer' />  : <AiOutlineMenu size={25} className='cursor-pointer'/>  }
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[70%] h-full border-r bg-white ease-in-out duration-500  md:hidden' : 'fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-primary-blue ease-in-out duration-500'}>
        <h1 className='w-full text-3xl font-bold m-8 text-white'> &nbsp; </h1>

        <ul className='uppercase p-4'>
          <li className='p-4'>Home</li>
          <li className='p-4 border-gray-600'>Find spots</li>
          <li className='p-4 border-gray-600'>About</li>
          <li className='p-4'>Signin</li>
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