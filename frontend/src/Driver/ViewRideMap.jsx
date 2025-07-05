import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import polyline from '@mapbox/polyline';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Socket from "../context/Socket.js";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ridericon = L.icon({
    iconUrl: '/rider-driving-location.svg', // or import and use it if in `src`
    iconSize: [32, 40],    // width, height
    iconAnchor: [16, 40],  // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
});

const drivericon = L.icon({
    iconUrl: '/driver-driving-location.svg', // or import and use it if in `src`
    iconSize: [32, 40],    // width, height
    iconAnchor: [16, 40],  // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40],
})

const SetViewToCurrentLocation = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView([coords.lat, coords.lng], 15);
        }
    }, [coords]);
    return null;
};

const ViewRideMap = ({ ride }) => {

    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);
    const [routePoints, setRoutePoints] = useState([]);

    const [ridercoords, setridercoords] = useState(null);
    const [drivercoords, setdrivercoords] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        alert(ride.pickupCoords.coordinates[1])
        setPickupCoords({ lat: ride.pickupCoords.coordinates[1], lng: ride.pickupCoords.coordinates[0] })
        setDropoffCoords({ lat: ride.dropoffCoords.coordinates[1], lng: ride.dropoffCoords.coordinates[0] })
    }, []);

    useEffect(() => {
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

        async function fetchRoute() {
            if (pickupCoords && dropoffCoords) {
                try {
                    const { distance, routePoints } = await getOSRMRoute(pickupCoords.lat, pickupCoords.lng, dropoffCoords.lat, dropoffCoords.lng);
                    setRoutePoints(routePoints);
                } catch (error) {
                    setRoutePoints([]);
                }
            }
        }
        fetchRoute();
    }, [pickupCoords, dropoffCoords])

    function getLiveLocation() {
        if ('geolocation' in navigator) {
            const id = navigator.geolocation.watchPosition(
               async (position) => {
                    const current = { lat: position.coords.latitude, lng: position.coords.longitude };
                    setdrivercoords(current);
                    Socket.emit("driver:driverlivelocation", { drivercoords, riderid: ride.riderId })
                    if (dropoffCoords) {
                        const dist = await getLiveDistanceToDropoff(current, dropoffCoords);
                        if (dist !== null && dist < 0.1) {
                            setOpenModal(true);
                        }
                    }
                },
                (error) => {
                    console.error(error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000,
                }
            );
            return id;
        } else {
            console.log("Geolocation not supported");
            return null;
        }
    }

    async function getLiveDistanceToDropoff(driver, dropoff) {
        const url = `https://router.project-osrm.org/route/v1/driving/${driver.lng},${driver.lat};${dropoff.lng},${dropoff.lat}?overview=false`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.code === "Ok" && data.routes.length > 0) {
            return data.routes[0].distance / 1000; // in kilometers
        }

        return null;
    }

    useEffect(() => {
        const watchId = getLiveLocation();

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    useEffect(() => {
        Socket.on("driver:riderlivelocation", ({ drivercoords }) => {
            setridercoords(drivercoords);
        });

        return () => {
            Socket.off("rider:driverlivelocation");
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '80dvh', margin: 3 }}>

            <MapContainer center={pickupCoords || [20, 77]} zoom={pickupCoords ? 15 : 5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }} >

                <TileLayer attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {pickupCoords && dropoffCoords ? (
                    <>
                        <SetViewToCurrentLocation coords={pickupCoords} />

                        <Marker position={pickupCoords} icon={ridericon}>
                            <Popup>From</Popup>
                        </Marker>

                        <Marker position={dropoffCoords}>
                            <Popup>To</Popup>
                        </Marker>
                    </>
                ) : (
                    <Marker position={{ lat: 13.0827, lng: 80.2707 }}>
                        <Popup>here</Popup>
                    </Marker>
                )
                }

                {drivercoords && (
                    <Marker position={drivercoords} icon={drivericon}>
                        <Popup>Driver</Popup>
                    </Marker>
                )}

                {ridercoords && (
                    <Marker position={ridercoords} icon={ridericon}>
                        <Popup>Rider</Popup>
                    </Marker>
                )}

                {routePoints.length > 0 && (
                    <Polyline positions={routePoints} pathOptions={{ color: 'blue', weight: 5, opacity: 1 }} />
                )}

            </MapContainer>

            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Finish Ride</DialogTitle>
                <DialogContent>You’ve reached the drop-off point.</DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={() => {
                        Socket.emit("driver:ridefinished", { rideid: ride._id, driverid: ride.driverId });
                        setOpenModal(false);
                    }}>Finish</Button>
                    <Button onClick={() => setOpenModal(false)} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default ViewRideMap;