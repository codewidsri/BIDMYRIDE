import { Container, Box, Typography, Paper, Button, TextField, Collapse, Alert, IconButton, Grid, FormControlLabel, Checkbox, Link as MuiLink } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function RiderRegister() {
    const navigate = useNavigate();

    const [open, setopen] = useState(false);
    const [error, seterror] = useState('');
    const [errortype, seterrortype] = useState('');

    const [showpassword, setshowpassword] = useState(false);
    const [form, setform] = useState({
        name: '', email: '', phone: '', password: '',
        address: '', longitude: '', latitude: ''
    });

    const HandleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const getLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setform(prev => ({
                        ...prev,
                        longitude: pos.coords.longitude,
                        latitude: pos.coords.latitude
                    }));
                    seterror("Location data retrieved successfully");
                    seterrortype("success");
                    setopen(true);
                },
                (err) => {
                    seterror("Failed to get location");
                    seterrortype("info");
                    setopen(true);
                }
            );
        } else {
            seterror("Geolocation not supported in this browser.");
            seterrortype("error");
            setopen(true);
        }
    };

    const HandleSubmit = async (e) => {
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
            }
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/rider/register`, datatosend, {
                headers: { 'Content-Type': 'application/json' }
            });
            setopen(true);
            seterror(response.data.message);
            seterrortype("success");
            setTimeout(() => navigate('/riderlogin'), 3000);
        } catch (err) {
            setopen(true);
            seterror(err.response?.data?.message || "Something went wrong");
            seterrortype("error");
        }
    };

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
                        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                            Rider Registration
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth required label="Name" name="name" value={form.name} onChange={HandleChange} />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth required label="Email" type="email" name="email" value={form.email} onChange={HandleChange} />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth required label="Phone" type="number" name="phone" value={form.phone} onChange={HandleChange} />
                            </Grid>
                            <Grid item size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Password"
                                    type={showpassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid item size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    required
                                    multiline
                                    rows={4}
                                    label="Address"
                                    name="address"
                                    value={form.address}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid item size={{ xs: 12 }}>
                                <Button onClick={getLocation} variant="outlined" fullWidth sx={{ py: 1.5 }}>
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
                                <Button type="submit" variant="contained" color="success" fullWidth sx={{ py: 1.5 }}>
                                    Register
                                </Button>
                            </Grid>
                            <Grid item size={{ xs: 12 }} textAlign="center">
                                <MuiLink component={Link} to="/riderlogin" underline="hover">
                                    Already have an account? Log in
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default RiderRegister;