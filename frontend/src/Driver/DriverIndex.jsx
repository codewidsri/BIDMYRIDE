import Map from "./Map";
import MapUpdate from "./MapUpdate";
import { Toast, ToastContainer } from 'react-bootstrap'
import { useState } from "react";

function DriverIndex() {
    const [show, setshow] = useState(false);
    const [showmessage, setshowmessage] = useState('')
    const [showmessagetype, setshowmessagetype] = useState('')
    function notify(message, type) {
        setshow(true);
        setshowmessage(message);
        setshowmessagetype(type);
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

            <MapUpdate notify={notify}/>
            <Map notify={notify} />
        </>
    )
}

export default DriverIndex;