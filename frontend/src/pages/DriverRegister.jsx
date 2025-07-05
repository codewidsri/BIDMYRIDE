import { Container, Box, Paper, Grid, Button, Typography, TextField, Collapse, Alert, IconButton, FormControlLabel, Checkbox, Link, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function DriverRegister() {
    const navigate = useNavigate();

    const [open, setopen] = useState(false);
    const [error, seterror] = useState('');
    const [errortype, seterrortype] = useState('');

    const [showpassword, setshowpassword] = useState(false);

    const [form, setform] = useState({
        name: '', email: '', phone: '', password: '', address: '',
        longitude: '', latitude: '', vehicletype: '', vehiclenumber: '', capacity: ''
    });

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setform(prev => ({
                    ...prev,
                    longitude: pos.coords.longitude,
                    latitude: pos.coords.latitude
                }));
                seterror("Location retrieved successfully.");
                seterrortype("success");
                setopen(true);
            }, (err) => {
                seterror("Failed to get location.");
                seterrortype("info");
                setopen(true);
            });
        } else {
            seterror("Geolocation is not supported in your browser.");
            seterrortype("error");
            setopen(true);
        }
    }

    function HandleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    async function HandleSubmit(e) {
        e.preventDefault();
        const datatosend = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            address: form.address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(form.longitude), parseFloat(form.latitude)]
            },
            vehicletype: form.vehicletype,
            vehiclenumber: form.vehiclenumber,
            capacity: form.capacity
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/driver/register`, datatosend, {
                headers: { 'Content-Type': 'application/json' }
            });
            setopen(true);
            seterror(response.data.message);
            seterrortype('success');
            setTimeout(() => navigate('/driverlogin'), 3000);
        } catch (error) {
            setopen(true);
            seterror(error.response.data.message);
            seterrortype("danger");
        }
    }

    return (
        <>

            <Container maxWidth="md" sx={{ p: 2 }}>
                <Collapse in={open}>
                    <Alert severity={errortype} action={<IconButton onClick={() => setopen(false)}><CloseIcon /></IconButton>}>
                        {error}
                    </Alert>
                </Collapse>

                <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <Box component="form" onSubmit={HandleSubmit}>
                        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                            Driver Registration
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField fullWidth label="Name" name="name" value={form.name} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField fullWidth label="Email" type="email" name="email" value={form.email} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField fullWidth label="Phone" type="number" name="phone" value={form.phone} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField fullWidth label="Password" type={showpassword ? 'text' : 'password'} name="password" value={form.password} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                                <FormControl fullWidth required>
                                    <InputLabel>Vehicle Type</InputLabel>
                                    <Select name="vehicletype" value={form.vehicletype} onChange={HandleChange} label="Vehicle Type">
                                        <MenuItem value="bike">Bike</MenuItem>
                                        <MenuItem value="auto">Auto</MenuItem>
                                        <MenuItem value="car">Car</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField fullWidth label="Vehicle Capacity" type="number" name="capacity" value={form.capacity} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12 }}>
                                <TextField fullWidth multiline rows={3} label="Address" name="address" value={form.address} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Vehicle Number" name="vehiclenumber" value={form.vehiclenumber} onChange={HandleChange} required />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6 }} display="flex" alignItems="center">
                                <Button fullWidth onClick={getLocation} variant="outlined" sx={{ py: 1.5 }}>
                                    Get My Location
                                </Button>
                            </Grid>
                            <Grid item size={{ xs: 12 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={showpassword} onChange={() => setshowpassword(!showpassword)} />}
                                    label="Show Password"
                                />
                            </Grid>
                            <Grid item size={{ xs: 12 }}>
                                <Button fullWidth type="submit" variant="contained" color="success" sx={{ py: 1.5 }}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>

                        <Box mt={2} textAlign="center">
                            <Link component="button" onClick={() => navigate('/driverlogin')}>
                                Have an Account? Login
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default DriverRegister;