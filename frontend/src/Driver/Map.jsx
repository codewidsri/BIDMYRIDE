import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition, notify }) => {
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
        </>
    );
};

function Map({ notify}) {
    const [position, setPosition] = useState({ lat: 13.0827, lng: 80.2707 });

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
                notify("Location data is retrieved successfully", "success");
            }, (error) => {
                notify("Failed to retrieve location", "info");
            })
        } else {
            notify("Geolocation not supported by this browser", "danger");
        }
    }

    useEffect(() => {
        getLocation();
    }, [])

    function MapViewUpdater({ position }) {
        const map = useMap();

        useEffect(() => {
            map.setView(position, map.getZoom());
        }, [position, map]);

        return null;
    }

    return (
        <div style={{ width: '100%', height: '70dvh' }}>

            <MapContainer center={position} zoom={19} style={{ width: '100%', height: '100%' }}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

                <MapViewUpdater position={position} />

                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    notify={notify}
                />

            </MapContainer>

        </div>
    );
}

export default Map;