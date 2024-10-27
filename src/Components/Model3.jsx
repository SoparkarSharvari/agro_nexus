// src/YieldPrediction.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    District:'',
    cropYear: '',
    area: '',
  });

  const [yieldValue, setYieldValue] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { area, production } = formData;

    if (area > 0 && production >= 0) {
      const yieldResult = production / area;
      setYieldValue(yieldResult.toFixed(2)); // Round to 2 decimal places
    } else {
      alert('Please enter valid positive values for Area and Production.');
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4">Yield Prediction System</Typography>

      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          label="District"
          name="District"
          value={formData.District}
          onChange={handleChange}
          placeholder="Enter District"
          required
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Crop Year"
          name="cropYear"
          type="number"
          value={formData.cropYear}
          onChange={handleChange}
          placeholder="Enter crop year"
          required
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Area (in hectares)"
          name="area"
          type="number"
          value={formData.area}
          onChange={handleChange}
          placeholder="Enter area"
          required
          variant="outlined"
          fullWidth
          margin="normal"
        />

        

        <Button variant="contained" type="submit" sx={styles.button}>
          Predict Yield
        </Button>
      </form>

      {yieldValue !== null && (
        <Box sx={styles.result}>
          <Card variant="outlined" sx={styles.card}>
            <CardContent style={{background:'#DFF2EB'}}>
                    <Typography variant="h6">Yield: {yieldValue} metric tons per hectare</Typography>
                      {/* You can add more details or images about the crop here */}
                    </CardContent>
                   </Card> 
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
    width:'max-content',
    textAlign: 'center',
    borderColor: '#B9E5E8',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '8px',
  },
};

export default YieldPrediction;
