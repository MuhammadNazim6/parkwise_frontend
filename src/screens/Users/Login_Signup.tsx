import React, { useState } from 'react';
import LoginForm from '../../components/User/LoginForm';
import SignupForm from '../../components/User/SignupForm';
import ForgotPassForm from '../../components/Common/ForgotPassForm';
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";
import { useNavigate } from 'react-router-dom';


interface MyComponentProps {
  toggleFn: () => void;
  togglePasswordFn: () => void;
}
function Login_Signup() {

  const navigate = useNavigate()
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleFPassword, setToggleFPassword] = useState(false)
  const toggleFn = () => {
    setToggleLogin(!toggleLogin)
    toggleLogin ? navigate('/user/signup') : navigate('/user/login')
  }
  const togglePasswordFn = () =>{
    setToggleFPassword(!toggleFPassword)
    navigate('/user/forgotpassword')
  }
  return (
    <div className='flex w-full h-screen lg:bg-primary-blue'>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            {toggleLogin ? <h1 className='text-4xl text-center leading-normal'>"Navigate effortlessly, park confidently."</h1> :
              <h1 className='text-4xl text-center leading-normal'>"Embark on a journey of convenience and ease. Sign up today!"</h1>}
          </div>
          <div className="m-10 ml-28">
            <img src={LogoImg} className='w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16' />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
      {toggleFPassword ? <ForgotPassForm togglePasswordFn={togglePasswordFn}/> : (toggleLogin ? <LoginForm toggleFn={toggleFn} togglePasswordFn={togglePasswordFn} /> : <SignupForm toggleFn={toggleFn} />)}
      </div>
    </div>
  )
}

export default Login_Signup