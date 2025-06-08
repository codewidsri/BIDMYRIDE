import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import { useState,useEffect } from "react";

function MapUpdate({ notify }) {
    const [available, setavailable] = useState(false)

    async function HandleAvailablity() {
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/driver/changeavailability`, configuration)
            setavailable(response.data.isavailable)
            notify(response.data.message, 'success')
        } catch (error) {
            notify(error.response.data.message, 'danger')
        }
    }

     useEffect(()=>{
        HandleAvailablity();
    },[])

    return (
        <>
            <Container>
                <Box sx={{ padding: 2, margin: 1 }}>
                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Typography
                                sx={{
                                    backgroundColor: available ? '#5D8736' : '#F93827',
                                    textAlign: 'center',
                                    padding: '5px',
                                    borderRadius: 12,
                                    color: 'white'
                                }}
                            >
                                {available ? <CheckCircleIcon /> : <CrisisAlertIcon />}
                                &nbsp;&nbsp;
                                {available ? 'Available' : 'Not Available'}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Button
                                sx={{
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    backgroundColor: '#000',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#333'
                                    }
                                }}
                                fullWidth
                                onClick={HandleAvailablity}
                            >
                                Change Availability
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </>
    )
}

export default MapUpdate;