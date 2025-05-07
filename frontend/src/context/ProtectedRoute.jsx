import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {isAuthenticated} = useContext(AuthContext)
    return isAuthenticated ? children : <Navigate to='/login'/>
}
export default ProtectedRoute;