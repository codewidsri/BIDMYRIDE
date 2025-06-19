import { Container, Box, CardMedia, Grid, Typography, Button } from "@mui/material";

function SectionNine() {
    return (
        <Container sx={{ marginTop: "5%" }}>
            <Box component="section">
                <Grid container spacing={5} display={'flex'} justifyContent={'center'} alignItems="center">
                    {/* Text Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" fontWeight="bolder" gutterBottom>
                            Peace of mind even when it comes to price
                        </Typography>
                        <Typography variant="h6">
                            You'll get your price for the trip. Once you order, no matter if there's traffic or not, the price of your trip won't increase.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                padding: '12px 24px',
                                backgroundColor: 'black',
                                color: 'white',
                                marginTop: '16px',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: '#333'
                                }
                            }}
                        >
                            Book a ride
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <CardMedia
                            component="img"
                            image="./rates.jpg"
                            sx={{
                                width: '100',
                                height: { xs: 200, sm: 250, md: 300 },
                                borderRadius: '20px',
                                objectFit: 'cover'
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SectionNine;