import { useContext, useState } from "react";
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, MenuItem, Select, TextField, Typography, } from "@mui/material";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

function DriverProfile({ customAlert }) {
    const { user, dispatch } = useContext(AuthContext);
    const profile = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        vehiclenumber: user.vehiclenumber,
        vehicletype: user.vehicletype,
        capacity: user.capacity,
    };

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setEditMode(false);
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND}/driver/updateprofile/${user._id}`, form, configuration);
            customAlert(response.data.message, "success")
            dispatch({ type: "loginsuccess", payload: { user: response.data.driver, role: "driver" } })
        } catch (error) {
            customAlert(error.response.data.message)
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card elevation={4}>
                <CardContent>
                    <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
                        <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
                            {profile.name[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold">
                            {profile.name.toUpperCase()}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Driver Profile
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        {/* Name */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField fullWidth name="name" label="Name" value={form.name} onChange={handleChange} />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Name:</strong> {profile.name}
                                </Typography>
                            )}
                        </Grid>

                        {/* Email */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Email:</strong> {profile.email}
                                </Typography>
                            )}
                        </Grid>

                        {/* Phone */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField fullWidth name="phone" label="Phone" value={form.phone} onChange={handleChange} />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Phone:</strong> {profile.phone}
                                </Typography>
                            )}
                        </Grid>

                        {/* Address */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    name="address"
                                    label="Address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Address:</strong> {profile.address}
                                </Typography>
                            )}
                        </Grid>

                        {/* Vehicle Type */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <Select fullWidth name="vehicletype" value={form.vehicletype} onChange={handleChange}>
                                    <MenuItem value="bike">Bike</MenuItem>
                                    <MenuItem value="car">Car</MenuItem>
                                    <MenuItem value="auto">Auto</MenuItem>
                                </Select>
                            ) : (
                                <Typography variant="body1">
                                    <strong>Vehicle Type:</strong> {profile.vehicletype}
                                </Typography>
                            )}
                        </Grid>

                        {/* Vehicle Number */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    name="vehiclenumber"
                                    label="Vehicle Number"
                                    value={form.vehiclenumber}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Vehicle Number:</strong> {profile.vehiclenumber}
                                </Typography>
                            )}
                        </Grid>

                        {/* Capacity */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    name="capacity"
                                    label="Capacity"
                                    value={form.capacity}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Capacity:</strong> {profile.capacity}
                                </Typography>
                            )}
                        </Grid>

                        {/* Buttons */}
                        <Grid item size={{ xs: 12 }} display="flex" justifyContent="center" gap={2}>
                            {editMode ? (
                                <>
                                    <Button variant="contained" color="success" onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button variant="contained" onClick={() => setEditMode(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default DriverProfile;