import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

function RiderProfile() {
    const {user}= useContext(AuthContext)
    return (
        <>
            <h1>{user.name}, {user.email}, {user._id} </h1>        
        </>
    )
}

export default RiderProfile;