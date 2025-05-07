import { Container, Box, Card, Typography, CardMedia, CardActions, Button } from '@mui/material'

function SectionThree() {
    return (<>
        <Container sx={{ padding: '10px', marginTop: '10px' }} maxWidth='lg'>
            <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>Our Services</Typography>
            <Box component='section' sx={{ display: 'flex' }} alignItems='center' display='flex' justifyContent='center'>
                <Card sx={{ maxWidth: '25%', padding: '2%', margin: '2%' }}>
                    <CardMedia component='img' image='/bike.webp' />
                    <CardActions disableSpacing>
                        <Button size='large' variant='outlined' color='warning'>Bike</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: '25%', padding: '2%', margin: '2%' }}>
                    <CardMedia component='img' image='/auto.webp' />
                    <CardActions disableSpacing>
                        <Button size='large' variant='outlined' color='warning'>Auto</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: '25%', padding: '2%', margin: '2%' }}>
                    <CardMedia component='img' image='/car.webp' />
                    <CardActions disableSpacing>
                        <Button size='large' variant='outlined' color='warning'>Cab</Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    </>)
}

export default SectionThree;