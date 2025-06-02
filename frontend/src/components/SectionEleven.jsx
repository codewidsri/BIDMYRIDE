import { Container, Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";

function SectionEleven() {
    return (
        <>
            <Container sx={{ marginTop: '5%' }}>
                <Box component={'section'}>
                    <Grid container spacing={5}>
                        <Grid size={6}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bolder" }}>Committed to Keeping you safe</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography sx={{fontSize:'18px'}}>We've created our services with safety in mind, down to every last details</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5} sx={{marginTop:'5%'}}>
                        <Grid size={4}>
                            <Card sx={{padding:'5%'}}>
                                <CardMedia component={'img'} image="./il_square_safety.svg" sx={{width:'25%'}}/>
                                <CardContent>
                                    <Typography fontWeight={'bolder'} gutterBottom sx={{marginTop:'5%',marginBottom:'5%'}}>Safety Button</Typography>
                                    <Typography>Add a reliable contact to receive notification every time you travel,share your real-time location or contact emergencies</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card sx={{padding:'5%'}}>
                                <CardMedia component={'img'} image="./il_square_location_sharing.svg" sx={{width:'25%'}}/>
                                <CardContent>
                                    <Typography fontWeight={'bolder'} gutterBottom sx={{marginTop:'5%',marginBottom:'5%'}}>Journey Tracking</Typography>
                                    <Typography>Each Journey is tracked and you can share your route in real-time so your friends and family know where you are</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card sx={{padding:'5%'}}>
                                <CardMedia component={'img'} image="./il_square_chat_alt.svg" sx={{width:'25%'}}/>
                                <CardContent>
                                    <Typography fontWeight={'bolder'} gutterBottom sx={{marginTop:'5%',marginBottom:'5%'}}>We're here for you</Typography>
                                    <Typography>Our customer support team is here to help you and answer any questions you might have</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SectionEleven;