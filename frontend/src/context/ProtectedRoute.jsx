import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {isAuthenticated} = useContext(AuthContext)
    return isAuthenticated ? children : <Navigate to='/riderlogin'/>
}
export default ProtectedRoute;