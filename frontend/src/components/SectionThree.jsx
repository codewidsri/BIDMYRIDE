import { Container, Box, Typography, Grid, CardMedia, Button, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function SectionThree() {
    return (
        <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
            <Container>
                <Grid container spacing={4} display={'flex'} justifyContent={'center'} alignItems="center">
                    {/* Text Section */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ maxWidth: 650 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Drive when you want, make what you need
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Make money on your schedule with deliveries or rides — or both.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    borderRadius: '10px',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#333',
                                    },
                                }}
                            >
                                Get Started
                            </Button>

                            <MuiLink
                                component={Link}
                                to="/driverlogin"
                                underline="hover"
                                sx={{ display: 'block', mt: 2, fontWeight: 500 }}
                            >
                                Already have an account? Sign in
                            </MuiLink>
                        </Box>
                    </Grid>

                    {/* Image Section */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ width: '100%', height: { xs: 300, sm: 400, md: 450 } }}>
                            <CardMedia
                                component="img"
                                image="./earner-illustra.webp"
                                alt="Driver Illustration"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '20px',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default SectionThree;