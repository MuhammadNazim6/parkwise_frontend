import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

function ForgotPassForm(props) {
  const [email, setEmail] = useState('');
  return (
    <div className='bg-white p-10 lg:border-0 border-2 border-gray-200'>
      <h1 className='text-4xl font-semibold '>Forgot password?</h1>
      <p className='font-medium text-lg text-gray-500 mt-4 tracking-wide'>Dont worry we can help.</p>
      <div className='mt-8 '>
      <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form submitted:', values);
        setSubmitting(false);
        
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="h-32">
            <label htmlFor="email" className='text-lg font-medium tracking-wide mt-5'>Enter your email</label>
            <Field
              type="email"
              name="email"
              id="email"
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Enter your email'
            />
            <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
          </div>
        <div className="mt-8 flex justify-between items-center">
          <div className="">
          </div>
          <Link to='/login'><button className='font-medium text-base text-secondary-blue hover:scale-[1.02]'>Back to login</button></Link>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button type="submit" disabled={isSubmitting} className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-4 rounded-xl bg-secondary-provider text-white text-lg font-bold w-96'>Send otp</button>
        </div>
        </Form>
      )}
    </Formik>

      </div>
    </div>
  )
}

export default ForgotPassForm
        {/* <div className="">
          <label className='text-lg font-medium tracking-wide' >OTP</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your password' type="password" />
        </div> */}