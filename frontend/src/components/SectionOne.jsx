import { Box, Card, Container, Typography, CardContent, CardActions, Button, Paper, CardMedia, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';

function SectionOne() {
    const navigate = useNavigate()
    return (<>
        <Container sx={{ marginTop: '5%' }}>
            <Box component='section'>
                <Grid container sx={{ display: 'flex', padding: '5%', alignItems: 'center' }}>
                    <Grid size={6}>
                        <Typography variant="h3" sx={{ fontWeight: 'bolder' }}>BidMyRide</Typography>
                        <Typography variant="h6" gutterBottom>Safer, better quality, and a city at your fingertips</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Card variant="none">
                            <CardMedia component='img' image="/two.png" sx={{ borderRadius: '20px', width: '75%' }} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>Book Cabs, Bikes, Auto for your Comfortable and Affordable Price</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="contained" color="success" onClick={() => navigate('/riderlogin')}>Book a Ride &nbsp;<SendIcon /></Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={3}>
                        <Card variant="none">
                            <CardMedia component='img' image="/one.jpg" sx={{ borderRadius: '20px', width: '75%' }} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>Join with us to provide most Comfortable and Affordable Rides</Typography>
                            </CardContent>
                            <CardActions disableSpacing >
                                <Button variant="contained" color="success" onClick={() => navigate('/driverlogin')}>Bid a Ride &nbsp;<SendIcon /></Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>)
}

export default SectionOne;