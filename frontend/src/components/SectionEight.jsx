import { Container, Box, Grid, CardMedia, Typography, Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function SectionEight() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} justifyContent={'center'} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" sx={{ fontWeight: 'bolder' }}>Flexible Hours & </Typography>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>High Earning</Typography>
                            <Typography variant="h6" gutterBottom>Join as BidMyRide Captain and earn on your own terms. Driver whenever you want.</Typography>
                            <Button sx={{ padding: '15px', backgroundColor: 'ButtonText', color: 'white', marginTop: '10px', fontWeight: 'bold', borderRadius: '10px' }}>Start Earning &nbsp;<KeyboardDoubleArrowRightIcon /></Button>
                        </Grid>
                        {/* Image Section */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} display={'flex'}>
                                {["/four.jpg", "/five.jpg", "/six.jpg", "/seven.jpg"].map((src, index) => (
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
        </>
    )
}

export default SectionEight;