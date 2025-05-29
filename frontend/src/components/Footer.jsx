import { Grid, Box, Typography } from "@mui/material";

function Footer() {
    return (
        <>
            <Box component={'section'} sx={{ backgroundColor: 'black', color: 'whitesmoke', marginTop: '5%', padding: '5%' }}>
                <Grid container spacing={5}>
                    <Grid size={12}>
                        <Typography variant="h5" gutterBottom>BidMyRide</Typography>
                        <Typography variant="body1">visit Help center</Typography>
                    </Grid>
                    <Grid size={12} marginTop={'5%'} display={'flex'}>
                        <Grid size={3}>
                            <Typography component={'p'} gutterBottom sx={{ fontWeight: 'bold' }}>Company</Typography>
                            <Typography component={'p'} gutterBottom >About us</Typography>
                            <Typography component={'p'} gutterBottom >Our offerings</Typography>
                            <Typography component={'p'} gutterBottom >Newsroom</Typography>
                            <Typography component={'p'} gutterBottom >Investors</Typography>
                            <Typography component={'p'} gutterBottom >Blog</Typography>
                            <Typography component={'p'} gutterBottom >Careers</Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography component={'p'} gutterBottom sx={{ fontWeight: 'bold' }}>Products</Typography>
                            <Typography component={'p'} gutterBottom >Ride</Typography>
                            <Typography component={'p'} gutterBottom >Drive</Typography>
                            <Typography component={'p'} gutterBottom >Giftcards</Typography>
                            <Typography component={'p'} gutterBottom >Health</Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography component={'p'} gutterBottom sx={{ fontWeight: 'bold' }}>Global citizenship</Typography>
                            <Typography component={'p'} gutterBottom >Safety</Typography>
                            <Typography component={'p'} gutterBottom >Sustainablity</Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography component={'p'} gutterBottom sx={{ fontWeight: 'bold' }}>Help center</Typography>
                            <Typography component={'p'} gutterBottom >Riders</Typography>
                            <Typography component={'p'} gutterBottom >Drivers</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Footer;