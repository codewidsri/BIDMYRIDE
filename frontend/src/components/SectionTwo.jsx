import { Box, Card, Container, Typography, CardContent, CardActions, Button, Paper, CardMedia } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';
function SectionTwo() {
    const navigate = useNavigate()
    return (<>
        <Container sx={{ padding: '10px', marginTop: '10px' }} maxWidth='lg'>
            <Box component='section'>
                <Paper elevation={5} maxWidth='lg' sx={{ display: 'flex', padding: '2%' }}>
                    <Card sx={{ maxWidth: '350px', padding: '2%', marginRight: '3%', height: 'fit-content' }} variant="none">
                        <CardMedia component='img' image="/two.png" height={200} />
                        <CardContent>
                            <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>Book Cabs, Bikes, Auto for your Comfortable and Affordable Price</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="outlined" color="success" onClick={() => navigate('/riderlogin')}>Book a Ride &nbsp;<SendIcon /></Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: '350px', padding: '2%', marginRight: '3%', height: 'fit-content' }} variant="none">
                        <CardMedia component='img' image="/one.jpg" />
                        <CardContent>
                            <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>Join with us to provide most Comfortable and Affordable Rides</Typography>
                        </CardContent>
                        <CardActions disableSpacing >
                            <Button variant="outlined" color="success" onClick={() => navigate('/driverlogin')}>Bid a Ride &nbsp;<SendIcon /></Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: '350px' }}>
                        <CardMedia component='img' image="/three.jpg" />
                        <CardContent>
                            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bolder' }}>Safer, better quality, and a city at your fingertips</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </Container>
    </>)
}

export default SectionTwo;