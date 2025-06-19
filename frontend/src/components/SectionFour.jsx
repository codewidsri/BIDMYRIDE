import { Container, Box, Typography, CardMedia, Grid, Button, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function SectionFour() {
    return (
        <Box component="section" sx={{ py: { xs: 4, md: 8 } }}>
            <Container>
                <Grid container spacing={4} display={'flex'} justifyContent={'center'} alignItems="center">
                    {/* Image Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ width: '100%', height: { xs: 250, sm: 350, md: 400 } }}>
                            <CardMedia
                                component="img"
                                image="./Airport-Fall.webp"
                                alt="Recent Activity"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '20px',
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Text & Button Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ maxWidth: 450 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Login to see your recent activity
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                View past trips, tailored suggestions, support resources, and more
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
                                Log in to your Account
                            </Button>
                            <MuiLink
                                component={Link}
                                to="/riderregister"
                                underline="hover"
                                sx={{ display: 'block', mt: 2, fontWeight: 500 }}
                            >
                                Don't have an account? Sign up
                            </MuiLink>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default SectionFour;