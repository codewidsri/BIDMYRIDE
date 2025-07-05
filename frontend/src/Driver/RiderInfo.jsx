import { Card, CardContent, Typography, Grid, Box, Button, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Socket from "../context/Socket.js";

const RiderInfo = ({ rider, acceptedride }) => {

    const { ridername, fare, pickup, dropoff, distance, riderid } = rider;

    const [bidAmount, setBidAmount] = useState("");

    const { user } = useContext(AuthContext);

    const accepted = acceptedride?.[riderid] || null;

    const handleSendBid = () => {
        if (!bidAmount || isNaN(bidAmount)) return;
        const driverid = user._id;
        Socket.emit("driver:sendfare", {
            driverid,
            riderid,
            fare: parseFloat(bidAmount),
        });
    };

    function handleAccept() {
        const driverid = user._id;
        Socket.emit('driver:acceptedfare', { driverid, riderid, fare })
    }

    return (
        <Card
            sx={{
                maxWidth: 650,
                margin: "20px auto",
                borderRadius: 3,
                boxShadow: 5,
                backgroundColor: "#f7f9fc",
                p: 2,
            }}
            key={riderid}
        >
            <CardContent>
                <Grid container spacing={2}>
                    {/* Rider Name */}
                    <Grid size={{ xs: 12 }}>
                        <Box display="flex" alignItems="center">
                            <PersonIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">{ridername}</Typography>
                        </Box>
                    </Grid>

                    {/* Fare and Distance */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box display="flex" alignItems="center">
                            <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                            <Typography variant="body1" fontWeight={500}>
                                Fare: ₹{fare}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box display="flex" alignItems="center">
                            <DirectionsIcon color="info" sx={{ mr: 1 }} />
                            <Typography variant="body1" fontWeight={500}>
                                Distance: {distance} km
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Pickup & Dropoff */}
                    <Grid size={{ xs: 12 }}>
                        <Box display="flex" alignItems="center">
                            <LocationOnIcon color="error" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                <strong>Pickup:</strong> {pickup}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Box display="flex" alignItems="center">
                            <LocationOnIcon color="secondary" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                <strong>Drop-off:</strong> {dropoff}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Bid Input */}
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField
                            fullWidth
                            label="Enter Your Fare"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            type="number"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSendBid}
                            sx={{ height: "100%" }}
                        >
                            Send Bid
                        </Button>
                    </Grid>

                    {/* Accept & Reject */}
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant={accepted ? "contained" : "outlined"}
                            color="success"
                            fullWidth
                            sx={{ fontWeight: "bold" }}
                            onClick={handleAccept}
                            disabled={accepted ? true : false}
                        >
                            {accepted ? "Accepted" : "Accept"}
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            sx={{ fontWeight: "bold" }}
                            disabled={accepted ? true : false}
                        >
                            Reject
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RiderInfo;