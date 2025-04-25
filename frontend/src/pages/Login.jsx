import {Container,Typography,Box,Button,Paper,TextField, FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react';
function Login(){
    const [form,setform] = useState({email : '', password : ''})
    const [showpassword,setshowpassword]=useState(false)
    function HandleChange(e){
        setform({...form,[e.target.name]:e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault()
    }
    return (<>
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 15 }}>
                <Typography variant='h5' gutterBottom align='center' sx={{fontWeight: "bold",textTransform: 'uppercase'}}>Login</Typography>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                     <FormControlLabel control={<Checkbox onChange={()=>setshowpassword(!showpassword)} />} label="show password" />
                    <Button type='submit' variant='contained' fullWidth>submit</Button>
                </Box>
            </Paper>
        </Container>
    </>)
}
export default Login;