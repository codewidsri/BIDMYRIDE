import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useState, useRef } from 'react';
import Socket from "../context/Socket.js";

function EnterOtp({ rideid, customAlert ,setride}) {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return; // allow only single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    async function handleSubmit() {
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            try {
                const datatosend = { rideid, enteredOtp }
                const response = await axios.post(`${import.meta.env.VITE_BACKEND}/driver/verifyotp`, datatosend, configuration);
                localStorage.setItem('ride', JSON.stringify(response.data.ride))
                customAlert("OTP verified", "success")
                setride(response.data.ride)
                Socket.emit("driver:ridestarted", { riderid: response.data.ride.riderId })
            } catch (error) {
                customAlert(error.response.data.message, "error")
            }
        }
    };

    return (
        <Box textAlign="center" p={3}>
            <Typography variant="h6" mb={2}>
                Enter 4-Digit OTP
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {otp.map((digit, i) => (
                    <Grid size={3} key={i}>
                        <TextField
                            inputRef={(el) => (inputRefs.current[i] = el)}
                            value={digit}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: '1.5rem' },
                            }}
                            sx={{ width: '60px' }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                sx={{ mt: 3, px: 5 }}
                onClick={handleSubmit}
                disabled={otp.some((digit) => digit === '')}
            >
                Submit OTP
            </Button>
        </Box>
    );
}

export default EnterOtp;