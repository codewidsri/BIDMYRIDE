import { Container, Grid, Box, TextField, Button, InputAdornment, List, ListItem, Typography, Paper } from "@mui/material";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from '@mui/icons-material/Explore';
import { useState } from 'react';
import ShowDriversAndVehicles from "./ShowDriversAndVehicles.jsx";
import axios from "axios";

function RiderMapForm({ pickup, setPickup, dropoff, setDropoff, pickupCoords, setPickupCoords, dropoffCoords, setDropoffCoords,setshowvehicles, notify }) {
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
    const [vehicle, setVehicle] = useState('');
    const [error, setError] = useState(false);

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
        } else {
            setDropoff(place.display_name);
            setDropoffCoords({ lat: place.lat, lng: place.lon });
            setDropoffSuggestions([]);
        }
    };

    async function HandleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/rider/searchvehicles`, {
                params: {
                    pickupCoords,
                    vehicle
                }
            })
            setshowvehicles(response.data.drivers)
            notify("vehicles retrieved","success")
        } catch (error) {
            notify(error.response.data.message,'danger');
        }
    };

    return (
        <Container sx={{ padding: '1%' }} maxWidth='lg'>

            <Box component={'form'} onSubmit={HandleSubmit}>

                <Grid container spacing={3} alignItems="flex-start" justifyContent="center">

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

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
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
                            <ExploreIcon sx={{ mr: 1 }} />
                            Search
                        </Button>
                    </Grid>

                </Grid>

            </Box>

            <ShowDriversAndVehicles
                vehicle={vehicle}
                setVehicle={setVehicle}
                error={error}
                setError={setError}
            />

        </Container>
    );
}

export default RiderMapForm;