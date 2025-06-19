import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Box } from '@mui/material';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(marker.getLatLng());
      }
    },
  };

  return (
    <Marker draggable eventHandlers={eventHandlers} position={position} ref={markerRef} >
      <Popup>Drag me to your location</Popup>
    </Marker>
  );
}

function MapComponent() {
  const [position, setPosition] = useState({ lat: 13.0827, lng: 80.2707 }); // Default: Chennai

  return (
    <Box sx={{width:{ xs: 380, sm: 400, md: 420 ,lg: 450}}}>
      <div>
        <MapContainer center={position} zoom={30} style={{ height: '350px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
    </Box>
  );
}

export default MapComponent;