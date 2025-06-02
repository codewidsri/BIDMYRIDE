import { Container, Typography, Box, Button, Paper, TextField, FormControlLabel, Checkbox, Link } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RiderLogin() {
    const [form, setform] = useState({ email: '', password: '' })
    const [showpassword, setshowpassword] = useState(false)
    const navigate = useNavigate();

    function HandleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response= await axios.post(`${import.meta.env.VITE_BACKEND}/driver/login`,form);
        } catch (error) {
            
        }
    }

    return (<>
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                <Typography variant='h5' gutterBottom align='center' sx={{ fontWeight: "bold" }}>Rider Login</Typography>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        label='Email'
                        name='email'
                        type='email'
                        required
                        fullWidth
                        margin='normal'
                        value={form.email}
                        onChange={HandleChange}
                    />
                    <TextField
                        label='Passoword'
                        name='password'
                        type={showpassword ? 'text' : 'password'}
                        required
                        fullWidth
                        margin='normal'
                        value={form.password}
                        onChange={HandleChange}
                    />
                    <FormControlLabel control={<Checkbox onChange={() => setshowpassword(!showpassword)} />} label="show password" />
                    <Button type='submit' variant='contained' fullWidth>submit</Button>
                </Box>
                <Box component={'div'} display={'flex'} flexDirection={'column'} alignItems={'center'} padding={2}>
                    <Link component={'button'} onClick={() => navigate('/riderregister')}>Don't have an Account? Click here</Link>
                    or
                    <Link component={'button'} onClick={() => navigate('/driverregister')}>Want to Join with us</Link>
                </Box>
            </Paper>
        </Container>
    </>)
}

export default RiderLogin;