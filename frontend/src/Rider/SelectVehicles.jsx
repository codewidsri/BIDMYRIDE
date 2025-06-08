import { Box, Container, FormControl, RadioGroup, FormControlLabel, Radio, FormHelperText, Grid } from "@mui/material";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';

function SelectVehicles({ vehicle, setVehicle, error, setError }) {

  const handleChange = (event) => {
    setVehicle(event.target.value);
    setError(false);
  };

  return (
    <Container>
          <FormControl component="fieldset" error={error} fullWidth>
            <RadioGroup value={vehicle} onChange={handleChange}>
              <Grid container spacing={2} mt={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Grid size={4}>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="bike"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <DirectionsBikeIcon />
                          <span>Bike</span>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
                <Grid size={4}>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="auto"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <ElectricRickshawIcon />
                          <span>Auto</span>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
                <Grid size={4}>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="car"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <DirectionsCarIcon />
                          <span>Car</span>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup>
            {error && (
              <FormHelperText>Please select a vehicle before submitting.</FormHelperText>
            )}
          </FormControl>
    </Container>
  );
}

export default SelectVehicles;