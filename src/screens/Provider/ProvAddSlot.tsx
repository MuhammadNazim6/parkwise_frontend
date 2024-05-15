import React, { useState } from 'react'
import { Formik, Field, FieldArray } from "formik";
import ProGetAddressLatLong from '@/components/Provider/ProGetAddressLatLong';
import * as Yup from "yup";
import { FcInfo } from "react-icons/fc";
import { useToast } from "@/components/ui/use-toast"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useSendParkingLotForApprovalMutation } from '@/redux/slices/providerSlice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Loader } from '../../components/Common/BootstrapElems'
import axios from 'axios';

function ProvAddSlot() {
  const [showWaterServicePrice, setShowWaterServicePrice] = useState(false);
  const [showEVChargeFacilityPrice, setShowEVChargeFacilityPrice] = useState(false);
  const [showAirPressureCheckPrice, setShowAirPressureCheckPrice] = useState(false);
  const [provAddedAddressLocation, setProvAddedAddressLocation] = useState(null)
  const [isVerified, setIsVerified] = useState(true)
  // Clciked from the child
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  // Search location
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [addSlot] = useSendParkingLotForApprovalMutation();
  const { toast } = useToast()
  const GeoApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const { providerInfo } = useSelector((state: RootState) => state.auth);

  console.log(providerInfo.approvalStatus);


  const handleCoordinatesClick = (coordinates) => {
    setClickedCoordinates(coordinates);
  };

  // For checking if both coordinates , selected and address coordinate are in a close range
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


  const handleSearch = async (values) => {
    try {
      setLoading(true)
      if (values.buildingOrAreaName && values.street && values.pinNumber && values.city && values.state && values.country) {
        const name = encodeURIComponent(values.buildingOrAreaName);
        const street = encodeURIComponent(values.street);
        const postcode = encodeURIComponent(values.pinNumber);
        const city = encodeURIComponent(values.city);
        const state = encodeURIComponent(values.state);
        const country = encodeURIComponent(values.country);
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?name=${name}&street=${street}&postcode=${postcode}&city=${city}&state=${state}&country=${country}&lang=en&limit=5&type=city&format=json&apiKey=${GeoApiKey}`)

        if (response.data.results) {
          let lng = response.data.results[0].lon
          let lat = response.data.results[0].lat
          setProvAddedAddressLocation({ lng, lat })
        } else {
          toast({
            variant: "destructive",
            title: "Enter a valid address to proceed",
            description: "There was a problem with your request.",
          })
        }
        setLoading(false)
      } else {
        toast({
          variant: "destructive",
          title: "Enter all address fields",
          description: "There was a problem with your request.",
        })
        return
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
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <div className="app">

            {/* Message saying the request has been sent and wait for approval */}
            {providerInfo.approvalStatus === 'pending' && (
              <div className='h-screen'>
                <div className="bg-blue-400 shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg ">Approval request pending</div>
                  </div>
                  <div className="text-gray-900 mt-2 text-md">Your request for the parking lot approval has been sent. Kindly wait for approval.</div>
                </div>
              </div>
            )}

            {/* Message saying the request have been rejected try again  */}
            {providerInfo.approvalStatus === "rejected" && (
              <div className=''>
                <div className="bg-red-400 shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">Approval request rejected</div>
                  </div>
                  <div className="text-gray-900 mt-2 text-md">Your request for the parking lot approval has been rejected by the Admin. Try again!</div>
                </div>
              </div>
            )}

            {providerInfo.approvalStatus === "true" && (
              <div className='h-screen'>
                <div className="bg-green-400 shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">Approval request accepted</div>
                  </div>
                  <div className="text-gray-900 mt-2 text-md">Your request for the parking lot approval has been accepted by the Admin</div>
                </div>
              </div>
            )}

            {(providerInfo.approvalStatus === 'false' || providerInfo.approvalStatus === 'rejected') && (
              <>
                <h1 className='text-md m-7 text-center font-medium text-gray-600 md:text-xl md:font-semibold mt-10'>Add your parking lot details and verify</h1>

                <Formik
                  initialValues={{
                    parkingName: '',
                    parkingCount: '',
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
                    latitude: '',
                    longitude: '',
                    startEndTime: '',
                    email: ''

                  }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 0));
                    if (!provAddedAddressLocation) {
                      toast({
                        variant: "destructive",
                        title: "Verify your address to proceed",
                        description: "Enter a valid address and verify the same",
                      })
                      return
                    }
                    if (!clickedCoordinates) {
                      toast({
                        variant: "destructive",
                        title: "Select accurate location in the map",
                        description: "Verify address and choose exact location from the map.",
                      })
                      return
                    }

                    console.log(clickedCoordinates);
                    const distance = calculateDistance(provAddedAddressLocation.lat, provAddedAddressLocation.lng, clickedCoordinates.Lat, clickedCoordinates.Lng)
                    if (distance > 3) {
                      toast({
                        variant: "destructive",
                        title: "Address Accuracy Problem",
                        description: "The chosen location doesn't correspond closely to the entered address. Please review and correct the discrepancy.",
                      })
                      return
                    }
                    // injecting lat,long,email
                    values.latitude = clickedCoordinates.Lat
                    values.longitude = clickedCoordinates.Lng
                    values.email = providerInfo.email
                    const sendForApproval = await addSlot(values).unwrap();
                    if (sendForApproval.success) {
                      toast({
                        title: "Your slot have been sent for verification",
                        description: "",
                      })
                    } else {
                      toast({
                        title: sendForApproval.message,
                        description: "",
                      })
                    }

                    console.log(values);

                    // alert(JSON.stringify(values, null, 2));
                  }}

                  validationSchema={Yup.object().shape({
                    parkingName: Yup.string()
                      .min(5, "Must be 5 characters or more")
                      .required("Name is required"),
                    parkingCount: Yup.number()
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
                    startEndTime: Yup.string().required('Select an availability time')
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

                      <form onSubmit={handleSubmit} className="bg-gray-300 p-6 rounded-lg shadow-md">
                        {/* Parking lot name */}
                        <label htmlFor="parkingName" className="block font-bold mb-2 text-sm ">
                          Parking lot name
                        </label>
                        <input
                          id="parkingName"
                          placeholder="Enter your parking lot name"
                          type="text"
                          value={values.parkingName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-2 rounded-md border-2 text-sm h-8 ${errors.parkingName && touched.parkingName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                            }`}
                        />
                        {errors.parkingName && touched.parkingName && (
                          <div className="text-red-500 text-sm mt-1">{errors.parkingName}</div>
                        )}

                        {/* Count of parking slots */}
                        <label htmlFor="parkingCount" className="block font-bold mb-2 mt-5 text-sm">
                          Number of parking slots
                        </label>
                        <input
                          id="parkingCount"
                          placeholder="Enter number of available parking slots"
                          type="number"
                          value={values.parkingCount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-2 rounded-md border-2 text-sm  h-8 ${errors.parkingCount && touched.parkingCount
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                            }`}
                        />
                        {errors.parkingCount && touched.parkingCount && (
                          <div className="text-red-500 text-sm mt-1">{errors.parkingCount}</div>
                        )}

                        {/* Choose the services provided */}
                        <div className="flex justify-evenly mt-7">

                          <label className='cursor-pointer text-sm md:text-base w-1/3 md:flex'>
                            <div className="">
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
                            </div>
                            <p className="w-2/3  mt-2 md:mt-0">
                              Water Service
                            </p>
                          </label>

                          <label className='cursor-pointer text-sm md:text-base w-1/3 md:flex'>
                            <div className="">
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
                            </div>
                            <div className="w-2/3 mt-2 md:mt-0">
                              EV Charge
                            </div>
                          </label>

                          <label className='cursor-pointer text-sm md:text-base w-1/3 md:flex'>
                            <div className="">
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
                            </div>
                            <p className='w-2/3  mt-2 md:mt-0'>
                              Air Filling
                            </p>
                          </label>
                        </div>

                        {/* Additional fields for service prices */}
                        {showWaterServicePrice && (
                          <div className="mt-4">
                            <label htmlFor="waterServicePrice" className="block font-bold my-2 text-sm">
                              Water Service Price
                            </label>
                            <Field
                              type="text"
                              id="waterServicePrice"
                              name="waterServicePrice"
                              className=" h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                            />
                            {errors.waterServicePrice && touched.waterServicePrice && (
                              <div className="text-red-500 text-sm mt-1">{errors.waterServicePrice}</div>
                            )}                      </div>
                        )}
                        {showEVChargeFacilityPrice && (
                          <div className="mt-4">
                            <label htmlFor="evChargeFacilityPrice" className="block font-bold my-2 text-sm">
                              EV Charge Facility Price
                            </label>
                            <Field
                              type="text"
                              id="evChargeFacilityPrice"
                              name="evChargeFacilityPrice"
                              className="text-sm h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                            />
                            {errors.evChargeFacilityPrice && touched.evChargeFacilityPrice && (
                              <div className="text-red-500 text-sm mt-1">{errors.evChargeFacilityPrice}</div>
                            )}                        </div>
                        )}
                        {showAirPressureCheckPrice && (
                          <div className="mt-4">
                            <label htmlFor="airPressureCheckPrice" className="block font-bold my-2 text-sm">
                              Air Pressure Checking and Filling Price
                            </label>
                            <Field
                              type="text"
                              id="airPressureCheckPrice"
                              name="airPressureCheckPrice"
                              className="text-sm h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                            />
                            {errors.airPressureCheckPrice && touched.airPressureCheckPrice && (
                              <div className="text-red-500 text-sm mt-1">{errors.airPressureCheckPrice}</div>
                            )}                        </div>
                        )}

                        {/* Hourly charge for parkionig spot */}
                        <div className="flex">
                          <div className='mt-6 md:w-1/2'>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger><label htmlFor="oneHourParkingAmount" className="block font-bold my-2 text-sm">
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
                              className="h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                            />
                            {errors.oneHourParkingAmount && touched.oneHourParkingAmount && (
                              <div className="text-red-500 text-sm mt-1">{errors.oneHourParkingAmount}</div>
                            )}
                          </div>
                          <div className="mt-6 md:w-1/2 ml-5">
                            <label htmlFor="airPressureCheckPrice" className="block font-bold my-2 text-sm">
                              Choose time range
                            </label>
                            <Field as="select" name="startEndTime" className='h-9 mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider'>
                              <option value="">Select time</option>
                              <option value="HALF">06:00 to 20:00</option>
                              <option value="FULL">24/7 </option>
                            </Field>
                            {errors.startEndTime && touched.startEndTime && (
                              <div className="text-red-500 text-sm mt-1">{errors.startEndTime}</div>
                            )}
                          </div>
                        </div>

                        {/* Address */}
                        <div className="mt-6 md:w-1/2 md:mr-5">
                          <label htmlFor="buildingOrAreaName" className="block font-bold my-2 text-sm">
                            Building name or area name
                          </label>
                          <Field
                            type="text"
                            id="buildingOrAreaName"
                            name="buildingOrAreaName"
                            className={`h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.buildingOrAreaName && touched.buildingOrAreaName ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.street && touched.buildingOrAreaName && (
                            <div className="text-red-500 text-sm mt-1">{errors.buildingOrAreaName}</div>
                          )}
                        </div>

                        <div className="flex justify-between">
                          {/* Street */}
                          <div className="mt-6 w-1/2 mr-5">
                            <label htmlFor="street" className="block font-bold my-2 text-sm">
                              Street
                            </label>
                            <Field
                              type="text"
                              id="street"
                              name="street"
                              className={`h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.street && touched.street ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.street && touched.street && (
                              <div className="text-red-500 text-sm mt-1">{errors.street}</div>
                            )}
                          </div>

                          {/* City */}
                          <div className="mt-6 w-1/2">
                            <label htmlFor="city" className="block font-bold my-2 text-sm">
                              City
                            </label>
                            <Field
                              type="text"
                              id="city"
                              name="city"
                              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider h-8 ${errors.city && touched.city ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.city && touched.city && (
                              <div className="text-red-500 text-sm mt-1">{errors.city}</div>
                            )}          </div>

                        </div>

                        <div className="flex justify-between">
                          {/* State */}
                          <div className="mt-6 w-1/2 mr-5">
                            <label htmlFor="state" className="block font-bold my-2 text-sm">
                              State
                            </label>
                            <Field
                              type="text"
                              id="state"
                              name="state"
                              className={`h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.state && touched.state ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.state && touched.state && (
                              <div className="text-red-500 text-sm mt-1">{errors.state}</div>
                            )}                    </div>

                          {/* Landmark */}
                          <div className="mt-6 w-1/2">
                            <label htmlFor="landmark" className="block font-bold my-2 text-sm">
                              Landmark
                            </label>
                            <Field
                              type="text"
                              id="landmark"
                              name="landmark"
                              className="h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider"
                            />
                            {errors.landmark && touched.landmark && (
                              <div className="text-red-500 text-sm mt-1">{errors.landmark}</div>
                            )}                    </div>

                        </div>

                        <div className="flex justify-between">
                          {/* Country */}
                          <div className="mt-6 w-1/2 mr-5">
                            <label htmlFor="country" className="block font-bold my-2 text-sm">
                              Country
                            </label>
                            <Field
                              type="text"
                              id="country"
                              name="country"
                              className={`h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.country && touched.country ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.country && touched.country && (
                              <div className="text-red-500 text-sm mt-1">{errors.country}</div>
                            )}                     </div>

                          {/* Pin Number */}
                          <div className="mt-6 w-1/2">
                            <label htmlFor="pinNumber" className="block font-bold my-2 text-sm">
                              Pin Number
                            </label>
                            <Field
                              type="text"
                              id="pinNumber"
                              name="pinNumber"
                              className={`h-8 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary-provider focus:border-primary-provider ${errors.pinNumber && touched.pinNumber ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.pinNumber && touched.pinNumber && (
                              <div className="text-red-500 text-sm mt-1">{errors.pinNumber}</div>
                            )}
                          </div>
                        </div>

                        <div className="md:flex md:justify-center md:mt-12 w-full">
                          <ProGetAddressLatLong provLocation={provAddedAddressLocation} onCoordinatesClick={handleCoordinatesClick} />
                        </div>
                        <div className="flex justify-around  mt-3 mr-3">
                          <Popover>
                            <PopoverTrigger className='flex w-14 justify-between text-xl'>Info <FcInfo className='mt-1' />
                            </PopoverTrigger>
                            <PopoverContent>
                              <p className='m-1'>* Add a valid address in the form</p>
                              <p className='m-1'>* Verify the address</p>
                              <p className='m-1'>* Choose exact location from the given map.</p>
                            </PopoverContent>
                          </Popover>
                          {/* Verify address button */}
                          {isLoading ? <div className="p-3 ml-3"> <Loader /></div> :
                            <button type='button' onClick={() => handleSearch(values)} className='p-2 bg-white rounded-sm cursor-pointer hover:bg-gray-100 ease-in-out text-black text-sm'>Verify address</button>
                          }
                        </div>

                        <div className="h-32">
                          <div className="justify-center flex mt-5">
                            <button
                              type="button"
                              className="bg-white text-black border border-black px-4 py-2 rounded-sm m-2 hover:bg-black hover:text-white my-6 cursor-pointer"
                              onClick={handleReset}
                              disabled={!dirty || isSubmitting}
                            >
                              Reset
                            </button>
                            {isVerified ? (<button
                              type="submit"
                              className="bg-black text-white px-4 m-6 rounded-sm hover:bg-primary-provider"
                              disabled={isSubmitting}
                            >
                              Submit
                            </button>) : null}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>


              </>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default ProvAddSlot