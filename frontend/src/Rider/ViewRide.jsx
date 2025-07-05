import { useLocation } from "react-router-dom";
import ViewRideMap from "./ViewRideMap.jsx";
import ViewOTP from "./ViewOTP.jsx";
import { useEffect, useState } from "react";
import Socket from "../context/Socket.js";
import CustomAlert from "../components/CustomAlert.jsx";

function ViewRide() {
    const location = useLocation();
    const { ride } = location.state || {};

    const [alert, setAlert] = useState({ open: false, message: '', variant: 'success' });
    const customAlert = (message, variant = 'info') => {
        setAlert({ open: true, message, variant });
    };

    useEffect(() => {
        Socket.on("rider:ridestarted", ({ driverid }) => {
            customAlert("Ride Started")
        })
    }, [])

    return (
        <>
            <CustomAlert open={alert.open} message={alert.message} variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} />
            <ViewOTP otp={ride.otp} />
            <ViewRideMap ride={ride} />
        </>
    )
}

export default ViewRide;