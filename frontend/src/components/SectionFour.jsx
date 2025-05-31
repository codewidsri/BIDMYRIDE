import { Box, Button, CardMedia, Container, Grid, Typography } from "@mui/material";

function SectionFour() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                        <Grid size={6}>
                            <CardMedia component={'img'} height={350} image="/three.jpg" sx={{ margin: '10px', borderRadius: '20px' }} />
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>Safety for all</Typography>
                            <Typography variant="h6" gutterBottom>At BidMyRide your safety is out priority. We're dedicated to making every ride safe and comfortable</Typography>
                            <Button sx={{ fontSize: '20px' , fontWeight:'bolder'}}>Know More</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionFour;