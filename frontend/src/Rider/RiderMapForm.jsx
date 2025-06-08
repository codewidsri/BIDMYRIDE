import { Container, Grid, Box, TextField, Button, InputAdornment, List, ListItem, Typography, Paper } from "@mui/material";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useEffect, useState } from 'react';
import axios from "axios";
import SelectVehicles from "./SelectVehicles.jsx";

function RiderMapForm({ pickup, setPickup, dropoff, setDropoff, pickupCoords, setPickupCoords, dropoffCoords, setDropoffCoords, distance, setshowdrivers, notify }) {
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState(false);
    const [fare, setfare] = useState('')

    const handleAddressChange = async (type, value) => {
        if (type === 'pickup')
            setPickup(value);
        else
            setDropoff(value);

        if (value.length > 2) {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=10&q=${value}`
            );
            const data = await res.json();
            if (type === 'pickup')
                setPickupSuggestions(data);
            else
                setDropoffSuggestions(data);
        } else {
            if (type === 'pickup')
                setPickupSuggestions([]);
            else
                setDropoffSuggestions([]);
        }
    };

    const handleSelectSuggestion = (type, place) => {
        if (type === 'pickup') {
            setPickup(place.display_name);
            setPickupCoords({ lat: place.lat, lng: place.lon });
            setPickupSuggestions([]);
            localStorage.setItem('pickupplace', place.display_name)
            localStorage.setItem('pickupcoords', JSON.stringify({ lat: place.lat, lng: place.lon }))
        } else {
            setDropoff(place.display_name);
            setDropoffCoords({ lat: place.lat, lng: place.lon });
            setDropoffSuggestions([]);
            localStorage.setItem('dropoffplace', place.display_name)
            localStorage.setItem('dropoffcoords', JSON.stringify({ lat: place.lat, lng: place.lon }))
        }
    };

    async function HandleSubmit() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/rider/searchvehicles`, {
                params: {
                    pickupCoords,
                    vehicle
                }
            })
            setshowdrivers(response.data.drivers)
            notify("vehicles retrieved", "success")
        } catch (error) {
            notify(error.response.data.message, 'danger');
        }
    }

    function getPickupDropoff() {
        const pickupplace = localStorage.getItem('pickupplace') || null;
        const dropoffplace = localStorage.getItem('dropoffplace') || null;
        const pickupcoord = localStorage.getItem('pickupcoords') || null;
        const dropoffcoord = localStorage.getItem('dropoffcoords') || null;
        if (pickupcoord && dropoffcoord) {
            setPickup(pickupplace)
            setDropoff(dropoffplace)
            setPickupCoords(JSON.parse(pickupcoord))
            setDropoffCoords(JSON.parse(dropoffcoord))
        }
    }

    useEffect(() => {
        getPickupDropoff();
    }, [])

    useEffect(() => {
        if (pickup && dropoff && vehicle && pickupCoords && dropoffCoords) {
            HandleSubmit();
        }
    }, [pickup, dropoff, vehicle, pickupCoords, dropoffCoords]);

    return (
        <Container sx={{ padding: '1%' }} maxWidth='lg'>

            <Box component={'form'}>

                <Grid container spacing={3} alignItems="center" justifyContent="center">

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Pick-Up Location"
                            margin="normal"
                            value={pickup}
                            onChange={(e) => handleAddressChange('pickup', e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GpsFixedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {pickupSuggestions.length > 0 && (
                            <Paper elevation={3}>
                                <List dense>
                                    {pickupSuggestions.map((s, i) => (
                                        <ListItem
                                            key={i}
                                            button
                                            onClick={() => handleSelectSuggestion('pickup', s)}
                                        >
                                            <Typography variant="body2">{s.display_name}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Drop-Off Location"
                            margin="normal"
                            value={dropoff}
                            onChange={(e) => handleAddressChange('dropoff', e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {dropoffSuggestions.length > 0 && (
                            <Paper elevation={3}>
                                <List dense>
                                    {dropoffSuggestions.map((s, i) => (
                                        <ListItem
                                            key={i}
                                            button
                                            onClick={() => handleSelectSuggestion('dropoff', s)}
                                        >
                                            <Typography variant="body2">{s.display_name}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }} >
                        <SelectVehicles
                            vehicle={vehicle}
                            setVehicle={setVehicle}
                            error={error}
                            setError={setError}
                        />
                    </Grid>

                </Grid>

            </Box>

            <Box>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid size={{xs:4}}>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            label="Distance in KM"
                            value={distance}
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <StraightenIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Recommended-Fare"
                            margin="normal"
                            value={fare}
                            onChange={(e) => setfare(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CurrencyRupeeIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.5,
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#333',
                                },
                            }}
                        >
                            <SendIcon sx={{ mr: 1 }} />
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
}

export default RiderMapForm;