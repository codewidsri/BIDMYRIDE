import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

function RiderProfile({customAlert}) {
    const { user, dispatch } = useContext(AuthContext);

    const fallbackRider = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
    };

    const [profile, setProfile] = useState(fallbackRider);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(profile);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setProfile(form);
        setEditMode(false);
        try {
            const configuration = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND}/rider/updateprofile/${user._id}`, form, configuration);
            customAlert(response.data.message, "success")
            dispatch({ type: "loginsuccess", payload: { user: response.data.rider, role: "rider" } })
        } catch (error) {
            customAlert(error.response.data.message)
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card elevation={5} sx={{ borderRadius: 4 }}>
                <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, mb: 1 }}>
                            {profile.name[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold">
                            {profile.name.toUpperCase()}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Rider Profile
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        {/* Name */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Name:</strong> {profile.name}
                                </Typography>
                            )}
                        </Grid>

                        {/* Email */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Email:</strong> {profile.email}
                                </Typography>
                            )}
                        </Grid>

                        {/* Phone */}
                        <Grid item size={{ xs: 12 }}>
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
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
                                    name="address"
                                    label="Address"
                                    rows={3}
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Address:</strong> {profile.address}
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

export default RiderProfile;