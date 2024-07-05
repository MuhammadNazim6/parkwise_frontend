import React, { useState, useEffect, useCallback } from "react";
import { config, SearchBox } from '@mapbox/search-js-react';

function UserSearchAddress({ setCoordinates }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    setToken(accessToken)
    config.accessToken = accessToken;
  }, [])

  const handleRetrieve = async (res) => {
    if (res && res.features && res.features.length > 0) {
      const feature = res.features[0];
      const coords = feature.geometry.coordinates;
      setCoordinates(coords);
    }
  }

  return (
    <>
       <div className="w-full px-12 py-2">
      <SearchBox
        value=""
        accessToken={token}
        onRetrieve={handleRetrieve}
        // className="w-full h-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    </>
  )
}

export default UserSearchAddress