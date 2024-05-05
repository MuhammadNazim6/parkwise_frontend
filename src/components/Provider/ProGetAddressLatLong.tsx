import React, { useEffect } from 'react'
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";


function ProGetAddressLatLong() {
  const ApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    setKey(ApiKey);
    const address = "1600 Amphitheatre Parkway, Mountain View, CA";
    geocode(RequestType.ADDRESS, address)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  })


  return (
    <div>

    </div>
  )
}

export default ProGetAddressLatLong