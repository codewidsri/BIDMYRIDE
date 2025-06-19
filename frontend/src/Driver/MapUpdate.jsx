import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import { useState, useEffect } from "react";

function MapUpdate({ notify }) {
    const [available, setavailable] = useState(false);

    async function HandleAvailablity() {
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/driver/changeavailability`, configuration);
            setavailable(response.data.isavailable);
            notify(response.data.message, 'success');
        } catch (error) {
            notify(error.response?.data?.message || "An error occurred", 'danger');
        }
    }

    async function RetrieveAvailability() {
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/driver/retrieveavailability`, configuration);
            setavailable(response.data.isavailable);
        } catch (error) {
            notify(error.response?.data?.message || "An error occurred", 'danger');
        }
    }

    useEffect(() => {
        RetrieveAvailability();
    }, []);

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ padding: 2, m: 1, borderRadius: 3 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {/* Availability Status */}
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundColor: available ? '#4CAF50' : '#F44336',
                                padding: 1,
                                borderRadius: 2,
                                textAlign: 'center',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.1rem'
                            }}
                        >
                            {available ? <CheckCircleIcon sx={{ mr: 1 }} /> : <CrisisAlertIcon sx={{ mr: 1 }} />}
                            {available ? 'You are Available' : 'You are Not Available'}
                        </Box>
                    </Grid>

                    {/* Button */}
                    <Grid item xs={12}>
                        <Button
                            onClick={HandleAvailablity}
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976D2',
                                color: '#fff',
                                borderRadius: 2,
                                fontWeight: 'bold',
                                paddingY: 1,
                                '&:hover': {
                                    backgroundColor: '#125ea4'
                                }
                            }}
                        >
                            Toggle Availability
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default MapUpdate;