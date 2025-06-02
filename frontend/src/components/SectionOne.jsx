import { Box, Container, Typography, Button, CardMedia, Grid } from "@mui/material"

function SectionOne() {
    return (<>
        <Container sx={{ marginTop: '5%' }}>
            <Box component='section'>
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid size={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>BidMyRide</Typography>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bolder' }}>Safer, better quality, and a city at your fingertips</Typography>
                        <Typography>Become a Driver and start earning</Typography>
                        <Button sx={{ padding: '15px', backgroundColor: 'ButtonText', color: 'white', marginTop: '20px', fontWeight: 'bold', borderRadius: '10px' }}>Drive with us</Button>
                    </Grid>
                    <Grid size={6}>
                        <CardMedia component={'img'} height={350} image="./home-hero.jpg" sx={{borderRadius:'20px'}}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>)
}

export default SectionOne;