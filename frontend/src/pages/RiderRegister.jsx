import { Container, Box, Typography, Paper, Button, TextField, Collapse, Alert, IconButton, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Toast, ToastContainer } from 'react-bootstrap'

function RiderRegister() {
    const navigate = useNavigate()

    const [open, setopen] = useState(false)
    const [error, seterror] = useState('')
    const [errortype, seterrortype] = useState('')

    const [show, setshow] = useState(false);
    const [showmessage, setshowmessage] = useState('')
    const [showmessagetype, setshowmessagetype] = useState('')

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
                seterror("location data is retrieved successfully")
                setopen(true)
                seterrortype('success')
            }, (error) => {
                seterror(error)
                setopen(true);
                seterrortype('info')
            })
        } else {
            seterror("location is not supported by the browser please use another one")
            setopen(true);
            seterrortype('error')
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
            const configuration = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/rider/register`, datatosend, configuration)
            setshow(true)
            setshowmessage(response.data.message)
            setshowmessagetype('success')
            setTimeout(() => {
                navigate('/riderlogin')
            }, 3000);
        } catch (error) {
            setshow(true)
            setshowmessage(error.response.data.message)
            setshowmessagetype("danger")
        }
    }

    return (
        <>
            <ToastContainer position="top-center" className="p-3 m-3">
                <Toast bg={showmessagetype} show={show} onClose={() => setshow(!show)} delay={5000} autohide className="text-white">
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body className="text-center">
                        {showmessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <Container maxWidth='sm' sx={{ p: 2 }}>
                <Collapse in={open}>
                    <Alert severity={errortype} action={<IconButton onClick={() => setopen(false)}><CloseIcon /></IconButton>}>
                        {error}
                    </Alert>
                </Collapse>
                <Paper elevation={5}>
                    <Box component='form' onSubmit={HandleSubmit} sx={{ p: 3 }}>
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
                                <Button onClick={getLocation} fullWidth variant="contained">Get My Location</Button>
                                <FormControlLabel control={<Checkbox onChange={() => setshowpassword(!showpassword)} />} label='show password' />
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" color="success" fullWidth>Register</Button>
                            </Grid>
                        </Grid>
                        <Link className="d-block text-center" to={'/riderlogin'}>Have an Account? Log in</Link>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default RiderRegister;