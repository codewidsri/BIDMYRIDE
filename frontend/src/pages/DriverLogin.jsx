import { Container, Typography, Paper, Box, Button, FormControlLabel, TextField, Checkbox, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DriverLogin() {
    const [form, setform] = useState({ email: '', password: '' })
    const [showpassword, setshowpassword] = useState(false)
    const navigate= useNavigate();
    function HandleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    function HandleSubmit(e) {
        e.preventDefault();
    }
    return (
        <>
            <Container maxWidth='xs'>
                <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                    <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>Driver Login</Typography>
                    <Box component='form' onSubmit={HandleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            label='Email'
                            name="email"
                            type="email"
                            required
                            fullWidth
                            margin="normal"
                            value={form.email}
                            onChange={HandleChange}
                        />
                        <TextField
                            label='Password'
                            name="password"
                            type={showpassword ? 'text' : 'password'}
                            required
                            fullWidth
                            margin="normal"
                            value={form.password}
                            onChange={HandleChange}
                        />
                        <FormControlLabel control={<Checkbox onChange={() => setshowpassword(!showpassword)} />} label='show password' />
                        <Button type="submit" variant="contained" fullWidth>submit</Button>
                    </Box>
                    <Box component={'div'} display={'flex'} flexDirection={'column'} alignItems={'center'} padding={2}>
                        <Link component={'button'} onClick={() => navigate('/driverregister')}>Don't have an Account? Click here</Link>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default DriverLogin;