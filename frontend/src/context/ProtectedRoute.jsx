import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedrole }) {
    const { isAuthenticated, role, loading } = useContext(AuthContext)

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>
    if (!isAuthenticated) return <Navigate to={'/'} />
    if (role !== allowedrole) return <Navigate to={`/${role}login`} />

    return children;
}

export default ProtectedRoute;