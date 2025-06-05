import { Grid, Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box component="footer" sx={{ backgroundColor: 'black', color: 'whitesmoke', mt: '5%', px: '5%', py: '5%' }}>
            <Grid container spacing={5}>
                {/* Brand and Help Center */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>BidMyRide</Typography>
                    <Typography variant="body1">Visit Help Center</Typography>
                </Grid>

                {/* Footer Links */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={4}>
                        <Grid item xs={6} sm={3}>
                            <Typography sx={{ fontWeight: 'bold' }} gutterBottom>Company</Typography>
                            <Typography gutterBottom>About us</Typography>
                            <Typography gutterBottom>Our offerings</Typography>
                            <Typography gutterBottom>Newsroom</Typography>
                            <Typography gutterBottom>Investors</Typography>
                            <Typography gutterBottom>Blog</Typography>
                            <Typography gutterBottom>Careers</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography sx={{ fontWeight: 'bold' }} gutterBottom>Products</Typography>
                            <Typography gutterBottom>Ride</Typography>
                            <Typography gutterBottom>Drive</Typography>
                            <Typography gutterBottom>Giftcards</Typography>
                            <Typography gutterBottom>Health</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography sx={{ fontWeight: 'bold' }} gutterBottom>Global Citizenship</Typography>
                            <Typography gutterBottom>Safety</Typography>
                            <Typography gutterBottom>Sustainability</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography sx={{ fontWeight: 'bold' }} gutterBottom>Help Center</Typography>
                            <Typography gutterBottom>Riders</Typography>
                            <Typography gutterBottom>Drivers</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
