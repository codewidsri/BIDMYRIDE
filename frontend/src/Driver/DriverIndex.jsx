import Map from "./Map.jsx";
import MapUpdate from "./MapUpdate.jsx";
import { useState, useEffect } from "react";
import ShowRiders from './ShowRiders.jsx';
import Socket from '../context/Socket.js';
import { useNavigate } from "react-router-dom";

function DriverIndex({ customAlert }) {
    const navigate = useNavigate();
    const [position, setPosition] = useState({ lat: 13.0827, lng: 80.2707 });
    const [riders, setriders] = useState([]);
    const [acceptedride, setacceptedride] = useState({});

    useEffect(() => {
        Socket.on('driver:receivefare', ({ riderid, ridername, fare, pickup, dropoff, distance, pickupCoords }) => {
            setriders((prev) => {
                const exists = prev.find(r => r.riderid === riderid);
                if (exists) {
                    return prev.map(r => r.riderid === riderid
                        ? { riderid, ridername, fare, pickup, dropoff, distance, pickupCoords }
                        : r
                    );
                } else {
                    return [...prev, { riderid, ridername, fare, pickup, dropoff, distance, pickupCoords }];
                }
            });
        });
    }, []);

    useEffect(() => {
        Socket.on("driver:confirmedride", ({ rideid, riderid, fare }) => {
            setacceptedride((prev) => ({ ...prev, [riderid]: fare }));
            navigate('/driver/viewride', {
                state: {
                    rideid
                }
            })
        });
        return () => {
            Socket.off("driver:confirmedride");
        };
    }, []);

    return (
        <>
            <MapUpdate customAlert={customAlert} />
            <Map customAlert={customAlert} riders={riders} position={position} setPosition={setPosition} />
            <ShowRiders riders={riders} acceptedride={acceptedride} />
        </>
    )
}

export default DriverIndex;