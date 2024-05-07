import React, { useState } from 'react'
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Loader } from '../../components/Common/BootstrapElems'
import axios from 'axios';

function ProvAddSlot() {

  const GeoApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const [showWaterServicePrice, setShowWaterServicePrice] = useState(false);
  const [showEVChargeFacilityPrice, setShowEVChargeFacilityPrice] = useState(false);
  const [showAirPressureCheckPrice, setShowAirPressureCheckPrice] = useState(false);

  // Search location
  // const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);


  const handleSearch = async (values) => {
    try {
      setLoading(true)
      console.log(values);

      if (values.buildingOrAreaName && values.street && values.pinNumber && values.city && values.state && values.country) {
        const name = encodeURIComponent(values.buildingOrAreaName);
        const street = encodeURIComponent(values.street);
        const postcode = encodeURIComponent(values.pinNumber);
        const city = encodeURIComponent(values.city);
        const state = encodeURIComponent(values.state);
        const country = encodeURIComponent(values.country);
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?name=${name}&street=${street}&postcode=${postcode}&city=${city}&state=${state}&country=${country}&lang=en&limit=5&type=city&format=json&apiKey=${GeoApiKey}`)
        console.log(response.data);
        setSearchResult(response.data.results)

      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="app">

            <h1 className='text-2xl m-8 mt-3'>Add your parking lot details and verify</h1>

            <Formik
              initialValues={{
                Pname: "",
                Pnumber: "",
                waterService: false,
                waterServicePrice: '',
                evChargeFacility: false,
                evChargeFacilityPrice: '',
                airPressureCheck: false,
                airPressureCheckPrice: '',
                oneHourParkingAmount: '',
                buildingOrAreaName: '',
                street: '',
                city: '',
                state: '',
                landmark: '',
                country: '',
                pinNumber: '',
                parkingRule: '',
                // location: ''

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
                  .max(200, "Cannot be greater than Rs.200")
                  .required('Amount is required'),
                buildingOrAreaName: Yup.string()
                  .required("Building or area name is required"),
                street: Yup.string()
                  .required("Street is required"),
                city: Yup.string()
                  .required("City is required"),
                state: Yup.string()
                  .required("State is required"),
                landmark: Yup.string(),
                country: Yup.string()
                  .required("Country is required"),
                pinNumber: Yup.string()
                  .required('Pin number is required')
                  .matches(/^\d{6}$/, 'Pin number must be 6 digits'),
                parkingRule: Yup.string()
                  .required("Parking rule is required"),
                waterServicePrice: Yup.string().test('waterServicePrice', 'Water service price is required', function (value) {
                  const waterServiceEnabled = this.parent.waterService;
                  if (waterServiceEnabled) {
                    return !!value;
                  }
                  return true;
                }),
                evChargeFacilityPrice: Yup.string().test('evChargeFacilityPrice', 'EV charge facility price is required', function (value) {
                  const evChargeFacilityEnabled = this.parent.evChargeFacility;
                  if (evChargeFacilityEnabled) {
                    return !!value;
                  }
                  return true;
                }),
                airPressureCheckPrice: Yup.string().test('airPressureCheckPrice', 'Air pressure check price is required', function (value) {
                  const airPressureCheckEnabled = this.parent.airPressureCheck;
                  if (airPressureCheckEnabled) {
                    return !!value;
                  }
                  return true;
                }),


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
                    <label htmlFor="Pnumber" className="block font-bold mb-2 mt-5 ">
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
                      <label className='cursor-pointer text-sm md:text-base'>
                        <Field
                          type="checkbox"
                          name="waterService"
                          checked={values.waterService}
                          className='w-6 h-6 text-primary-provider border-2 border-black rounded cursor-pointer focus:outline-none mr-3'
                          onChange={e => {
                            handleChange(e);
                            setShowWaterServicePrice(e.target.checked);
                          }}
                        />
                        Water Service
                      </label>
                      <label className='cursor-pointer text-sm md:text-base'>
                        <Field
                          type="checkbox"
                          name="evChargeFacility"
                          checked={values.evChargeFacility}
                          className='w-6 h-6 text-primary-provider border-2 border-black rounded cursor-pointer focus:outline-none mr-3'
                          onChange={e => {
                            handleChange(e);
                            setShowEVChargeFacilityPrice(e.target.checked);
                          }}
                        />
                        EV Charge
                      </label>
                      <label className='cursor-pointer text-sm md:text-base'>
                        <Field
                          type="checkbox"
                          name="airPressureCheck"
                          className='w-6 h-6 text-primary-provider border-2 border-black rounded cursor-pointer focus:outline-none mr-3'
                          checked={values.airPressureCheck}
                          onChange={e => {
                            handleChange(e);
                            setShowAirPressureCheckPrice(e.target.checked);
                          }}
                        />
                        Air Filling
                      </label>
                    </div>
                    {/* Additional fields for service prices */}
                    {showWaterServicePrice && (
                      <div className="mt-4">
                        <label htmlFor="waterServicePrice" className="block font-bold my-2">
                          Water Service Price
                        </label>
                        <Field
                          type="text"
                          id="waterServicePrice"
                          name="waterServicePrice"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                        />
                        {errors.waterServicePrice && touched.waterServicePrice && (
                          <div className="text-red-500 text-sm mt-1">{errors.waterServicePrice}</div>
                        )}                      </div>
                    )}
                    {showEVChargeFacilityPrice && (
                      <div className="mt-4">
                        <label htmlFor="evChargeFacilityPrice" className="block font-bold my-2">
                          EV Charge Facility Price
                        </label>
                        <Field
                          type="text"
                          id="evChargeFacilityPrice"
                          name="evChargeFacilityPrice"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                        />
                        {errors.evChargeFacilityPrice && touched.evChargeFacilityPrice && (
                          <div className="text-red-500 text-sm mt-1">{errors.evChargeFacilityPrice}</div>
                        )}                        </div>
                    )}
                    {showAirPressureCheckPrice && (
                      <div className="mt-4">
                        <label htmlFor="airPressureCheckPrice" className="block font-bold my-2">
                          Air Pressure Checking and Filling Price
                        </label>
                        <Field
                          type="text"
                          id="airPressureCheckPrice"
                          name="airPressureCheckPrice"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                        />
                        {errors.airPressureCheckPrice && touched.airPressureCheckPrice && (
                          <div className="text-red-500 text-sm mt-1">{errors.airPressureCheckPrice}</div>
                        )}                        </div>
                    )}

                    {/* Hourly charge for parkionig spot */}
                    <div className='mt-6 w-1/2'>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><label htmlFor="oneHourParkingAmount" className="block font-bold my-2">
                            Amount for parking per hour                      </label></TooltipTrigger>
                          <TooltipContent>
                            <p>In rupees</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

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
                    <div className="mt-6 w-1/2 mr-5">
                      <label htmlFor="buildingOrAreaName" className="block font-bold my-2">
                        Building name or area name
                      </label>
                      <Field
                        type="text"
                        id="buildingOrAreaName"
                        name="buildingOrAreaName"
                        // onChange={(e) => setName(e.target.value)}
                        // value={name}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.buildingOrAreaName && touched.buildingOrAreaName ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.street && touched.buildingOrAreaName && (
                        <div className="text-red-500 text-sm mt-1">{errors.buildingOrAreaName}</div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      {/* Street */}
                      <div className="mt-6 w-1/2 mr-5">
                        <label htmlFor="street" className="block font-bold my-2">
                          Street
                        </label>
                        <Field
                          type="text"
                          id="street"
                          name="street"
                          // onChange={(e) => setStreet(e.target.value)}
                          // value={street}
                          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.street && touched.street ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.street && touched.street && (
                          <div className="text-red-500 text-sm mt-1">{errors.street}</div>
                        )}
                      </div>

                      {/* City */}
                      <div className="mt-6 w-1/2">
                        <label htmlFor="city" className="block font-bold my-2">
                          City
                        </label>
                        <Field
                          type="text"
                          id="city"
                          name="city"
                          // onChange={(e) => setCity(e.target.value)}
                          // value={city}
                          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.city && touched.city ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.city && touched.city && (
                          <div className="text-red-500 text-sm mt-1">{errors.city}</div>
                        )}          </div>

                    </div>

                    <div className="flex justify-between">
                      {/* State */}
                      <div className="mt-6 w-1/2 mr-5">
                        <label htmlFor="state" className="block font-bold my-2">
                          State
                        </label>
                        <Field
                          type="text"
                          id="state"
                          name="state"
                          // onChange={(e) => setState(e.target.value)}
                          // value={state}
                          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.state && touched.state ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.state && touched.state && (
                          <div className="text-red-500 text-sm mt-1">{errors.state}</div>
                        )}                    </div>

                      {/* Landmark */}
                      <div className="mt-6 w-1/2">
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

                    </div>

                    <div className="flex justify-between">
                      {/* Country */}
                      <div className="mt-6 w-1/2 mr-5">
                        <label htmlFor="country" className="block font-bold my-2">
                          Country
                        </label>
                        <Field
                          type="text"
                          id="country"
                          name="country"
                          // onChange={(e) => setCountry(e.target.value)}
                          // value={country}
                          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.country && touched.country ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.country && touched.country && (
                          <div className="text-red-500 text-sm mt-1">{errors.country}</div>
                        )}                     </div>

                      {/* Pin Number */}
                      <div className="mt-6 w-1/2">
                        <label htmlFor="pinNumber" className="block font-bold my-2">
                          Pin Number
                        </label>
                        <Field
                          type="text"
                          id="pinNumber"
                          name="pinNumber"
                          // onChange={(e) => setPostcode(e.target.value)}
                          // value={postcode}
                          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.pinNumber && touched.pinNumber ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.pinNumber && touched.pinNumber && (
                          <div className="text-red-500 text-sm mt-1">{errors.pinNumber}</div>
                        )}
                      </div>
                    </div>

                    {/* parkingRule */}
                    <div className="mt-6">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <label htmlFor="parkingRule" className="block font-bold my-2">
                            Parking rule
                          </label></TooltipTrigger>
                          <TooltipContent>
                            Add a parking rule which has to be noted
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Field
                        type="text"
                        id="parkingRule"
                        name="parkingRule"
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.parkingRule && touched.parkingRule ? 'border-red-500' : ''
                          }`}
                      />
                      {errors.parkingRule && touched.parkingRule && (
                        <div className="text-red-500 text-sm mt-1">{errors.parkingRule}</div>
                      )}
                    </div>

                    <div className="mt-6">
                      {searchResult.length ? (<Field as="select" name="location" id="location">
                        <option value="">Select a location</option>
                        {searchResult.map((searchResult,index) => (
                          <option key={index} value={searchResult.county}>
                            {searchResult.county}
                          </option>
                        ))}
                      </Field>) : (
                        <div className="flex justify-center items-center m-16">
                          <p className='text-xl font-normal text-red-600'>Enter a valid address to get location</p>
                          {isLoading ? <div className="p-3 ml-3"> <Loader /></div> : <p onClick={() => handleSearch(values)} className='p-3 ml-3 bg-secondary-provider rounded-xl cursor-pointer hover:bg-primary-provider text-white'>Verify address</p>}
                        </div>
                      )}
                    </div>


                    <button
                      type="button"
                      className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-md mr-2 hover:bg-blue-500 hover:text-white my-6 cursor-pointer"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="bg-primary-provider text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </form>
                );
              }}
            </Formik>

          </div>

        </div>
      </div>


    </>
  )
}

export default ProvAddSlot