import { createContext, useEffect, useReducer } from "react";
import axios from 'axios'

const INITIAL_STATE = {
    user: null,
    role: null,
    isAuthenticated: false,
    error: null,
    loading: true
}

export const AuthContext = createContext();

function AuthReducer(state, action) {
    switch (action.type) {
        case "loginsuccess":
            return {
                user: action.payload.user, role: action.payload.role, isAuthenticated: true, error: null, loading: false
            }
        case "loginfailed":
            return {
                user: null, role: null, isAuthenticated: false, error: action.payload, loading: false
            }
        case "logout":
            return {
                user: null, role: null, isAuthenticated: false, error: null, loading: false
            }
        default:
            return state;
    }
}

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        async function verifyuser() {
            try {
                const driverresponse = await axios.get(`${import.meta.env.VITE_BACKEND}/driver/verify`, { withCredentials: true })
                dispatch({ type: 'loginsuccess', payload: { user: driverresponse.data.driver, role: 'driver' } })
            } catch (error) {
                try {
                    const riderresponse = await axios.get(`${import.meta.env.VITE_BACKEND}/rider/verify`, { withCredentials: true })
                    dispatch({ type: 'loginsuccess', payload: { user: riderresponse.data.rider, role: 'rider' } })
                } catch (error) {
                    dispatch({ type: "loginfailed", payload: "Authentication failed" });
                }
            }
        }
        verifyuser();
    }, [])

    return (
        <AuthContext.Provider value={{ 
            user: state.user, 
            role: state.role, 
            isAuthenticated: state.isAuthenticated, 
            error: state.error, 
            loading: state.loading, 
            dispatch 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;