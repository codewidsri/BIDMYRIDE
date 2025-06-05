import { Container, Typography, Box, Button, Paper, TextField, FormControlLabel, Checkbox, Link } from '@mui/material'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContextProvider';

function RiderLogin() {
    const { dispatch } = useContext(AuthContext);
    const [form, setform] = useState({ email: '', password: '' })
    const [showpassword, setshowpassword] = useState(false)
    const [show, setshow] = useState(false);
    const [showmessage, setshowmessage] = useState('')
    const [showmessagetype, setshowmessagetype] = useState('')

    const navigate = useNavigate();

    function HandleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/rider/login`, form, configuration);
            setshow(true)
            setshowmessage(response.data.message)
            setshowmessagetype('success')
            dispatch({ type: "loginsuccess", payload: { user: response.data.rider, role: 'rider' } })
            setTimeout(() => {
                navigate('/rider/')
            }, 2000);
        } catch (error) {
            setshow(true)
            setshowmessage(error.response.data.message)
            setshowmessagetype("danger")
        }
    }

    return (<>
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
                    <Link component={'button'} onClick={() => navigate('/driverlogin')}>Want to Join with us</Link>
                </Box>
            </Paper>
        </Container>
    </>)
}

export default RiderLogin;