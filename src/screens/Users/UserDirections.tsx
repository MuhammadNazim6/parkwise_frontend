import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Map, { FullscreenControl, GeolocateControl, Marker, Source, Layer, NavigationControl, } from 'react-map-gl';
import Instructions from '@/components/User/Instructions';
import {motion} from 'framer-motion'


function UserDirections() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const coordinatesStr = searchParams.get('end')
  const coordinatesArr = coordinatesStr ? coordinatesStr.split(',').map(Number) : [];
  const [viewState, setViewState] = useState({
    longitude: 75,
    latitude: 11,
    zoom: 6.5
  });

  const accessTokenMapbox = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  const [start, setStart] = useState([75.92, 11.40])
  const [end, setEnd] = useState([coordinatesArr[0], coordinatesArr[1]])
  const [coords, setCoords] = useState([])
  const [steps, setSteps] = useState([])
  const [distance, setDistance] = useState()
  const [duration, setDuration] = useState()

  // Dragging
  // const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 120 });
  const dragRef = useRef();

  // const handleMouseDown = (e) => {
  //   setDragging(true);
  //   dragRef.current = {
  //     x: e.clientX - position.x,
  //     y: e.clientY - position.y,
  //   };
  // };

  // const handleMouseMove = (e) => {
  //   if (dragging) {
  //     const newX = e.clientX - dragRef.current.x
  //     const newY = e.clientY - dragRef.current.y

  //     const screenWidth = window.innerWidth;
  //     const screenHeight = window.innerHeight;

  //     const divWidth = 384;
  //     const divHeight = 384;

  //     const clampedX = Math.max(0, Math.min(newX, screenWidth - divWidth))
  //     const clampedY = Math.max(0, Math.min(newY, screenHeight - divHeight))

  //     setPosition({
  //       x: clampedX,
  //       y: clampedY,
  //     });
  //   }
  // };

  // const handleMouseUp = () => {
  //   setDragging(false);
  // };

  // useEffect(() => {
  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('mouseup', handleMouseUp);
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [dragging]);



  const GeoLocateControlRef = useRef()

  useEffect(() => {
    getRoute()
    // GeoLocateControlRef.current?.trigger()
  }, [end])


  const getRoute = async () => {
    const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${accessTokenMapbox}`);
    const coords = response.data.routes[0].geometry.coordinates
    setCoords(coords)

    const steps = response.data.routes[0].legs[0].steps
    const distance = response.data.routes[0].distance
    const duration = response.data.routes[0].duration

    setSteps(steps)
    setDistance(distance)
    setDuration(duration)
  }

  const geojson = {
    "type": "FeatureCollection",
    "features": [{
      "type": "feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          ...coords
        ]
      }
    }]
  }

  const lineStyle = {
    id: "roadLayer",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "blue",
      "line-width": 4,
      "line-opacity": 0.75
    }
  }

  const endPoint = {
    "type": "FeatureCollection",
    "features": [{
      "type": "feature",
      "geometry": {
        "type": "Point",
        "coordinates": [...end]
      }
    }]
  }

  const layerEndPoint = {
    id: "end",
    type: "circle",
    source: {
      type: 'geojson',
      data: 'end',
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#f30',
    }
  }

  const handleGeoLocate = (e) => {
    setStart([e.coords.longitude, e.coords.latitude])
    setEnd((prev) => [...prev])
  }
  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
    }}>
      <div className="absolute w-full h-screen">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/nazim66/clxli6lg500e501qq2oqi5tk2"
          mapboxAccessToken={accessTokenMapbox}
          style={{ width: "100%", height: "100%" }}
        >
          <Source id="routeSource" type='geojson' data={geojson}>
            <Layer {...lineStyle} />
          </Source>

          <Source id="endSource" type='geojson' data={endPoint}>
            <Layer {...layerEndPoint} />
          </Source>

          <GeolocateControl showAccuracyCircle={false} onGeolocate={handleGeoLocate} ref={GeoLocateControlRef} />
          <FullscreenControl />
          <NavigationControl />
          <Marker longitude={start[0]} latitude={start[1]} />
        </Map>
      </div>
      <div
        className="w-72 md:w-96 h-40 md:h-96 bg-gray-700 rounded-lg shadow-lg absolute p-4 md:p-6 overflow-y-scroll hide-scrollbar"
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
        // onMouseDown={handleMouseDown}
      >
        <button className='mb-3 text- sticky top-0 bg-white rounded p-3 transition-transform hover:scale-[1.02] ease-in-out' onClick={() => { GeoLocateControlRef ? GeoLocateControlRef.current.trigger() : null }}>Navigate from current location</button>

        <h2 className="text-xl text-white font-semibold mb-4">Distance: &nbsp;{(distance/1000).toFixed(2)} Kms</h2>
        <h2 className="text-xl text-white font-semibold mb-1">Directions</h2>
        <article>

          {steps.map((item, i) => (
            <div key={i}>
              <Instructions no_={i + 1} step={item.maneuver.instruction} />
            </div>
          ))}
        </article>
      </div>
    </motion.div>
  );
}

export default UserDirections