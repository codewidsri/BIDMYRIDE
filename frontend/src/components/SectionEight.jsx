import { Container, Box, Grid, CardMedia, Typography, Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function SectionEight() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                        <Grid size={6}>
                            <Grid size={6} display={'flex'}>
                                <CardMedia component={'img'} image="./four.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                                <CardMedia component={'img'} image="./five.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                            </Grid>
                            <Grid size={6} display={'flex'}>
                                <CardMedia component={'img'} image="./six.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                                <CardMedia component={'img'} image="./seven.jpg" sx={{margin:'10px', borderRadius:'20px'}}/>
                            </Grid>
                        </Grid>
                        <Grid size={6}>
                            <Grid size={12}>
                                <Typography variant="h4" sx={{ fontWeight: 'bolder' }}>Flexible Hours & </Typography>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>High Earning</Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="h6" gutterBottom>Join as BidMyRide Captain and earn on your own terms. Driver whenever you want.</Typography>
                                <Button sx={{padding:'15px', backgroundColor:'ButtonText', color:'white',marginTop:'10px',fontWeight:'bold',borderRadius:'10px'}}>Start Earning &nbsp;<KeyboardDoubleArrowRightIcon /></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionEight;