import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { deepPurple } from '@mui/material/colors';

function ShowDrivers({ showdrivers }) {
    return (
        <>
            <Container sx={{ mt: 10 }}>
                <Box>
                    <Typography variant="h5">Available Drivers : </Typography>
                    {
                        showdrivers ? showdrivers.map((driver, i) => (
                            <Card sx={{ mt: 5 }} key={i}>
                                <CardContent>
                                    <Grid container alignItems={'center'}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Typography variant="p" fontWeight={'bold'} display={'block'}><Avatar sx={{ bgcolor: deepPurple[500] }}>{driver.name[0]}</Avatar>{driver.name}</Typography>
                                            <Typography variant="p" fontWeight={'bold'} display={'block'}>{driver.phone}</Typography>
                                            <Typography variant="p" fontWeight={'bold'} display={'block'}>{driver.vehiclenumber}</Typography>
                                            <Typography variant="p" fontWeight={'bold'} display={'block'}> <b>Capacity : </b> {driver.capacity}</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Grid container>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Button variant="outlined" color="success">Accept</Button>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Button variant="outlined" color="error">Reject</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )) : (
                            <Card sx={{ mt: 5 }}>
                                <CardContent>
                                    <Typography textAlign={'center'} color="error" variant="h5">NO DRIVERS NEAR BY YOURS</Typography>
                                </CardContent>
                            </Card>
                        )
                    }
                </Box>
            </Container>
        </>
    )
}

export default ShowDrivers;