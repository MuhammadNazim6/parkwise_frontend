import React, { useEffect, useState } from 'react'
import { useGetProviderDetailsMutation } from '@/redux/slices/providerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from "@/components/ui/use-toast"
import { useUpdateParkingLotMutation } from '@/redux/slices/providerSlice';
import { motion } from "framer-motion"



function ProvParkingLot() {
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [providerDetails, setProviderDetails] = useState(null)
  const { toast } = useToast()

  const [isEditable, setIsEditable] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({ ...initialFormValues });
  const [changedImages, setChangedImages] = useState({});
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const [enabledService, setEnabledServices] = useState({
    air: false,
    water: false,
    ev: false
  })


  const [updateLot] = useUpdateParkingLotMutation()

  const handleEditClick = async () => {
    if (!isEditable) {
      setIsEditable(true);
    } else {
      if (formValues.availableSpace < providerDetails.availableSpace) {
        // check if it will be ok to change slot size or reduce it API CALL
        toast({
          variant: "destructive",
          title: 'Unable to save',
          description: 'Number of slots cannot be less than the current number of slots.'
        })
        return;
      }

      // check if it will be ok to change slot size or reduce it API CALL
      // if (!formValues.airPressureCheckPrice && providerDetails.airPressureCheckPrice) {
      //   toast({
      //     variant: "destructive",
      //     title: 'Unable to save',
      //     description: 'The air pressure checking cannot be removed now'
      //   })
      //   return
      // }
      // if (!formValues.evChargeFacilityPrice && providerDetails.evChargeFacilityPrice) {
      //   toast({
      //     variant: "destructive",
      //     title: 'Unable to save',
      //     description: 'The Ev charging facility cannot be removed now'
      //   })
      //   return
      // }
      // if (!formValues.waterServicePrice && providerDetails.waterServicePrice) {
      //   toast({
      //     variant: "destructive",
      //     title: 'Unable to save',
      //     description: 'The water service cannot be removed now'
      //   })
      //   return
      // }
      if (parseInt(formValues.pricePerHour) < 20) {
        toast({
          variant: "destructive",
          title: 'Unable to save',
          description: 'The hourly price cannot be below Rs 20'
        })
        return
      }
      console.log(formValues);
      const formData = new FormData();
      formData.append('availableSpace', formValues.availableSpace)
      formData.append('email', providerInfo.email)
      formData.append('pricePerHour', formValues.pricePerHour)
      formData.append('airPressureCheckPrice', formValues.airPressureCheckPrice)
      formData.append('evChargeFacilityPrice', formValues.evChargeFacilityPrice)
      formData.append('waterServicePrice', formValues.waterServicePrice)

      Object.keys(changedImages).forEach(index => {
        console.log('index');
        console.log(index);
        console.log(changedImages[index]);

        formData.append(`images`, changedImages[index]);
        formData.append('indexes', index);
      });

      console.log(formData);

      const updatedResponse = await updateLot(formData).unwrap()
      if (updatedResponse.success) {
        toast({
          title: 'Your parking lot details have been updated',
          description: ''
        })
      }

      setIsEditable(false);
    }
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const [getDetails] = useGetProviderDetailsMutation()
  useEffect(() => {
    fetchPRoviderDetails();
  }, [])

  const fetchPRoviderDetails = async () => {
    const response = await getDetails(providerInfo.id).unwrap()
    if (response.success) {
      console.log(response.data);

      setProviderDetails(response.data)
      setFormValues({ ...response.data })
    }
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);

      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...formValues.images];
        updatedImages[index] = reader.result;

        const updatedChangedImages = { ...changedImages, [index]: file };

        setFormValues({ ...formValues, images: updatedImages });
        setChangedImages(updatedChangedImages);
      };
      reader.readAsDataURL(file);
    }
  };


  const disableServices = (e) => {
    let name = e.target.id
    setFormValues({ ...formValues, [name]: '' });
  }


  return (
    <>

      {providerDetails && providerDetails.approvalStatus === 'true' ? (
        <motion.div initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
          }} className="p-4 sm:ml-64 h-full">
          <div className="p-2 min-h-screen rounded-lg dark:border-gray-700 flex justify-center items-center">
            <div className="h-auto bg-gray-100 w-full max-w-3xl m-16 shadow-xl rounded-lg relative flex items-center justify-center p-8">
              <div className="space-y-6 mt-8 w-full">
                <div className="flex flex-col sm:flex-row items-start justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium ">Address:</span>
                  <div className="block text-gray-900 p-2 text-sm rounded-md w-full sm:w-3/4 bg-gray-50 capitalize">
                    {(
                      <>
                        <p>{formValues.address.buildingOrAreaName}</p>
                        <p>{formValues.address.street}</p>
                        <p>{formValues.address.pinNumber}</p>
                        <p>{formValues.address.city}</p>
                        <p>{formValues.address.state}, {formValues.address.country}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Number of slots:</span>
                  <span className="block text-gray-900 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">
                    {isEditable ? (
                      <input
                        type="text"
                        name="availableSpace"
                        value={formValues.availableSpace}
                        onChange={handleChange}
                        className="block w-full border-none focus:outline-none h-8" />
                    ) : (
                      formValues.availableSpace
                    )}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Air pressure check:</span>
                  <span className="block text-gray-900 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">
                    {isEditable ? (
                      <>
                        <input
                          type="number"
                          name="airPressureCheckPrice"
                          value={formValues.airPressureCheckPrice}
                          onChange={handleChange}
                          className="block w-full border-none focus:outline-none h-8" />
                        <div className='flex justify-end'>
                          <p onClick={disableServices} id='airPressureCheckPrice' className='border border-black p-1 mt-1 text-gray-500 cursor-pointer rounded-sm'>Disable</p>
                        </div>
                      </>
                    ) : (
                      formValues.airPressureCheckPrice ? formValues.airPressureCheckPrice : 'Not enabled'
                    )}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Water service:</span>
                  <span className="block text-gray-900 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">
                    {isEditable ? (
                      <>
                        <input
                          type="number"
                          name="waterServicePrice"
                          value={formValues.waterServicePrice}
                          onChange={handleChange}
                          className="block w-full border-none focus:outline-none h-8" />
                        <div className='flex justify-end'>
                          <p onClick={disableServices} id='waterServicePrice' className='border border-black p-1 mt-1 text-gray-500 cursor-pointer rounded-sm'>Disable</p>
                        </div>
                      </>
                    ) : (
                      formValues.waterServicePrice ? formValues.waterServicePrice : 'nil'
                    )}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">EV charging:</span>
                  <span className="block text-gray-900 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">
                    {isEditable ? (
                      <>
                        <input
                          type="number"
                          name="evChargeFacilityPrice"
                          value={formValues.evChargeFacilityPrice}
                          onChange={handleChange}
                          className="block w-full border-none focus:outline-none h-8" />
                        <div className='flex justify-end'>
                          <p onClick={disableServices} id='evChargeFacilityPrice' className='border border-black p-1 mt-1 text-gray-500 cursor-pointer rounded-sm'>Disable</p>
                        </div>
                      </>

                    ) : (
                      formValues.evChargeFacilityPrice ? formValues.evChargeFacilityPrice : 'nil'
                    )}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Hourly price:</span>
                  <span className="block text-gray-900 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">
                    {isEditable ? (
                      <input
                        type="number"
                        name="pricePerHour"
                        value={formValues.pricePerHour}
                        onChange={handleChange}
                        className="block w-full border-none focus:outline-none h-8" />
                    ) : (
                      formValues.pricePerHour
                    )}
                  </span>
                </div>


                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Images</span>
                  <div className="flex flex-wrap justify-start">
                    {formValues.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredImageIndex(index)}
                        onMouseLeave={() => setHoveredImageIndex(null)}
                      >
                        <img
                          src={image}
                          alt={`Provider image ${index + 1}`}
                          className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 m-2 rounded-sm object-cover"
                        />
                        {isEditable && hoveredImageIndex === index && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer">
                            <label className="cursor-pointer">
                              Change Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, index)}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  {isEditable && <button
                    type="button"
                    onClick={() => setIsEditable(false)}
                    className="bg-secondary-provider hover:text-gray-200 text-sm text-white font-semibold p-2 m-2 w-32 rounded flex items-center justify-around duration-300 transition-all active:scale-[.98] active:duration-75  hover:scale-[1.02] ease-in-out"
                  >
                    Cancel
                  </button>}

                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="bg-primary-provider hover:bg-secondary-provider text-sm text-white font-semibold p-2 m-2 w-32 rounded flex items-center justify-around duration-300 transition-all active:scale-[.98] active:duration-75  hover:scale-[1.02] ease-in-out"
                  >
                    {isEditable ? 'Save' : 'Edit'}
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

export default ProvParkingLot


interface FormValues {
  address: {
    buildingOrAreaName: string;
    street: string;
    pinNumber: string;
    city: string;
    state: string;
    country: string;
  };
  availableSpace: string;
  pricePerHour: string;
  airPressureCheckPrice?: string;
  waterServicePrice?: string;
  evChargeFacilityPrice?: string;
  mobile: string;
  images: string[];
}

const initialFormValues: FormValues = {
  address: {
    buildingOrAreaName: '',
    street: '',
    pinNumber: '',
    city: '',
    state: '',
    country: '',
  },
  availableSpace: '',
  pricePerHour: '',
  airPressureCheckPrice: '',
  waterServicePrice: '',
  evChargeFacilityPrice: '',
  mobile: '',
  images: [],
};