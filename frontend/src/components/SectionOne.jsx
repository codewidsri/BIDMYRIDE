import { Box, Container, Typography, Button, CardMedia, Grid } from "@mui/material";

function SectionOne() {
    return (
        <Container>
            <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
                <Grid container spacing={4} display={'flex'} justifyContent={'center'} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            BidMyRide
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Safer, better quality, and a city at your fingertips
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Become a Driver and start earning
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold',
                                borderRadius: '12px',
                                backgroundColor: '#000', // Use a solid color you prefer
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#333', // Slightly lighter on hover
                                },
                            }}
                        >
                            Drive with us
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CardMedia
                            component="img"
                            image="./home-hero.jpg"
                            alt="Home Hero"
                            sx={{
                                height: { xs: 300, sm: 350, md: 400 },
                                borderRadius: '20px',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SectionOne;