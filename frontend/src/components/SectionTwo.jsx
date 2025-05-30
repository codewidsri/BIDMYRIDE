import { Container, Grid, Box, Typography, Button } from "@mui/material"
import { Form, InputGroup } from 'react-bootstrap'
import ExploreIcon from '@mui/icons-material/Explore';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapComponent from "./MapComponent";

function SectionTwo() {
    function HandleChange(e) {
        e.preventDefault();
    }
    return (<>
        <Container sx={{ marginTop: '5%' }}>
            <Box component={'form'} onSubmit={HandleChange}>
                <Grid container spacing={5} display={'flex'} alignItems={'center'}>
                    <Grid size={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bolder' }}>Go Anywhere with BidMyRide</Typography>
                        <InputGroup className="mb-5">
                            <InputGroup.Text><GpsFixedIcon /></InputGroup.Text>
                            <Form.Control type="text" placeholder="PickUpLocation" size="lg" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><LocationOnIcon /></InputGroup.Text>
                            <Form.Control type="text" placeholder="DropOffLocation" size="lg" />
                        </InputGroup>
                        <Button sx={{ padding: '10px', backgroundColor: 'ButtonText', color: 'wheat', marginTop: '10px',fontWeight:'bold' }} fullWidth><ExploreIcon />&nbsp;Search</Button>
                    </Grid>
                    <Grid size={6}>
                        <MapComponent />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>)
}

export default SectionTwo;