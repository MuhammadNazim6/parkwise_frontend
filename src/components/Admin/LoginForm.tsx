import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAdminLoginMutation } from "../../redux/slices/adminSlice";
import { setAdminCredentials } from "../../redux/slices/authSlice";
import { toast } from "../../script/toast";
import { RootState } from "@/redux/store";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state:RootState) => state.auth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const emailRegex = /^\S+@\S+\.\S+$/;
      const passwordRegex =
        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
      if (!email || !password) {
        toast("error", "All fields should be filled");
      } else if (!email.match(emailRegex)) {
        toast("error", "Invalid username or password");
      } else if (!password.match(passwordRegex)) {
        toast("error", "Incorrect username or password");
      } else {
        const formData = {
          email,
          password,
        };
        const res = await login(formData).unwrap();
        dispatch(setAdminCredentials({ ...res.data }));
        localStorage.setItem('token',res.token)
        toast("success", res.message);
        navigate("/");
      }
    } catch (err) {
      toast("error", "Incorrect username or password");
    }
  };

  return (
    <div className="bg-white p-10 lg:border-0">
      <h1 className="text-4xl font-semibold ">Welcome back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4 tracking-wide">
        Please enter your details.
      </p>
      <div className="mt-8 ">
        <form onSubmit={submitHandler}>
          <div className="">
            <label className="text-lg font-medium tracking-wide">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label className="text-lg font-medium tracking-wide">
              Password
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-10 gap-y-4 flex justify-center items-center">
            <button
              type="submit"
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-secondary-admin text-white text-lg font-bold w-11/12 h-11"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
