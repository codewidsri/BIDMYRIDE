import { useLocation, useNavigate } from "react-router-dom";
import EnterOtp from "./EnterOTP.jsx";
import ViewRideMap from "./ViewRideMap.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Socket from "../context/Socket.js";

function ViewRide({ customAlert }) {
    const location = useLocation();
    const { rideid } = location.state || {};
    const [ride, setride] = useState(null);

    const navigate = useNavigate()
    useEffect(() => {
        Socket.on("driver:riderridefinshed", () => {
            customAlert("Ride Completed")
            localStorage.removeItem("ride")
            navigate("/driver/")
        })
    },[])

    return (
        <>
            <EnterOtp rideid={rideid} customAlert={customAlert} setride={setride} />
            {ride && <ViewRideMap ride={ride} />}
        </>
    )
}

export default ViewRide;