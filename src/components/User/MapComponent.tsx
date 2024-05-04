import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet'

function MapComponent() {
  return (
    <MapContainer center={[48.8566,2.3522]} zoom={13}>
      <TileLayer
      url="https://{s}.tile.openstreet"
      />
    </MapContainer>
  )
}

export default MapComponent