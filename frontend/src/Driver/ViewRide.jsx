import { useLocation } from "react-router-dom";
import EnterOtp from "./EnterOTP.jsx";
import ViewRideMap from "./ViewRideMap.jsx";
import CustomAlert from "../components/CustomAlert.jsx";
import { useState } from "react";

function ViewRide() {
    const location = useLocation();
    const { rideid } = location.state || {};
    const [ride, setride] = useState(null);

    const [alert, setAlert] = useState({ open: false, message: '', variant: 'success' });
    const customAlert = (message, variant = 'info') => {
        setAlert({ open: true, message, variant });
    };

    return (
        <>
            <CustomAlert open={alert.open} message={alert.message} variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} />
            <EnterOtp rideid={rideid} customAlert={customAlert} setride={setride} />
            {ride && <ViewRideMap ride={ride} />}
        </>
    )
}

export default ViewRide;