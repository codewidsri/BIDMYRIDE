import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ridericon = L.icon({
    iconUrl: '/rider-icon.svg', // or import and use it if in `src`
    iconSize: [32, 40],    // width, height
    iconAnchor: [16, 40],  // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
});


const LocationMarker = ({ position, setPosition, notify, riderfares }) => {
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
            <Marker
                draggable
                position={position}
                eventHandlers={eventHandlers}
                ref={markerRef}
            >
                <Popup>Drag me to your location</Popup>
            </Marker>
            {riderfares && riderfares.map((rider, index) => (
                <Marker
                    key={index}
                    position={[
                        rider.pickupCoords.lat, // lat
                        rider.pickupCoords.lng  // lng
                    ]}
                    icon={ridericon}
                >
                    <Popup>
                        {rider.ridername}
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

function Map({position,setPosition, notify, riderfares }) {

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
                notify("Location data is retrieved successfully", "success");
            }, (error) => {
                notify(`Failed: ${error.message}`, "info");
            })
        } else {
            notify("Geolocation not supported by this browser", "danger");
        }
    }

    async function UpdateLocation() {
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/driver/updatelocation`, position, configuration)
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

    function MapViewUpdater({ position }) {
        const map = useMap();

        useEffect(() => {
            map.setView(position, map.getZoom());
        }, [position, map]);

        return null;
    }

    return (
        <div style={{ width: '100%', height: '70dvh' }}>

            <MapContainer center={position} zoom={10} style={{ width: '100%', height: '100%' }}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

                <MapViewUpdater position={position} />

                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    notify={notify}
                    riderfares={riderfares}
                />

            </MapContainer>

        </div>
    );
}

export default Map;