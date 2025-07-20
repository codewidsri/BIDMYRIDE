import { Routes, Route, Outlet } from "react-router-dom"
import DriverProfile from './DriverProfile.jsx'
import DriverDashboard from './DriverDashboard.jsx'
import DriverIndex from "./DriverIndex.jsx";
import Navbar from "./NavBar.jsx";
import ViewRide from "./ViewRide.jsx";
import CustomAlert from "../components/CustomAlert.jsx";
import { useState } from "react"

function Driver() {

    const [alert, setAlert] = useState({ open: false, message: '', variant: 'success' });
    const customAlert = (message, variant = 'info') => {
        setAlert({ open: true, message, variant });
    };

    return (
        <>
            <Navbar />
            <CustomAlert open={alert.open} message={alert.message} variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} />      
            <Routes>
                <Route index element={<DriverIndex customAlert={customAlert} />} />
                <Route path="profile" element={<DriverProfile customAlert={customAlert} />} />
                <Route path="dashboard" element={<DriverDashboard />} />
                <Route path="viewride" element={<ViewRide customAlert={customAlert} />} />
            </Routes>
            <Outlet />
        </>
    )
}

export default Driver;