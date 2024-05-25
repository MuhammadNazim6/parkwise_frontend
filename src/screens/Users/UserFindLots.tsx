import React, { useState, useEffect, useCallback } from "react";
import { IoMdBatteryCharging } from "react-icons/io";
import HeroImage from "../../assets/Images/68477b6e-7741-423d-86b1-bf94fde5f12b_1344x896.jpg";
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useGetParkingLotsMutation } from "@/redux/slices/userApiSlice";
import UserSearchAddress from "@/components/User/UserSearchAddress";
import { Loader } from '../../components/Common/BootstrapElems'
import { MdLocalCarWash } from "react-icons/md";
import { GiCartwheel } from "react-icons/gi";
import { SkeletonCard } from "@/components/Common/ListSkeleton";
import { Link } from "react-router-dom";

function UserFindLots() {
  const [coordinates, setCoordinates] = useState([null]);
  const [price, setPrice] = useState(240)
  const [services, setServices] = useState({
    airPressure: false,
    waterService: false,
    evCharging: false,
  });
  const [parkingLots, setParkingLots] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const WATER_SERVICE = 'waterService'
  const EV_CHARGING = 'evCharging'
  const AIR_PRESSURE = 'airPressure'
  const limit = 4;
  const [getParkingLots, { isLoading }] = useGetParkingLotsMutation()

  useEffect(() => {
    // Getting users current location
    getCurrentCoordinatesAndFetchParkingLots()
  }, [])

  useEffect(() => {
    if (coordinates.length === 2) {
      console.log('In useEffect (Not on initial render)');
      fetchParkingLots()
    }
  }, [coordinates, price, services])

  const handlePriceChange = (value) => {
    setPrice(value)
  }

  const handleServiceChange = (service) => {
    const state = services[service]
    setServices((prevServices) => ({
      ...prevServices,
      [service]: !state
    }));
  }

  const fetchParkingLots = async () => {
    setLoading(true)
    const coordinatesStr = JSON.stringify(coordinates)
    const response = await getParkingLots({ coordinatesStr, services, price, limit, page }).unwrap()
    setParkingLots((prev) => [...response.data]);
    console.log(...response.data);
    setLoading(false)
  }

  const getCurrentCoordinatesAndFetchParkingLots = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (latitude && longitude) {
          setCoordinates([longitude, latitude])
        }
      })
    }
  }

  return (
    <>
      <div
        className="hero h-20 sticky top-0 z-10"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <div className="w-full">
            {/* <h1 className="mb-5 md:text-5xl text-2xl font-bold">Hello there</h1> */}
            <div className="relative flex">
              <UserSearchAddress setCoordinates={setCoordinates} />

            </div>
          </div>
        </div>
      </div>

      <div className="md:block hidden w-1/6 fixed border-xl text-sm pt-4 ">
        <div className="flex justify-start px-8 py-3 text-lg text-gray-500 font-medium tracking-widest shadow-2xl rounded-t-2xl bg-blue-100">
          Filters
        </div>
        <div className="p-7 shadow-md  bg-blue-100">
          <div className="text-md p-2 text-gray-500 tracking-wider flex justify-start mb-3">
            Slot Price: {price}
          </div>
          <div className="text-lg text-black tracking-wider flex justify-center cursor-pointer">
            <Slider defaultValue={[price]} max={400} step={20} onValueChange={handlePriceChange} />
          </div>
        </div>

        {/* SERVICES CHECKBOX */}
        <div className="text-md text-gray-600 tracking-wider lg:p-12 p-3 shadow-xl rounded-b-xl bg-blue-100 h-screen">
          <label className="flex items-center cursor-pointer mb-4" htmlFor="airPressure">
            <Checkbox
              id={AIR_PRESSURE}
              onClick={() => handleServiceChange(AIR_PRESSURE)}
              className="mr-2 cursor-pointer"
            />
            Air Pressure
          </label>
          <label className="flex items-center cursor-pointer mb-4">
            <Checkbox
              id={WATER_SERVICE}
              onClick={() => handleServiceChange(WATER_SERVICE)}
              className="mr-2 cursor-pointer"
            />
            Water Service
          </label>
          <label className="flex items-center mb-2 cursor-pointer">
            <Checkbox
              id={EV_CHARGING}
              onClick={() => handleServiceChange(EV_CHARGING)}
              className="mr-2 cursor-pointer"
            />
            EV Charging
          </label>
        </div>
      </div>

      {parkingLots.length > 0 ? (
        <div className="md:px-16 md:w-5/6 h-screen ml-auto bg-white relative">
          <ul className="p-4">
            {/* Parking lot list */}
            {parkingLots.map((lot) => (
              <Link to={`/user/find/lotDetails/${lot._id}`}
                key={lot._id}
                className="bg-blue-100 md:hover:bg-blue-50 m-5 rounded-b-xl flex md:flex-row justify-between hover:scale-[1.001] transition-all ease-in-out cursor-pointer p-4 h-28"
              >
                <div className="flex flex-col justify-between w-3/4 px-5">
                  <div>
                    <p className="text-lg">{lot.address?.buildingOrAreaName}</p>
                    <p className="text-sm md:text-sm line-clamp-1 text-gray-600">
                      {`${lot.address.landmark}, ${lot.address.street}, ${lot.address.pinNumber}, ${lot.address.city}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-16 text-sm">
                    {lot.evChargeFacilityPrice && (<div className="flex place-items-center space-x-1">
                      <IoMdBatteryCharging className="text-green-900" />
                      <p className="text-gray-700">ev charging</p>
                    </div>)}
                    {lot.waterServicePrice && (<div className="flex place-items-center space-x-1">
                      <MdLocalCarWash className="text-blue-800 " />
                      <p className="text-gray-700">water service</p>
                    </div>)}
                    {lot.airPressureCheckPrice && (<div className="flex place-items-center space-x-1">
                      <GiCartwheel className="text-black" />
                      <p className="text-gray-700">air filling</p>
                    </div>)}
                  </div>
                </div>
                <div className="flex justify-center m-5 rounded-b-lg items-center w-1/4 bg-slate-200 shadow-lg">
                  Fare:
                  <p className="p-2">{`${lot.pricePerHour} / hour`}</p>
                </div>
              </Link>
            ))}
          </ul>
          {loading ? (
            <div className="text-center w-full mt-24 text-xl md:text-3xl text-gray-700 flex justify-center items-center">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <span className="mr-3">Loading</span> <Loader />
            </div>
          ) : (null)}
        </div>
      ) : (
        <div className="text-center w-full mt-24 text-xl md:text-3xl text-gray-700 bg-white min-h-screen">
          No results found
        </div>
      )}
      {/* </div> */}
    </>
  );
}

export default UserFindLots;