
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid , Card, CardContent,} from '@mui/material';
import axios from 'axios';

const CropRecommendation = () => {
  const [inputs, setInputs] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [error, setError] = useState('');
  const [crops, setCrops] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value || '',
    }));
  };

  const fetchCrops = async () => {
    setError('');
    try {
      const { N, P, K, temperature, humidity, ph, rainfall } = inputs;
      const response = await axios.post('http://localhost:8080/recommendationCrop', {
        N, P, K, temperature, humidity, ph, rainfall,
      });
      console.log('API Response:', response.data);
      setCrops([response.data.predicted_crop]);
    } catch (error) {
      console.error('Error fetching crops:', error);
      setError(error.response?.data?.detail || 'Failed to fetch crop recommendations.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCrops();
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4">Crop Recommendation System</Typography>
      <br></br><br></br>
      <form style={styles.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {['N', 'P', 'K'].map((label) => (
            <Grid item xs={4} key={label}>
              <TextField
                label={label}
                variant="outlined"
                type="number"
                name={label}
                value={inputs[label]}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {['temperature', 'humidity'].map((label) => (
            <Grid item xs={6} key={label}>
              <TextField
                label={label}
                variant="outlined"
                type="number"
                name={label}
                value={inputs[label]}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {['ph', 'rainfall'].map((label) => (
            <Grid item xs={6} key={label}>
              <TextField
                label={label}
                variant="outlined"
                type="number"
                name={label}
                value={inputs[label]}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" color="primary" type="submit" sx={styles.button}>
          Get Recommendation
        </Button>

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
      </form>
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
    maxWidth: '600px',
    margin: 'auto',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  card: {
    padding: 1,
    width:'max-content',
    textAlign: 'center',
    borderColor: '#B9E5E8',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '8px',
  },
};

export default CropRecommendation;
