import React, { useState } from 'react'
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinkButton,
  NavbarLinkExtended
} from '../styles/Navbar.style';

import LogoImg from "../assets/Plogo.png";


function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false)

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>

          <NavbarLinkContainer>
            <NavbarLink to='/home' > Home </NavbarLink>
            <NavbarLink to='' > Find spots </NavbarLink>
            <NavbarLink to='' > About </NavbarLink>
            <NavbarLink to='' > Profile </NavbarLink>
            <OpenLinkButton onClick={() => setExtendNavbar((curr) => !curr)}>
              {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinkButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (<NavbarExtendedContainer>
        <NavbarLinkExtended to='' > Home </NavbarLinkExtended>
        <NavbarLinkExtended to='' > Find spots </NavbarLinkExtended>
        <NavbarLinkExtended to='' > About </NavbarLinkExtended>
        <NavbarLinkExtended to='' > Profile </NavbarLinkExtended>
      </NavbarExtendedContainer>)}
    </NavbarContainer>
  )
}

export default Navbar