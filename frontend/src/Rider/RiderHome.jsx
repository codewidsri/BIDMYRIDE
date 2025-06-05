import { Routes, Route, Outlet, Link } from "react-router-dom"
import RiderDashboard from "./RiderDashboard.jsx"
import RiderProfile from "./RiderProfile.jsx"
import RiderIndex from "./RiderIndex.jsx"
import Navbar from "./NavBar.jsx"

function RiderHome() {
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
