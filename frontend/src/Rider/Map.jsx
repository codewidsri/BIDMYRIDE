import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import polyline from '@mapbox/polyline';
import axios from 'axios';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const driverIcon = L.icon({
  iconUrl: '/driver-icon.svg', // or import and use it if in `src`
  iconSize: [32, 40],    // width, height
  iconAnchor: [16, 40],  // point of the icon which will correspond to marker's location
  popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
});

const LocationMarker = ({ position, setPosition, notify, pickupCoords, dropoffCoords, showdrivers }) => {
  const markerRef = useRef(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      notify("Location pinned successfully!", "success");
    },
  });

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(marker.getLatLng());
        notify("Location updated by dragging!", "success");
      }
    },
  };

  return (
    <>
      {showdrivers && showdrivers.map((driver, index) => (
        <Marker
          key={index}
          position={[
            driver.location.coordinates[1], // lat
            driver.location.coordinates[0]  // lng
          ]}
          icon={driverIcon}
        >
          <Popup>
            <strong>{driver.name}</strong><br />
            Phone: {driver.phone}<br />
            Vehicle No: {driver.vehiclenumber}<br />
            Capacity: {driver.capacity}
          </Popup>
        </Marker>
      ))}

      {pickupCoords && dropoffCoords ?
        <>
          <Marker
            draggable
            position={pickupCoords}
            eventHandlers={eventHandlers}
            ref={markerRef}
          >
            <Popup>From</Popup>
          </Marker>
          <Marker
            draggable
            position={dropoffCoords}
            eventHandlers={eventHandlers}
            ref={markerRef}
          >
            <Popup>To</Popup>
          </Marker>
        </> :
        <Marker
          draggable
          position={position}
          eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>Drag me to your location</Popup>
        </Marker>
      }
    </>
  );
};

async function getOSRMRoute(lat1, lon1, lat2, lon2) {

  const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=polyline`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('OSRM routing API error');
  }

  const data = await response.json();

  if (data.code !== 'Ok' || data.routes.length === 0) {
    throw new Error('No route found');
  }

  const distanceInMeters = data.routes[0].distance;
  const geometry = data.routes[0].geometry; // encoded polyline string
  const routePoints = polyline.decode(geometry).map(([lat, lng]) => ({ lat, lng }));

  return {
    distance: distanceInMeters / 1000, // km
    routePoints,
  }
}

function Map({ setPickup, pickupCoords, setPickupCoords, dropoffCoords, setDistance, notify, showdrivers }) {

  const [position, setPosition] = useState({ lat: 13.0827, lng: 80.2707 });

  const [routePoints, setRoutePoints] = useState([]);

  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        setPickupCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
        getAddressFromCoords(position.coords.latitude, position.coords.longitude)
        notify("Location data is retrieved successfully", "success");
      }, (error) => {
        notify("Failed to retrieve location", "info");
      })
    } else {
      notify("Geolocation not supported by this browser", "danger");
    }
  }

  async function getAddressFromCoords(lat, lon) {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();
    setPickup(data.display_name);
  }

  async function UpdateLocation() {
    try {
      const configuration = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/rider/updatelocation`, position, configuration)
      notify(response.data.message, 'success')
    } catch (error) {
      notify(error.response.data.message, 'danger')
    }
  }

  useEffect(() => {
    getLocation();
  }, [])

  useEffect(() => {
    UpdateLocation();
  }, [position])

  useEffect(() => {
    async function fetchRoute() {
      if (pickupCoords && dropoffCoords) {
        try {
          const { distance, routePoints } = await getOSRMRoute(
            pickupCoords.lat,
            pickupCoords.lng,
            dropoffCoords.lat,
            dropoffCoords.lng
          );
          setDistance(distance);
          setRoutePoints(routePoints);
          notify(`Route distance: ${distance.toFixed(2)} km`, 'success');
        } catch (error) {
          notify('Could not calculate route distance', 'danger');
          setDistance(null);
          setRoutePoints([]);
        }
      }
    }
    fetchRoute();
  }, [pickupCoords, dropoffCoords])


  const MapFocus = ({ center }) => {
    const map = useMap();

    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom(), { animate: true });
      }
    }, [center]);

    return null;
  };

  return (
    <div style={{ width: '100%', height: '80dvh', margin: 3 }}>

      <MapContainer center={position} zoom={15} style={{ width: '100%', height: '100%' }}>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

        <MapFocus center={pickupCoords || position} />

        <LocationMarker
          position={position}
          setPosition={setPosition}
          notify={notify}
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
          showdrivers={showdrivers}
        />

        {routePoints.length > 0 && (
          <Polyline
            positions={routePoints}
            pathOptions={{ color: 'blue', weight: 3, opacity: 1 }}
          />
        )}

      </MapContainer>

    </div>
  );
}

export default Map;