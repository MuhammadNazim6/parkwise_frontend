import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useCommonLoginMutation } from "@/redux/slices/commonSlice";
import { useUserSignGoogleMutation } from "../../redux/slices/userApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { setProviderCredentials } from "../../redux/slices/authSlice";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Loader } from '../Common/BootstrapElems'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'



export default function LoginForm(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('')
  const [commonError, setCommonError] = useState('')
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [commonLogin, { isLoading }] = useCommonLoginMutation();
  const [sign] = useUserSignGoogleMutation()

  const { userInfo } = useSelector((state) => state.auth);
  const { uLoggedIn } = useSelector((state) => state.auth);
  const { pLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uLoggedIn) {
      navigate("/");
    } else if (pLoggedIn) {
      navigate('/provider')
    }
  }, [navigate, uLoggedIn, pLoggedIn]);

  // GOOGLE AUTH

  const Glogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
        );

        console.log(res.data);

        const googleUserData = {
          name: res.data.name,
          email: res.data.email,
          mobile: 0,
          password: res.data.sub,
          google: true
        }

        const signed = await sign(googleUserData).unwrap()
        if (signed.success) {
          dispatch(setCredentials({ ...googleUserData, password: '' }))
          localStorage.setItem('token', signed.token)
          navigate('/')
        } else {
          alert('Try another login method')
        }

      } catch (error) {
        console.log(error);
      }
    },

  });

  const onFailure = (res) => {
    console.log('Login failed, ', res);
  }



  const handleSignupClick = () => {
    navigate('/', { replace: true });
  };

  // END  ---------
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setEmailError('')
      setCommonError('')
      const emailRegex = /^\S+@\S+\.\S+$/;
      const passwordRegex =
        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;

      if (!email.match(emailRegex) || !password.match(passwordRegex)) {
        if (!email) {
          setEmailError('Email is required')
        } else if (!email.match(emailRegex)) {
          setEmailError('Enter a valid email')
        }
        if (!password) {
          setCommonError('Password is required')
        } else if (!password.match(passwordRegex)) {
          setCommonError('Incorrect username or password')
        }
      } else {
        const formData = {
          email,
          password,
        };

        // Common login for user,provider and admin
        const res = await commonLogin(formData).unwrap()
        console.log(res);
        if (res.success) {
          if (res.data.role === 'user') {
            dispatch(setCredentials({ ...res.data }));
            localStorage.setItem('token', res.token)
            navigate("/user/home");
          } else if (res.data.role === 'provider') {
            dispatch(setProviderCredentials({ ...res.data }));
            localStorage.setItem('token', res.token)
            navigate("/provider");
          } else if (res.data.role === 'admin') {
            // dispatch(setProviderCredentials({ ...res }));
            // ocalStorage.setItem('token', res.token)
            // navigate("/provider");

            // WHEN ADMIN LOGINS
          } else {
            setCommonError('Incorrect username or password')
          }
        } else {
          setCommonError('Incorrect username or password')
          // toast({
          //   variant: "destructive",
          //   title: "Incorrect username or password",
          //   description: "Incorrect username or password",
          // })
        }
      }
    } catch (err) {
      console.log('Error catched while logging in ');

    }
  };

  return (
    <div className="bg-white p-2 md:p-10 lg:border-0 w-5/6">
      <h1 className="md:text-4xl text-2xl font-semibold md:block ">Welcome back</h1>
      <p className="font-medium text-lg text-gray-500 md:mt-4 tracking-wide">
        Please enter your details.
      </p>
      <div className="md:mt-8 mt-6">
        <form onSubmit={submitHandler}>
          <div className="h-24">
            <label className="text-lg font-medium tracking-wide">Email</label>
            <input
              className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent h-12"
              placeholder="Enter your email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-400 pl-2">{emailError}</p>}
          </div>
          <div className="mt-2 h-24">


          </div>
          <div className="mt-2 h-24">
            <label className="text-lg font-medium tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent h-12"
                placeholder="Enter your password"
                type={showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-xl inset-y-7 right-2 flex items-center px-2 text-gray-500"
              >

                {showPassword ? (< FaEye />) : (<FaEyeSlash />)}
              </button>
            </div>

            {commonError && <p className="text-red-400 pl-2 text-xl font-medium">{commonError}</p>}

          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className=""></div>
            <Link to="/login/forgotPassword">
              {" "}
              <button
                type="button"
                onClick={props.togglePasswordFn}
                className="font-medium text-base text-secondary-blue hover:scale-[1.02]"
              >
                Forgot password?
              </button>
            </Link>
          </div>
          <div className="mt-4 gap-y-4 flex justify-center items-center">
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-secondary-blue text-white text-lg font-bold w-11/12 h-11"
              >
                Sign in
              </button>
            )}

          </div>
        </form>

        <div className="mt-4 gap-y-4 flex justify-center items-center">
          <div onClick={() => Glogin()}>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="mr-2">Sign in with Google</span>

              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" /><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
            </a>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <Link to='/user/signup' replace>
            <button
              onClick={handleSignupClick}
              className="text-secondary-blue text-base font-medium ml-2 hover:scale-[1.02]"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
