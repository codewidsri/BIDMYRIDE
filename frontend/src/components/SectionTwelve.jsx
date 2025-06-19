import { Box, Button, CardMedia, Container, Grid, Typography } from "@mui/material";

function SectionTwelve() {
    return (
        <Container sx={{ marginTop: '5%' }}>
            <Box component="section">
                <Grid container spacing={5} display={'flex'} justifyContent={'center'} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>
                            Safety for all
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            At BidMyRide, your safety is our priority. We're dedicated to making every ride safe and comfortable.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                mt: 2,
                                borderRadius: '10px',
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#333'
                                }
                            }}
                        >
                            Know More
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CardMedia
                            component="img"
                            image="/three.jpg"
                            sx={{
                                width: { xs: 380, sm: 400, md: 500, lg: 500 },
                                height: { xs: 200, sm: 300, md: 350 },
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

export default SectionTwelve;
