import { Container, Box, Grid, CardMedia, Typography } from "@mui/material";

function SectionFive() {
    return (
        <>
            <Container sx={{ marginTop: '5%'}}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}> 
                        <Grid size={6}>
                            <Grid size={12}>
                                <Typography variant="h4" sx={{fontWeight:'bolder'}}>Get Quick Rides</Typography>
                                <Typography variant="h4" gutterBottom sx={{fontWeight:'bolder'}}>Low Fares</Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="h6" gutterBottom>In BidMyRide we ensure our customer get rides quickly at the most affordable prices</Typography>
                            </Grid>
                        </Grid>
                        <Grid size={6}>
                            <Grid size={6} display={'flex'}>
                                <CardMedia component={'img'} image="/nine.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                                <CardMedia component={'img'} image="/eight.jpeg" sx={{margin:'10px', borderRadius:'20px'}}/>
                            </Grid>
                            <Grid size={6} display={'flex'}>
                                <CardMedia component={'img'} image="/ten.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                                <CardMedia component={'img'} image="/eleven.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionFive;