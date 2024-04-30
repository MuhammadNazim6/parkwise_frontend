import * as React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useProviderLoginMutation } from '../../slices/providerSlice';
import { setProviderCredentials } from '../../slices/authSlice';
import { toast } from '../../script/toast'


export default function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useProviderLoginMutation();
  const { providerInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (providerInfo) {
      navigate('/')
    }
  }, [navigate, providerInfo])

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const emailRegex = /^\S+@\S+\.\S+$/;
      const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
      if (!email || !password) {
        toast('error', "All fields should be filled");
      } else if (!email.match(emailRegex)) {
        toast('error', "Invalid username or password");
      } else if (!password.match(passwordRegex)) {
        toast('error', "Incorrect username or password");
      } else {
        const formData = {
          email,
          password,
        };
        const res = await login(formData).unwrap();
        dispatch(setProviderCredentials({ ...res }))
        toast('success', res.message)
        navigate('/')
      }

    } catch (err) {
      toast('error', 'Incorrect username or password');
    }
  }

  return (
    <div className='bg-white p-10 lg:border-0'>
      <h1 className='text-4xl font-semibold '>Welcome back</h1>
      <p className='font-medium text-lg text-gray-500 mt-4 tracking-wide'>Please enter your details.</p>
      <div className='mt-8 '>
        <form onSubmit={submitHandler}>
          <div className="">
            <label className='text-lg font-medium tracking-wide' >Email</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="">
            <label className='text-lg font-medium tracking-wide' >Password</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="">
            </div>
            <Link to='/provider/forgotPassword'> <button type='button' className='font-medium text-base text-secondary-blue hover:scale-[1.02]'>Forgot password?</button></Link>
          </div>
          <div className='mt-4 gap-y-4 flex justify-center items-center'>
            <button type='submit' className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-secondary-provider text-white text-lg font-bold w-11/12 h-11'>Sign in</button>
          </div>
        </form>

        <div className='mt-4 gap-y-4 flex justify-center items-center'>
          <button className='flex justify-center items-center p-3 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 border-2 border-blue-300 rounded-xl h-11 w-11/12'><FaGoogle /> Sign in with Google</button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className='font-medium text-base'>Don't have an account?</p>
      <Link to='/provider/signup'>
      <button className='text-secondary-blue text-base font-medium ml-2 hover:scale-[1.02]' >Sign up</button>
      </Link>
        </div>
      </div>
    </div>
  )
}