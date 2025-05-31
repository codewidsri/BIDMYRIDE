import { Container, Box, Typography, Grid, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";

function SectionSeven() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                        <Grid size={6}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>Drive when you want, make what you need</Typography>
                            <Typography variant="h6" gutterBottom>Make money on your Schedule with deliveries or rides- or both.</Typography>
                            <Button sx={{ padding: '15px', backgroundColor: 'ButtonText', color: 'white', marginTop: '10px',fontWeight:'bold',borderRadius:'10px' }}>Get Started</Button>
                            <Link to={'/driverlogin'} className="d-block my-3">Already have an account? Sign in</Link>
                        </Grid>
                        <Grid size={6}>
                            <CardMedia component={'img'} image="./earner-illustra.webp" sx={{ margin: '10px', borderRadius: '20px', maxHeight: '53dvh' }} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionSeven;