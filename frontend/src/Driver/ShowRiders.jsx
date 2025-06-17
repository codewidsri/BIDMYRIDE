import { Container, Box, Grid } from "@mui/material"

function ShowRiders({ incommingfare }) {
    return (
        <>
            <Container>
                <Box>
                    <Grid container spacing={2}>
                        
                    </Grid>
                </Box>
            </Container>
            {incommingfare && incommingfare.map((rider, id) => (
                <h6>
                    {rider.ridername}
                    {rider.fare}
                    {rider.pickup}
                    {rider.dropoff}
                    {rider.distance}
                </h6>
            ))}
        </>
    )
}

export default ShowRiders;