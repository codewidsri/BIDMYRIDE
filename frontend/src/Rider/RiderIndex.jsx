import Map from "./Map.jsx";
import RiderMapForm from "./RiderMapForm.jsx";
import { useEffect, useState } from 'react';
import ShowDrivers from "./ShowDrivers.jsx";
import Socket from "../context/Socket.js";
import CustomAlert from "../components/CustomAlert.jsx";

function RiderIndex({customAlert}) {

    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);

    const [distance, setDistance] = useState('');

    const [vehicle, setVehicle] = useState(null);

    const [showdrivers, setshowdrivers] = useState(null);
    const [driverfares, setdriverfares] = useState({});

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
                customAlert={customAlert}
            />

            <Map setPickup={setPickup} pickupCoords={pickupCoords} setPickupCoords={setPickupCoords} dropoffCoords={dropoffCoords} setDistance={setDistance} showdrivers={showdrivers} customAlert={customAlert} />

            <ShowDrivers showdrivers={showdrivers} driverfares={driverfares} pickup={pickup} dropoff={dropoff} pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} vehicle={vehicle} distance={distance} customAlert={customAlert} />
        </>
    )
}

export default RiderIndex;