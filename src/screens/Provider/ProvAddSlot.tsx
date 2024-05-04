import React from 'react'
import ProvNavbar from '@/components/Provider/ProvNavbar'
import Sidebar from '@/components/Provider/Sidebar'
import { render } from "react-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

function ProvAddSlot() {

  
  return (
    <>
      <ProvNavbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="app">


            <Formik
              initialValues={{
                Pname: "",
                Pnumber: "",
                waterService: false,
                evChargeFacility: false,
                airPressureCheck: false,
                oneHourParkingAmount: '',
                street: '',
                city: '',
                state: '',
                landmark: '',
                country: '',
                pinNumber: ''

              }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
              }}
              validationSchema={Yup.object().shape({
                Pname: Yup.string()
                  .min(5, "Must be 5 characters or more")
                  .required("Name is required"),
                Pnumber: Yup.number()
                  .min(3, 'Count must be greater than 3')
                  .max(50, 'Count must be less than 50')
                  .required('Count is required'),
                oneHourParkingAmount: Yup.number()
                  .min(40, "Should be equal or greater than Rs.40")
                  .max(200, "Cannot be greater than Rs.200"),
                street: Yup.string()
                  .required("Street is required"),
                city: Yup.string()
                  .required("City is required"),
                state: Yup.string()
                  .required("State is required"),
                landmark: Yup.string(),
                country: Yup.string()
                  .required("Country is required"),
                pinNumber: Yup.number()
                  .required("Pin number is required")
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                    {/* Parking lot name */}
                    <label htmlFor="Pname" className="block font-bold mb-2">
                      Parking lot name
                    </label>
                    <input
                      id="Pname"
                      placeholder="Enter your parking lot name"
                      type="text"
                      value={values.Pname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 rounded-md border-2 ${errors.Pname && touched.Pname
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                        }`}
                    />
                    {errors.Pname && touched.Pname && (
                      <div className="text-red-500 text-sm mt-1">{errors.Pname}</div>
                    )}

                    {/* Number of parking slots */}
                    <label htmlFor="Pnumber" className="block font-bold my-2">
                      Number of parking slots
                    </label>
                    <input
                      id="Pnumber"
                      placeholder="Enter number of available parking slots"
                      type="number"
                      value={values.Pnumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 rounded-md border-2 ${errors.Pnumber && touched.Pnumber
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                        }`}
                    />
                    {errors.Pnumber && touched.Pnumber && (
                      <div className="text-red-500 text-sm mt-1">{errors.Pnumber}</div>
                    )}

                    {/* Choose the services provided */}
                    <div className="flex justify-evenly mt-7">
                      <label className=''>
                        <Field
                          type="checkbox"
                          name="waterService"
                          checked={values.waterService}
                          onChange={handleChange}
                          className='w-6 h-6 text-primary-provider border-2 border-black rounded cursor-pointer focus:outline-none mr-3'

                        />
                        Water Service
                      </label>
                      <br />
                      <label>
                        <Field
                          type="checkbox"
                          name="evChargeFacility"
                          checked={values.evChargeFacility}
                          onChange={handleChange}
                          className='w-6 h-6 text-primary-provider border-2 border-black rounded cursor-pointer focus:outline-none mr-3'
                        />
                        EV Charge Facility
                      </label>
                      <br />
                      <label>
                        <Field
                          type="checkbox"
                          name="airPressureCheck"
                          checked={values.airPressureCheck}
                          onChange={handleChange}
                          className='w-6 h-6 text-primary-provider border-2 border-black rounded cursor-pointer focus:outline-none mr-3'
                        />
                        Air Pressure Checking and Filling
                      </label>
                    </div>

                    {/* Hourly charge for parkionig spot */}
                    <div className='mt-6'>
                      <label htmlFor="oneHourParkingAmount" className="block font-bold my-2">
                        Amount of One Hour Parking
                      </label>
                      <Field
                        type="number"
                        id="oneHourParkingAmount"
                        name="oneHourParkingAmount"
                        value={values.oneHourParkingAmount}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                      />
                      {errors.oneHourParkingAmount && touched.oneHourParkingAmount && (
                        <div className="text-red-500 text-sm mt-1">{errors.oneHourParkingAmount}</div>
                      )}
                    </div>

                    {/* Address */}

                    {/* Street */}
                    <div className="mt-6">
                      <label htmlFor="street" className="block font-bold my-2">
                        Street
                      </label>
                      <Field
                        type="text"
                        id="street"
                        name="street"
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.street && touched.street ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.street && touched.street && (
                        <div className="text-red-500 text-sm mt-1">{errors.street}</div>
                      )}
                    </div>

                    {/* City */}
                    <div className="mt-6">
                      <label htmlFor="city" className="block font-bold my-2">
                        City
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.city && touched.city ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.city && touched.city && (
                        <div className="text-red-500 text-sm mt-1">{errors.city}</div>
                      )}          </div>

                    {/* State */}
                    <div className="mt-6">
                      <label htmlFor="state" className="block font-bold my-2">
                        State
                      </label>
                      <Field
                        type="text"
                        id="state"
                        name="state"
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.state && touched.state ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.state && touched.state && (
                        <div className="text-red-500 text-sm mt-1">{errors.state}</div>
                      )}                    </div>

                    {/* Landmark */}
                    <div className="mt-6">
                      <label htmlFor="landmark" className="block font-bold my-2">
                        Landmark
                      </label>
                      <Field
                        type="text"
                        id="landmark"
                        name="landmark"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                      />
                      {errors.landmark && touched.landmark && (
                        <div className="text-red-500 text-sm mt-1">{errors.landmark}</div>
                      )}                    </div>


                    {/* Country */}
                    <div className="mt-6">
                      <label htmlFor="country" className="block font-bold my-2">
                        Country
                      </label>
                      <Field
                        type="text"
                        id="country"
                        name="country"
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.country && touched.country ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.country && touched.country && (
                        <div className="text-red-500 text-sm mt-1">{errors.country}</div>
                      )}                     </div>

                    {/* Pin Number */}
                    <div className="mt-6">
                      <label htmlFor="pinNumber" className="block font-bold my-2">
                        Pin Number
                      </label>
                      <Field
                        type="text"
                        id="pinNumber"
                        name="pinNumber"
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.pinNumber && touched.pinNumber ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.pinNumber && touched.pinNumber && (
                        <div className="text-red-500 text-sm mt-1">{errors.pinNumber}</div>
                      )}                     </div>

                    <button
                      type="button"
                      className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-md mr-2 hover:bg-blue-500 hover:text-white my-6"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </form>
                );
              }}
            </Formik>

          </div>


          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProvAddSlot