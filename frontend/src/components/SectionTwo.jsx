import { Container, Paper, Grid, TextField, Button, Box } from "@mui/material"
import ExploreIcon from '@mui/icons-material/Explore';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
function SectionTwo() {
    function HandleChange(e){
        e.preventDefault();
    }
    return (<>
        <Container sx={{ marginTop: '5%'}}>
            <Paper elevation={1}>
                <Box component={'form'} onSubmit={HandleChange}>
                    <Grid container spacing={5} sx={{ padding: '5%' }}>
                        <Grid size={4} display={'flex'} alignItems={'flex-end'}>
                            <GpsFixedIcon sx={{ mr: 1, my: 3 }} />
                            <TextField
                                type="text"
                                name="pickup"
                                variant="outlined"
                                label="Enter Pickup Location"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={4} display={'flex'} alignItems={'flex-end'}>
                            <LocationOnIcon sx={{ mr: 1, my: 3 }} />
                            <TextField
                                type="text"
                                name="drop"
                                variant="outlined"
                                label="Enter Drop Location"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Button variant="contained" color="warning" >Search &nbsp;<ExploreIcon fontSize="large" /></Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    </>)
}

export default SectionTwo;