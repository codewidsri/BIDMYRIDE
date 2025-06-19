import Map from "./Map.jsx";
import RiderMapForm from "./RiderMapForm.jsx";
import { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'
import ShowDrivers from "./ShowDrivers.jsx";
import Socket from "../context/Socket.js";

function RiderIndex() {

    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);

    const [distance, setDistance] = useState('');

    const [vehicle, setVehicle] = useState(null);

    const [showdrivers, setshowdrivers] = useState(null);
    const [driverfares, setdriverfares] = useState({});

    const [show, setshow] = useState(false);
    const [showmessage, setshowmessage] = useState('')
    const [showmessagetype, setshowmessagetype] = useState('')

    function notify(message, type) {
        setshowmessage(message);
        setshowmessagetype(type);
        setshow(true);
    }

    useEffect(() => {

        Socket.on('rider:receivefare', ({ driverid, fare }) => {
            setdriverfares((prev) => ({ ...prev, [driverid]: fare }))
        })

        Socket.on('rider:acceptedfare', ({ driverid, fare }) => {
            setdriverfares((prev) => ({ ...prev, [driverid]: fare }))
        })

    }, [])

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

            <RiderMapForm
                pickup={pickup}
                setPickup={setPickup}
                dropoff={dropoff}
                setDropoff={setDropoff}
                pickupCoords={pickupCoords}
                setPickupCoords={setPickupCoords}
                dropoffCoords={dropoffCoords}
                setDropoffCoords={setDropoffCoords}
                vehicle={vehicle}
                setVehicle={setVehicle}
                distance={distance}
                showdrivers={showdrivers}
                setshowdrivers={setshowdrivers}
                notify={notify}
            />

            <Map setPickup={setPickup} pickupCoords={pickupCoords} setPickupCoords={setPickupCoords} dropoffCoords={dropoffCoords} setDistance={setDistance} notify={notify} showdrivers={showdrivers} />

            <ShowDrivers showdrivers={showdrivers} driverfares={driverfares} pickup={pickup} dropoff={dropoff} pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} vehicle={vehicle} distance={distance} notify={notify} />

        </>
    )
}

export default RiderIndex;