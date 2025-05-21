import { Container, Box, Typography, Paper, Button, TextField, Collapse, Alert, IconButton, Grid, FormControlLabel, Checkbox, Link } from "@mui/material";
import { ToastContainer, ToastBody, Toast } from 'react-bootstrap'
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function RiderRegister() {
    const navigate = useNavigate()
    const [open, setopen] = useState(false)
    const [showerror, setshowerror] = useState('')
    const [type, settype] = useState('')
    const [showpassword, setshowpassword] = useState(false)
    const [form, setform] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        longitude: '',
        latitude: ''
    });

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setform((prev) => ({ ...prev, longitude: position.coords.longitude, latitude: position.coords.latitude }))
                setshowerror("location data is retrieved successfully")
                setopen(true)
                settype('success')
            }, (error) => {
                setshowerror(error)
                setopen(true);
                settype('info')
            })
        } else {
            setshowerror("location is not supported by the browser please use another one")
            setopen(true);
            settype('error')
        }
    }

    function HandleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value })
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
            }
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/rider/register`, datatosend)
        } catch (error) {

        }
    }

    return (
        <>
            <ToastContainer position="top-center" className="p-3">
                <Toast bg="info" show={show} onClose={() => setshow(!show)} delay={4000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <ToastBody>{message}</ToastBody>
                </Toast>
            </ToastContainer>
            <Container maxWidth='sm' sx={{ p: 3 }}>
                <Collapse in={open}>
                    <Alert severity={type} action={<IconButton onClick={() => setopen(false)}><CloseIcon></CloseIcon></IconButton>}>
                        {showerror}
                    </Alert>
                </Collapse>
                <Paper elevation={5}>
                    <Box component='form' onSubmit={HandleSubmit} sx={{ p: 4 }}>
                        <Typography variant='h5' gutterBottom align='center' sx={{ fontWeight: "bold" }}>Rider Registration</Typography>
                        <Grid container spacing={1}>
                            <Grid size={6}>
                                <TextField
                                    type="text"
                                    name="name"
                                    label="Name"
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.name}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    type="email"
                                    name="email"
                                    label="Email"
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.email}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    type="number"
                                    name="phone"
                                    label='Phone'
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.phone}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    type={showpassword ? 'text' : 'password'}
                                    name="password"
                                    label='Password'
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.password}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    type="text"
                                    name="address"
                                    label='Address'
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.address}
                                    onChange={HandleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Button onClick={getLocation} fullWidth variant="outlined">Get My Location</Button>
                                <FormControlLabel control={<Checkbox onChange={() => setshowpassword(!showpassword)} />} label='show password' />
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" color="success" fullWidth>Register</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component={'div'} display={'flex'} flexDirection={'column'} alignItems={'center'} padding={1}>
                        <Link component={'button'} onClick={() => navigate('/riderlogin')}>Have an Account? Log in</Link>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default RiderRegister;