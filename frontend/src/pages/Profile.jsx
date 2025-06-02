import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

function Profile() {
    const { user, isAuthenticated } = useContext(AuthContext);
    return (
        <h1>profile</h1>
    )
}

export default Profile;