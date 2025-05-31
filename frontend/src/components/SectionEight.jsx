import { Container, Box, Typography, CardMedia, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

function SectionEight() {
    return (
        <>
            <Container sx={{ marginTop: "5%" }}>
                <Box component={'section'}>
                    <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                        <Grid size={6}>
                            <CardMedia component={'img'} image="./Airport-Fall.webp" sx={{ marginTop: '10px', borderRadius: '20px' }} />
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>Login to see your recent activity</Typography>
                            <Typography variant="h6">View past trips, tailored suggestions, support resources, and more</Typography>
                            <Button sx={{ padding: '15px', backgroundColor: 'ButtonText', color: 'white', marginTop: '10px', fontWeight: 'bold', borderRadius: '10px' }}>Log in to your Account</Button>
                            <Link to={'/riderregister'} className="d-block my-3">Don't have account? sign up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionEight;