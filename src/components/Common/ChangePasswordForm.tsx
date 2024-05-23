import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useComChangePasswordMutation } from '@/redux/slices/userApiSlice';
import { Loader } from '@/components/Common/BootstrapElems';
import toast from 'react-hot-toast';



const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function ChangePasswordForm() {

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  const [changePassword, { isLoading }] = useComChangePasswordMutation();

  const [showPassword, setShowPassword] = useState(true);
  const [showConfPassword, setShowConfPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };
  const changePassTriggerFn = async (values) => {
    const formData = {
      email,
      password: values.password
    }
    const changedPasswordRes = await changePassword(formData).unwrap()
    if (changedPasswordRes.success) {
      toast('Password changed successfully, try login')
      navigate('/login', { replace: true })
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          changePassTriggerFn(values)
        }}
      >
        {({ isSubmitting }) => (
          <div className="h-screen w-screen">
            <Form className='h-screen'>
              <div className="bg--300 h-1/4 flex justify-center items-end">
                <div className="">
                  <h1 className='text-4xl font-medium text-gray-500'>Create new password</h1>
                </div>
              </div>
              <div className="h-1/4 flex justify-center items-end">
                <div className="h-16 md:w-3/5 w-11/12">
                  <div className="relative">
                    <p className='mb-2'>Enter new password</p>
                    <Field className='rounded-xl border-gray-900 w-full mb-1' type={showPassword ? "password" : "text"} name="password" id="password" placeholder="Enter your password" />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute text-2xl inset-y-14  right-4 flex items-center text-gray-500"
                    >

                      {showPassword ? (< FaEye />) : (<FaEyeSlash />)}
                    </button>
                  </div>
                  <ErrorMessage name='password' component="div" className='text-red-600 ml-3' />

                </div>
              </div>
              <div className="h-1/4 flex justify-center items-center">
                <div className="h-16 md:w-3/5 w-11/12">
                  <div className="relative">
                    <p className='mb-2'>Confirm password</p>
                    <Field
                      type={showConfPassword ? "password" : "text"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      className='rounded-xl border-gray-900 w-full mb-1'
                    />
                    <button
                      type="button"
                      onClick={toggleConfPasswordVisibility}
                      className="absolute text-2xl inset-y-14 right-4 flex items-center text-gray-500"
                    >

                      {showConfPassword ? (< FaEye />) : (<FaEyeSlash />)}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className='text-red-600 ml-3' />
                </div>
              </div>
              <div className="bg--600 h-1/4 flex justify-center items-start">
                {isLoading ? <Loader /> : (<button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-provider hover:bg-secondary-provider text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-2/3 md:w-1/3 rounded-lg"
                >
                  Submit
                </button>)}

              </div>

            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default ChangePasswordForm