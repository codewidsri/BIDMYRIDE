import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import axios from 'axios';
import Socket from '../context/Socket.js';
import { useTheme } from '@mui/material/styles';

function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    async function Logout() {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND}/driver/logout`, user, { withCredentials: true });
            if (Socket && Socket.connected) Socket.disconnect();
            dispatch({ type: 'logout' });
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    BIDMYRIDE
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} to="/driver/" onClick={handleMenuClose}>Home</MenuItem>
                            <MenuItem component={Link} to="/driver/profile" onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem component={Link} to="/driver/dashboard" onClick={handleMenuClose}>Dashboard</MenuItem>
                            <MenuItem onClick={() => { handleMenuClose(); Logout(); }}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/driver/">Home</Button>
                        <Button color="inherit" component={Link} to="/driver/profile">Profile</Button>
                        <Button color="inherit" component={Link} to="/driver/dashboard">Dashboard</Button>
                        <Button onClick={Logout} sx={{
                            fontWeight: 'bold',
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                            color: '#000',
                            ml: 2,
                            '&:hover': { backgroundColor: '#ccc' },
                        }}>
                            Logout
                        </Button>
                    </>
                )}

                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                        <Avatar sx={{ bgcolor: '#673ab7', mr: 1 }}>
                            {user.name?.[0]?.toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle1" noWrap>
                            {user.name}
                        </Typography>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;