import { Container, Box, Grid, CardMedia, Typography,Button } from "@mui/material";

function SectionTen() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                        <Grid size={6}>
                            <CardMedia component={'img'} image="./home-mediaimage.jpg" sx={{ borderRadius: '20px', maxHeight: '53dvh' }} />
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h4" fontWeight={'bolder'} gutterBottom>A new concept of corporate transport</Typography>
                            <Typography variant="h6">Your employees or clients will travel in the safest, quickest way there is. From one simple platform, control all your cost, follow all journey in real-time and set price, time and zone limits.</Typography>
                            <Button sx={{ padding: '15px', backgroundColor: 'ButtonText', color: 'white', marginTop: '10px', fontWeight: 'bold', borderRadius: '10px' }}>Start your Journey with us</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionTen;