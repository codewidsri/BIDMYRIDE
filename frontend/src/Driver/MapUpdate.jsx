import { Box, Container, Grid, Typography, Paper, FormControlLabel, Switch } from "@mui/material";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import { useState, useEffect } from "react";

function MapUpdate({ notify }) {
    const [available, setAvailable] = useState(false);
    const [loading, setLoading] = useState(false);

    async function HandleAvailability(event) {
        setLoading(true);
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/driver/changeavailability`, config);
            setAvailable(response.data.isavailable);
            notify(response.data.message, 'success');
        } catch (error) {
            notify(error.response?.data?.message || "An error occurred", 'danger');
        }
        setLoading(false);
    }

    async function RetrieveAvailability() {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/driver/retrieveavailability`, config);
            setAvailable(response.data.isavailable);
        } catch (error) {
            notify(error.response?.data?.message || "An error occurred", 'danger');
        }
    }

    useEffect(() => {
        RetrieveAvailability();
    }, []);

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ padding: 2, borderRadius: 3, margin: 2 }}>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid size={{ xs: 6 }}>
                        <Box
                            sx={{
                                backgroundColor: available ? '#4CAF50' : '#F44336',
                                padding: 1,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}
                        >
                            {available ? <CheckCircleIcon sx={{ mr: 1 }} /> : <CrisisAlertIcon sx={{ mr: 1 }} />}
                            {available ? 'Available' : 'Not Available'}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={available}
                                    onChange={HandleAvailability}
                                    color="success"
                                    disabled={loading}
                                />
                            }
                            label={
                                <Typography variant="body2" fontWeight="bold">
                                    Toggle Availability
                                </Typography>
                            }
                            labelPlacement="end"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default MapUpdate;