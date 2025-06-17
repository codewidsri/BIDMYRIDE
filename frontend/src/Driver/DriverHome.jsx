import { Routes, Route, Outlet } from "react-router-dom"
import DriverProfile from './DriverProfile.jsx'
import DriverDashboard from './DriverDashboard.jsx'
import DriverIndex from "./DriverIndex.jsx";
import Navbar from "./NavBar.jsx";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import Socket from "../context/Socket.js";
import { useEffect, useContext } from "react";

function DriverHome() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const driverid = user._id;
        Socket.emit("driver:join", { driverid })
    }, [])

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