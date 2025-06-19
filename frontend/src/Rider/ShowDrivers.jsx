import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Grid, Typography, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import axios from "axios";

function ShowDrivers({ showdrivers, driverfares, pickup, dropoff, pickupCoords, dropoffCoords, vehicle, distance , notify}) {
  const { user } = useContext(AuthContext);

  async function handleAccept(driverid, fare, vehiclenumber) {
    try {
      const riderid = user._id;
      const configuration = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
      const datatosend = {
        riderid, driverid, pickup, dropoff, pickupCoords, dropoffCoords, distance, fare , vehicle, vehiclenumber
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/rider/bookride`, datatosend, configuration)
    } catch (error) {
        notify(error.response.data.message)
    }
  }

  return (
    <Container sx={{ mt: 8, mb: 6 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
        Available Drivers
      </Typography>

      {showdrivers && showdrivers.length > 0 ? (
        showdrivers.map((driver) => {
          const fare = driverfares?.[driver._id];
          return (
            <Card
              key={driver._id}
              sx={{
                mt: 4,
                borderRadius: 3,
                boxShadow: 6,
              }}
            >
              <CardContent>
                <Grid container spacing={3} alignItems="center">

                  {/* Driver Info */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}>
                        {driver.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {driver.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {driver.phone}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                      Vehicle: {driver.vehiclenumber}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      Capacity: {driver.capacity}
                    </Typography>
                  </Grid>

                  {/* Fare Display */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      p={2}
                      textAlign="center"
                      bgcolor="#f0f4ff"
                      borderRadius={2}
                      border="1px solid #90caf9"
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        {fare ? (
                          <>
                            <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                              ₹{fare}
                            </span>{" "}
                            offered by driver
                          </>
                        ) : (
                          <>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              "Waiting for fare..." <CircularProgress color="secondary" sx={{ marginLeft: 2 }} />
                            </Box>
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <CardActions sx={{ justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                      {
                        fare ? (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ minWidth: 100, fontWeight: "bold" }}
                              onClick={() => handleAccept(driver._id, fare, driver.vehiclenumber)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{ minWidth: 100, fontWeight: "bold" }}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <CircularProgress color="secondary" size={60} thickness={5} />
                        )
                      }
                    </CardActions>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Card sx={{ mt: 5, borderRadius: 2 }}>
          <CardContent>
            <Typography textAlign="center" color="error" variant="h6">
              No drivers near your location.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default ShowDrivers;