import { Paper,Typography } from "@mui/material";

function ViewOTP({ otp }) {
    return (
        <>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">Your Ride OTP</Typography>
                <Typography variant="h3" color="primary" fontWeight="bold">
                    {otp}
                </Typography>
            </Paper>
        </>
    )
}

export default ViewOTP;