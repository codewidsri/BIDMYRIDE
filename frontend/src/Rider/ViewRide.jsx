import { useLocation } from "react-router-dom";
import ViewRideMap from "./ViewRideMap.jsx";
import ViewOTP from "./ViewOTP.jsx";
import { useEffect, useState } from "react";
import Socket from "../context/Socket.js";

function ViewRide({ customAlert }) {
    const location = useLocation();
    const { ride } = location.state || {};
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        Socket.on("rider:ridestarted", () => {
            customAlert("Ride Started")
        })
        Socket.on("rider:driverridefinished", () => {
            setOpenModal(true)
        })
    }, [])

    return (
        <>
            <ViewOTP otp={ride.otp} />
            <ViewRideMap ride={ride} openModal={openModal} setOpenModal={setOpenModal} customAlert={customAlert} />
        </>
    )
}

export default ViewRide;