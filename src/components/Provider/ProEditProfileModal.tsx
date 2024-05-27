import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ProEditProfileModal({ isOpen }) {
  const providerDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '123-456-7890'
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    mobile: Yup.string().required('Phone number is required')
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center ml-24 items-center">
      <div className="bg-white rounded-lg p-8 modal-box max-w-5xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit profile details</h2>
        <Formik
          initialValues={{
            name: providerDetails.name,
            email: providerDetails.email,
            password: '',
            mobile: providerDetails.mobile
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="name">Name:</label>
                <Field className="block text-gray-900" type="text" name="name" />
              </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />

              <div className="flex flex-col sm:flex-row items-center  space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="email">Email:</label>
                <Field className="block text-gray-900" type="email" name="email" />
              </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="password">Password:</label>
                <Field className="block text-gray-900" type="password" name="password" />
              </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="mobile">Phone Number:</label>
                <Field className="block text-gray-900" type="text" name="mobile" />
              </div>
                <ErrorMessage name="mobile" component="div" className="text-red-500 text-xs" />

              <div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProEditProfileModal