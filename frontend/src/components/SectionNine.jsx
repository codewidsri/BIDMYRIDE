import { Container, Box, CardMedia, Grid, Typography, Button } from "@mui/material";

function SectionNine() {
    return (
        <>
            <Container sx={{ marginTop: "5%" }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                        <Grid size={6}>
                            <Typography variant="h4" fontWeight={'bolder'} gutterBottom>Peace of mind even when it comes to price</Typography>
                            <Typography variant="h6">You'll get your price for the trip. Once you order, no matter if there's traffic or not, the price of your trip wont increase.</Typography>
                            <Button sx={{ padding: '15px', backgroundColor: 'ButtonText', color: 'white', marginTop: '10px', fontWeight: 'bold', borderRadius: '10px' }}>Book a ride</Button>
                        </Grid>
                        <Grid size={6}>
                            <CardMedia component={'img'} image="./rates.jpg" sx={{ borderRadius: '20px' }} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionNine;