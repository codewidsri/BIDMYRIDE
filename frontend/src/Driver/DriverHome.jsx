import { Routes, Route, Outlet } from "react-router-dom"
import DriverProfile from './DriverProfile.jsx'
import DriverDashboard from './DriverDashboard.jsx'
import DriverIndex from "./DriverIndex.jsx";
import Navbar from "./NavBar.jsx";

function DriverHome() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<DriverIndex />} />
                <Route path="profile" element={<DriverProfile />} />
                <Route path="dashboard" element={<DriverDashboard />} />
            </Routes>
            <Outlet />
        </>
    )
}

export default DriverHome;