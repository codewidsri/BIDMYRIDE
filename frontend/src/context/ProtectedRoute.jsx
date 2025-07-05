import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

function ProtectedRoute({ children, allowedrole }) {
    const { isAuthenticated, role, loading } = useContext(AuthContext)

    if (loading) return <Box sx={{width:'100dvw',height:'100dvh'}} display={'flex'} alignItems={'center'} justifyContent={'center'}><CircularProgress color="secondary" size={60} thickness={5} /></Box>
    if (!isAuthenticated) return <Navigate to={'/'} />
    if (role !== allowedrole) return <Navigate to={`/${role}login`} />

    return children;
}

export default ProtectedRoute;