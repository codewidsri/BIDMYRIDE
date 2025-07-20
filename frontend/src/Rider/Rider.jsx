import { Routes, Route, Outlet } from "react-router-dom"
import RiderDashboard from "./RiderDashboard.jsx"
import RiderProfile from "./RiderProfile.jsx"
import RiderIndex from "./RiderIndex.jsx"
import Navbar from "./NavBar.jsx"
import ViewRide from "./ViewRide.jsx"
import CustomAlert from "../components/CustomAlert.jsx";
import { useState } from "react"

function Rider() {

  const [alert, setAlert] = useState({ open: false, message: '', variant: 'success' });
  const customAlert = (message, variant = 'info') => {
    setAlert({ open: true, message, variant });
  };

  return (
    <>
      <Navbar />
      <CustomAlert open={alert.open} message={alert.message} variant={alert.variant} onClose={() => setAlert({ ...alert, open: false })} />
      <Routes>
        <Route index element={<RiderIndex customAlert={customAlert} />} />
        <Route path="profile" element={<RiderProfile customAlert={customAlert} />} />
        <Route path="dashboard" element={<RiderDashboard />} />
        <Route path="viewride" element={<ViewRide customAlert={customAlert} />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default Rider