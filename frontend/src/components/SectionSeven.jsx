import { Container, Box, Grid, CardMedia, Typography } from "@mui/material";

function SectionSeven() {
    return (
        <Container sx={{ marginTop: '5%' }}>
            <Box component="section">
                <Grid container spacing={5} display={'flex'} justifyContent={'center'} alignItems="center">
                    {/* Text Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ fontWeight: 'bolder' }}>
                            Get Quick Rides
                        </Typography>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>
                            Low Fares
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            In BidMyRide we ensure our customer get rides quickly at the most affordable prices
                        </Typography>
                    </Grid>

                    {/* Image Section */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} display={'flex'}>
                            {["/nine.jpg", "/eight.jpeg", "/ten.jpg", "/eleven.jpg"].map((src, index) => (
                                <Grid item xs={6} key={index}>
                                    <CardMedia
                                        component="img"
                                        image={src}
                                        sx={{
                                            width: { xs: 180, sm: 300, md: 400, lg: 250 },
                                            height: { xs: 140, sm: 180, md: 200 },
                                            borderRadius: '20px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SectionSeven;
