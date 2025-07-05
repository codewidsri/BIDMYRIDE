import { Routes, Route, Outlet } from "react-router-dom"
import DriverProfile from './DriverProfile.jsx'
import DriverDashboard from './DriverDashboard.jsx'
import DriverIndex from "./DriverIndex.jsx";
import Navbar from "./NavBar.jsx";
import ViewRide from "./ViewRide.jsx";

function DriverHome() {

    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<DriverIndex />} />
                <Route path="profile" element={<DriverProfile />} />
                <Route path="dashboard" element={<DriverDashboard />} />
                <Route path="viewride" element={<ViewRide />} />
            </Routes>
            <Outlet />
        </>
    )
}

export default DriverHome;