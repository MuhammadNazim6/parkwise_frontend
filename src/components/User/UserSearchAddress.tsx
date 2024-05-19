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
      console.log('Coordinates:', coords);
      setCoordinates(coords);
    }
  }

  const customTheme = {
    variables: {
      // Customize variables here
    },
    cssClasses: {
      // Customize classes here
      root: 'shadow-4xl md:w-full w-4/6',
      input: 'px-4 py-3 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl',
      suggestionList: 'border border-gray-300 rounded-md mt-2 bg-white shadow-lg',
      suggestion: 'p-2 hover:bg-gray-100 cursor-pointer',
      suggestionSelected: 'bg-blue-100',
    },
  };

  return (
    <>
       <div className="w-full px-12 py-2">
      {/* Adjust width and padding for different screen sizes */}
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