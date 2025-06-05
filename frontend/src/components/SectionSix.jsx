import { Container, Box, Typography, Grid, Button, TextField } from "@mui/material";
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from "react";

function SectionSix() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Date range limits for DatePicker
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(minDate.getDate() + 10);

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add form validation here
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
        // Proceed with next steps...
    };

    return (
        <Container sx={{ marginTop: '5%' }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Plan for later
                </Typography>

                <Grid
                    container
                    spacing={4}
                    sx={{
                        mt: 4,
                        p: { xs: 3, md: 6 },
                        borderRadius: 3,
                        // backgroundImage: 'url("./two.png")',
                        // backgroundPosition: 'center',
                        // backgroundRepeat: 'no-repeat',
                        // backgroundSize: 'cover',
                         backgroundColor:'#FFB22C'
                    }}
                >
                    {/* Left Section - Form */}
                    <Grid item xs={12} md={5}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Get your ride right with BidMyRide Reserve
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Choose date and time
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container spacing={3} mt={2}>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="Select Date"
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TimePicker
                                        label="Select Time"
                                        value={selectedTime}
                                        onChange={setSelectedTime}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </Grid>
                            </Grid>
                        </LocalizationProvider>

                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                mt: 4,
                                py: 1.5,
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                backgroundColor: '#555',
                                color: 'white',
                                '&:hover': { backgroundColor: '#333' }
                            }}
                            disabled={!selectedDate || !selectedTime} // disable until both selected
                        >
                            Next
                        </Button>
                    </Grid>

                    {/* Right Section - Benefits */}
                    <Grid item xs={12} md={7}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Benefits
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="body1" display="flex" alignItems="center" mt={2}>
                                <CalendarTodayIcon sx={{ mr: 2 }} />
                                Choose your exact pickup time up to 10 days in advance
                            </Typography>
                            <Typography variant="body1" display="flex" alignItems="center" mt={2}>
                                <AccessTimeIcon sx={{ mr: 2 }} />
                                Extra wait time included to meet your ride
                            </Typography>
                            <Typography variant="body1" display="flex" alignItems="center" mt={2}>
                                <HighlightOffIcon sx={{ mr: 2 }} />
                                Cancel at no charge up to 60 mins in advance
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SectionSix;
