import * as React from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../../slices/userApiSlice";
import { useProviderLoginMutation } from "../../slices/providerSlice";
import { setCredentials } from "../../slices/authSlice";
import { setProviderCredentials } from "../../slices/authSlice";
import { toast } from "../../script/toast";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Loader } from '../Common/BootstrapElems'
import { Button } from "../ui/button";


export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('')
  const [commonError, setCommonError] = useState('')
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [providerLogin, { isLoading: providerLoginLoading }] = useProviderLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
        if (role === 'user') {
          const res = await login(formData).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } else {
          const res = await providerLogin(formData).unwrap();
          dispatch(setProviderCredentials({ ...res }));
          navigate("/provider");
        }

      }
    } catch (err) {
      setCommonError('Incorrect username or password')
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
            <label className="text-lg font-medium tracking-wide">
              Select Role:
            </label>
            <select
              className="w-full border-2 border-gray-300 rounded-xl pl-3 mt-1 bg-transparent h-12"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="provider">Provider</option>
            </select>

          </div>
          <div className="mt-2 h-24">
            <label className="text-lg font-medium tracking-wide">
              Password
            </label>
            {/* <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 border-l flex items-center"
            >
            </button> */}
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
                className="absolute text-2xl inset-y-7 right-2 flex items-center px-2 "
              >

                {showPassword ? (< FaEye />) : (<FaEyeSlash />)}
              </button>
            </div>

            {commonError && <p className="text-red-400 pl-2">{commonError}</p>}

          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className=""></div>
            <Link to="/user/forgotPassword">
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
            {loginLoading || providerLoginLoading ? (
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
          <button className="flex justify-center items-center p-3 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 border-2 border-blue-300 rounded-xl h-11 w-11/12">
            <FaGoogle /> Sign in with Google
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <Link to='/user/signup'>
            <button
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
