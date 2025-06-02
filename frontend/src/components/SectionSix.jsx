import { Container, Box, Typography, Grid, Button } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Form, InputGroup } from "react-bootstrap";

function SectionSix() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: "bolder" }}>Plan for later</Typography>
                    <Grid container spacing={5} sx={{ padding: '5%',marginTop:'3%', backgroundImage: 'url("./two.png")', borderRadius: '25px', backgroundAttachment: 'scroll', backgroundPosition: 'center' }}>
                        <Grid size={7}>
                            <Box component={'div'}>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bolder" }}>Get your ride right with BidMyRide Reserve</Typography>
                                <Typography variant="h6">Choose date and time</Typography>
                                <Grid container spacing={5} marginTop={'5%'}>
                                    <Grid size={6}>
                                        <InputGroup>
                                            <InputGroup.Text><CalendarMonthIcon /></InputGroup.Text>
                                            <Form.Control type="date" />
                                        </InputGroup>
                                    </Grid>
                                    <Grid size={6}>
                                        <InputGroup>
                                            <InputGroup.Text><AccessTimeFilledIcon /></InputGroup.Text>
                                            <Form.Control type="time" />
                                        </InputGroup>
                                    </Grid>
                                </Grid>
                                <Button sx={{ padding: '15px', backgroundColor: 'GrayText', color: 'white', marginTop: '20px', fontWeight: 'bold', borderRadius: '10px', width:'100%' }}>Next</Button>
                            </Box>
                        </Grid>
                        <Grid size={5}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Benefits</Typography>
                            <Typography variant="body2" marginTop={'10px'}><CalendarTodayIcon />&nbsp;&nbsp;&nbsp;&nbsp;Choose your Exact pickup time up to 10 in advance</Typography>
                            <Typography variant="body2" marginTop={'10px'}><AccessTimeIcon />&nbsp;&nbsp;&nbsp;&nbsp;Extra wait time included to meet your ride</Typography>
                            <Typography variant="body2" marginTop={'10px'}><HighlightOffIcon />&nbsp;&nbsp;&nbsp;&nbsp;Cancel at no charge up to 60 mins in advance</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionSix;