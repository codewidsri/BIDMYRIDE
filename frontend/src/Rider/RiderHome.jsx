import { Routes, Route, Outlet } from "react-router-dom"
import RiderDashboard from "./RiderDashboard.jsx"
import RiderProfile from "./RiderProfile.jsx"
import RiderIndex from "./RiderIndex.jsx"
import Navbar from "./NavBar.jsx"
import ViewRide from "./ViewRide.jsx"

function RiderHome() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<RiderIndex />} />
        <Route path="profile" element={<RiderProfile />} />
        <Route path="dashboard" element={<RiderDashboard />} />
        <Route path="viewride" element={<ViewRide />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default RiderHome