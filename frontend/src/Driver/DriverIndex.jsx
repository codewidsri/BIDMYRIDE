import Map from "./Map.jsx";
import MapUpdate from "./MapUpdate.jsx";
import { Toast, ToastContainer } from 'react-bootstrap'
import { useState, useEffect } from "react";
import ShowRiders from './ShowRiders.jsx';
import Socket from '../context/Socket.js';

function DriverIndex() {

    const [position, setPosition] = useState({ lat: 13.0827, lng: 80.2707 });

    const [show, setshow] = useState(false);
    const [showmessage, setshowmessage] = useState('')
    const [showmessagetype, setshowmessagetype] = useState('')

    const [riderfares, setriderfares] = useState([]);

    function notify(message, type) {
        setshow(true);
        setshowmessage(message);
        setshowmessagetype(type);
    }

    useEffect(() => {
        Socket.on('driver:receivefare', ({ riderid, ridername, fare, pickup, dropoff, distance, pickupCoords }) => {
            setriderfares((prev) => {
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

    return (
        <>
            <ToastContainer position="top-center" className="p-3 m-3">
                <Toast bg={showmessagetype} show={show} onClose={() => setshow(!show)} delay={5000} autohide className="text-white">
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body className="text-center">
                        {showmessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <MapUpdate notify={notify} />

            <Map notify={notify} riderfares={riderfares} position={position} setPosition={setPosition} />

            <ShowRiders riderfares={riderfares} />
        </>
    )
}

export default DriverIndex;