import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import axios from 'axios';

function Navbar() {
    const {user, dispatch } = useContext(AuthContext)
    async function Logout(){
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/driver/logout`,user,{ withCredentials: true })
            dispatch({type:'logout'})
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    BIDMYRIDE
                </Typography>
                <Button color="inherit" component={Link} to="/driver/">Home</Button>
                <Button color="inherit" component={Link} to="/driver/profile">Profile</Button>
                <Button color="inherit" component={Link} to="/driver/dashboard">Dashboard</Button>
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        backgroundColor: '#000', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#333',
                        },
                    }}
                    onClick={Logout}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;