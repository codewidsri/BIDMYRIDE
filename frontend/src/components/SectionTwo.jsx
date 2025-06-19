import { Container, Grid, Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import ExploreIcon from '@mui/icons-material/Explore';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapComponent from "./MapComponent";

function SectionTwo() {
    function HandleChange(e) {
        e.preventDefault();
    }
    return (
        <Container>
            <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
                <Box component="form" onSubmit={HandleChange}>
                    <Grid container spacing={4} display={'flex'} justifyContent={'center'} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <MapComponent />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Go Anywhere with us
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Pick-Up Location"
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GpsFixedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Drop-Off Location"
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    borderRadius: '10px',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#333',
                                    },
                                }}
                            >
                                <ExploreIcon sx={{ mr: 1 }} />
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SectionTwo;