import Map from "./Map.jsx";
import RiderMapForm from "./RiderMapForm.jsx";
import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'

function RiderIndex() {
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);

    const [show, setshow] = useState(false);
    const [showmessage, setshowmessage] = useState('')
    const [showmessagetype, setshowmessagetype] = useState('')

    const [showvehicles, setshowvehicles] = useState(null);

    function notify(message, type) {
        setshowmessage(message);
        setshowmessagetype(type);
        setshow(true);
    }

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
                setshowvehicles={setshowvehicles}
                notify={notify}
            />

            <Map pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} setPickupCoords={setPickupCoords} notify={notify} showvehicles={showvehicles} />

        </>
    )
}

export default RiderIndex;