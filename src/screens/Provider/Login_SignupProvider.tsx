import React, { useState } from 'react';
import LoginForm from '../../components/Provider/LoginForm';
import SignupForm from '../../components/Provider/SignupForm';
import ForgotPassForm from '../../components/Common/ForgotPassForm';
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-white-transparent.png";
import { useNavigate } from 'react-router-dom';


interface MyComponentProps {
  toggleFn: () => void;
  togglePasswordFn: () => void;
}
function Login_SignupProvider() {

  const navigate = useNavigate()
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleFPassword, setToggleFPassword] = useState(false)

  const toggleFn = () => {
    setToggleLogin(!toggleLogin)
    toggleLogin ? navigate('/provider/signup') : navigate('/provider/login')
  }
  const togglePasswordFn = () =>{
    setToggleFPassword(!toggleFPassword)
    navigate('/provider/forgotpassword')
  }

  return (
    <div className='flex w-full h-screen lg:bg-primary-provider'>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            {toggleLogin ? <h1 className='text-4xl text-center text-white leading-normal'>"Together, we pave the way for hassle-free parking."
            </h1> :
              <h1 className='text-4xl text-center text-white leading-normal'>"Embark on a journey of convenience and ease. Sign up as a parking provider today!"</h1>}
          </div>
          <div className="m-10 ml-28">
            <img src={LogoImg} className='w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16' />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        {toggleFPassword ? <ForgotPassForm togglePasswordFn={togglePasswordFn}/> : (toggleLogin ? <LoginForm toggleFn={toggleFn} togglePasswordFn={togglePasswordFn}/> : <SignupForm toggleFn={toggleFn} />)}

      </div>
    </div>
  )
}

export default Login_SignupProvider