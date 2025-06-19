import { Container, Box, Typography, Grid, Card, CardMedia, CardActions, Button } from '@mui/material';

function SectionFive() {
    const services = [
        { label: "Bike", image: "/bike.webp" },
        { label: "Auto", image: "/auto.webp" },
        { label: "Cab", image: "/car.webp" },
    ];

    return (
        <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
            <Container>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Our Services
                </Typography>

                <Grid container spacing={4} display={'flex'} justifyContent={'center'} alignItems="center">
                    {services.map((service, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, padding: '8%' }}>
                                <CardMedia
                                    component="img"
                                    image={service.image}
                                    alt={service.label}
                                    sx={{ height: 200, objectFit: 'cover' }}
                                />
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="warning"
                                        sx={{ fontWeight: 'bold', px: 4 }}
                                    >
                                        {service.label}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default SectionFive;
