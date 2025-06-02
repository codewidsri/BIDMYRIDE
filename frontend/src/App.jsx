import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RiderLogin from './pages/RiderLogin.jsx'
import RiderRegister from './pages/RiderRegister.jsx'
import DriverLogin from './pages/DriverLogin.jsx';
import DriverRegister from './pages/DriverRegister.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/riderlogin' element={<RiderLogin />} />
      <Route path='/riderregister' element={<RiderRegister />} />
      <Route path='/driverlogin' element={<DriverLogin />} />
      <Route path='/driverregister' element={<DriverRegister />} />
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App