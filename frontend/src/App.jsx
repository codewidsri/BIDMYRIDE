import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RiderLogin from './pages/RiderLogin.jsx'
import RiderRegister from './pages/RiderRegister.jsx'
import DriverLogin from './pages/DriverLogin.jsx';
import DriverRegister from './pages/DriverRegister.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import RiderHome from './Rider/RiderHome.jsx';
import DriverHome from './Driver/DriverHome.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/riderlogin' element={<RiderLogin />} />
      <Route path='/riderregister' element={<RiderRegister />} />
      <Route path='/driverlogin' element={<DriverLogin />} />
      <Route path='/driverregister' element={<DriverRegister />} />
      <Route path='/rider/*' element={
        <ProtectedRoute allowedrole={'rider'}>
          <RiderHome />
        </ProtectedRoute>
      } />
      <Route path='/driver/*' element={
        <ProtectedRoute allowedrole={'driver'}>
          <DriverHome />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App