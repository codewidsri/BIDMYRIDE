import { Container, Box, Paper, Grid, Button, Typography, TextField, Collapse, Alert, IconButton, FormControlLabel, Checkbox, Link, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

function DriverRegister() {
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
        latitude: '',
        vehicletype: '',
        capacity: '',
        vehiclenumber: ''
    })
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
    function HandleSubmit(e) {
        e.preventDefault();
        console.log(form)
    }
    return (
        <>
            <Container maxWidth='sm' sx={{ p: 3 }}>
                <Collapse in={open}>
                    <Alert severity={type} action={<IconButton onClick={() => setopen(false)}><CloseIcon></CloseIcon></IconButton>}>
                        {showerror}
                    </Alert>
                </Collapse>
                <Paper elevation={5}>
                    <Box component='form' onSubmit={HandleSubmit} sx={{ p: 4 }}>
                        <Typography variant='h5' gutterBottom align='center' sx={{ fontWeight: "bold" }}>Driver Registration</Typography>
                        <Grid container spacing={1}>
                            <Grid size={4}>
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
                            <Grid size={4}>
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
                            <Grid size={4}>
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
                            <Grid size={4}>
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
                            <Grid size={4}>
                                <FormControl required fullWidth margin="normal">
                                    <InputLabel margin="normal">Vehicle Type</InputLabel>
                                    <Select onChange={HandleChange} value={form.vehicletype} name="vehicletype" margin="normal">
                                        <MenuItem value={0}>Bike</MenuItem>
                                        <MenuItem value={1}>Auto</MenuItem>
                                        <MenuItem value={2}>Car</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={4}>
                                <TextField
                                    type="number"
                                    name="capacity"
                                    label="Vehicle Capacity"
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.capacity}
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
                            <Grid size={6}>
                                <TextField
                                    type="number"
                                    name="vehiclenumber"
                                    label="Vehicle Number"
                                    required
                                    fullWidth
                                    margin="normal"
                                    value={form.vehiclenumber}
                                    onChange={HandleChange}
                                />
                            </Grid>
                            <Grid size={6} display={'flex'} alignItems={'center'}>
                                <Button onClick={getLocation} fullWidth variant="contained" sx={{ padding: '15px' }}>Get My Location</Button>
                            </Grid>
                            <Grid size={12} display={'flex'} alignItems={'center'}>
                                <FormControlLabel control={<Checkbox onChange={() => setshowpassword(!showpassword)} />} required label='show password' />
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" color="success" fullWidth>Register</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component={'div'} display={'flex'} flexDirection={'column'} alignItems={'center'} padding={1}>
                        <Link component={'button'} onClick={() => navigate('/driverlogin')}>Have an Account? Log in</Link>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default DriverRegister