import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

const CropPrediction = () => {
  const [location, setLocation] = useState({
    state: '',
    district: '',
  });
  const API_KEY = 'f0f7ec7e13f54b2ca24dd0db3b977cb4';
  const [useManualInput, setUseManualInput] = useState(false);
  const [season, setSeason] = useState('');
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocationData = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`
        );
        const { state, county } = response.data.results[0].components;
        setLocation({ state, district: county });
      } catch (error) {
        console.error('Failed to fetch location data:', error);
      }
    };

    if (!useManualInput && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationData(latitude, longitude);
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  }, [useManualInput]);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const fetchCrops = async () => {
    const { state, district } = location;
    setLoading(true);
    setError('');
    console.log(`URL: http://localhost:8080/predict`);
    console.log('Sending to API:', { state, district, season });
    try {
      const response = await axios.post(`http://localhost:8080/predict`, {
        state,
        district,
        season,
      });
      setCrops(response.data.predicted_crops_with_max_probability || []);
    } catch (error) {
      console.error('Error fetching crops:', error);
      setError(error.response?.data?.detail || 'Failed to fetch crop recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!season) {
      setError('Please select a season.');
      return;
    }
    fetchCrops();
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4">Crop Prediction System</Typography>
      <br />
      <br />
      <form onSubmit={handleSubmit} style={styles.form}>
        <FormControlLabel
          control={
            <Checkbox
              checked={useManualInput}
              onChange={() => setUseManualInput(!useManualInput)}
            />
          }
          label="Use Manual Input"
        />
        <TextField
          label="State"
          name="state"
          value={location.state}
          onChange={handleLocationChange}
          disabled={!useManualInput}
          placeholder="Enter state"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="District"
          name="district"
          value={location.district}
          onChange={handleLocationChange}
          disabled={!useManualInput}
          placeholder="Enter district"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Select Season</InputLabel>
          <Select
            value={season}
            onChange={handleSeasonChange}
            label="Select Season"
          >
            <MenuItem value="">--Select Season--</MenuItem>
            <MenuItem value="Kharif">Kharif</MenuItem>
            <MenuItem value="Rabi">Rabi</MenuItem>
            <MenuItem value="Zaid">Zaid</MenuItem>
            <MenuItem value="Autumn">Autumn</MenuItem>
            <MenuItem value="Summer">Summer</MenuItem>
            <MenuItem value="Winter">Winter</MenuItem>
            <MenuItem value="Whole Year">Whole Year</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit" sx={styles.button} disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Crops'}
        </Button>
      </form>

      {error && <Typography color="error">{error}</Typography>}

      {crops.length > 0 && (
        <Box sx={styles.result}>
          <Typography variant="h6">Recommended Crops:</Typography>
          <Grid container spacing={1} sx={{ marginTop: 2 }}>
            {crops.map((crop, index) => (
              <Grid item xs={8} sm={3} md={3} key={index}>
                <Card variant="outlined" sx={styles.card}>
                  <CardContent style={{background:'#DFF2EB'}}>
                    <Typography variant="h5">{crop}</Typography>
                    {/* You can add more details or images about the crop here */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

const styles = {
  container: {
    background:'#DFF2EB',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
    maxWidth: '400px',
    margin: 'auto',
  },
  button: {
    width: '100%',
    marginTop: '20px',
  },
  result: {
    marginTop: '20px',
    textAlign: 'left',
    
  },
  card: {
    padding: 1,
    textAlign: 'center',
    borderColor: '#B9E5E8',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '8px',
  },
};

export default CropPrediction;
