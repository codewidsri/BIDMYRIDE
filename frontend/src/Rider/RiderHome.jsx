import { Routes, Route, Outlet, Link } from "react-router-dom"
import RiderDashboard from "./RiderDashboard.jsx"
import RiderProfile from "./RiderProfile.jsx"
import RiderIndex from "./RiderIndex.jsx"
import Navbar from "./NavBar.jsx"
import { AuthContext } from "../context/AuthContextProvider.jsx";
import Socket from "../context/Socket.js";
import { useContext, useEffect } from 'react';

function RiderHome() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const riderid = user._id;
    Socket.emit('rider:join', { riderid })
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<RiderIndex />} />
        <Route path="profile" element={<RiderProfile />} />
        <Route path="dashboard" element={<RiderDashboard />} />
      </Routes>
      <Outlet />
    </>
  )
}
export default RiderHome
