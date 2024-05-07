import React, { useState } from 'react';
import LoginForm from '../../components/Common/LoginForm';
import SignupForm from '../../components/User/SignupForm';
import LogoImg from "../../assets/Images/WhatsApp_Image_2024-05-07_at_20.13.27_bb0ad381-removebg-preview.png";
import { useNavigate } from 'react-router-dom';


interface MyComponentProps {
  toggleFn: () => void;
  togglePasswordFn: () => void;
}
function UserSignup() {

  const navigate = useNavigate()
  const [toggleLogin, setToggleLogin] = useState(true)


  return (
    <div className='flex w-full h-screen lg:bg-primary-blue'>
      <div className="hidden lg:flex h-full w-1/2 items-center  justify-center">
        <div className="w-1/2">
          <img src={LogoImg} className='' />
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <SignupForm />
      </div>
    </div>
  )
}

export default UserSignup