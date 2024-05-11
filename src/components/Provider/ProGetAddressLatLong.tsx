import React, { useState, useRef, useEffect, useCallback } from 'react'
import mapboxgl from 'mapbox-gl';

function ProGetAddressLatLong({ provLocation , onCoordinatesClick }) {

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [clickedCoordinates, setClickedCoordinates] = useState(null)

  // Update the map location when button clicked
  const updateMapCenter = useCallback(() => {
    if (map.current && provLocation) {
      map.current.setCenter([provLocation.lng, provLocation.lat]);
      map.current.setZoom(13);
    }

    if (marker.current && provLocation) {
      marker.current.setLngLat([provLocation.lng, provLocation.lat]).addTo(map.current);
    }

  }, [provLocation]);

  useEffect(() => {
    updateMapCenter();
  }, [updateMapCenter]);


  useEffect(() => {
    // for initialize map only once
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    marker.current = new mapboxgl.Marker();
    marker.current.setLngLat([lng, lat]).addTo(map.current);

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (e) => {
      const coordinates = e.lngLat;
      let Lat = coordinates.lat.toFixed(4)
      let Lng = coordinates.lng.toFixed(4)
      setLng(Lng);
      setLat(Lat);
      setZoom(map.current.getZoom().toFixed(2));
      
      setClickedCoordinates({ Lng, Lat })   //store to state the clicked one
      onCoordinatesClick({ Lng, Lat });
      // Set marker also when clicked
      marker.current.setLngLat(coordinates).addTo(map.current);
    });

  }, [map]);


  return (
    <div className='w-full overflow-hidden'>
      <div className="sidebar">
       <p> Longitude: {lng} </p><p> Latitude: {lat} </p> <p>Zoom: {zoom}</p>
      </div>
      <div ref={mapContainer} className="map-container h-96 w-full" />
    </div>
  );
}

export default ProGetAddressLatLong