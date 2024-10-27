import * as React from 'react';
import { Link ,Grid ,Paper} from '@mui/material';

// import styled from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Item = styled(Paper)(({ theme }) => ({
    margin:'20px',
    height:'max-content',
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

export default function Footer() {

    const styleFooter = {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        textAlign: 'center',
      };
    
  return (
    <div style={styleFooter}>
    <h1>Models Provided</h1>
    <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={2}>
  <Grid item xs={4}>
          <Item>
            <h2 style={{fontSize:'30px',color:'black'}}>Crop Recommendation</h2>
            <p>
              This model provides crop recommendations based on soil and environmental 
              conditions. It suggests the best crop to grow based on nitrogen (N), 
              phosphorus (P), potassium (K), temperature, humidity, pH, and rainfall.
            </p>
            <p><b>Use Case:</b> Helps farmers select the most suitable crop, optimizing resources and improving yields.</p>
            <p><b>Algorithm:</b> Random Forest </p>
            <Link to="/crop-recommendation">
              <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Learn More</button>
            </Link>
          </Item>
     </Grid>
     <Grid item xs={4}>
          <Item>
            <h2 style={{fontSize:'30px',color:'black'}}>Crop Prediction</h2>
            <p>
              This model predicts the crop likely to be grown in a specific region based 
              on the state, district, and season. It helps identify regional crop patterns.
            </p>
            <p><b>Use Case:</b> Assists agricultural agencies in forecasting crop trends and managing supply chains.</p>
            <p><b>Algorithms:</b> Decision Trees </p>
            <Link to="/crop-prediction">
              <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Learn More</button>
            </Link>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <h1 style={{fontSize:'30px',color:'black'}}>Yield Prediction</h1>
            <p>
              This model forecasts the crop yield based on historical data, such as 
              the area under cultivation, crop year, and total production. It helps 
              in yield optimization and policy planning.
            </p>
            <p><b>Use Case:</b> Aids policymakers and farmers in planning for food security and optimizing practices.</p>
            <p><b>Algorithms:</b> Random Forest</p>
            <Link to="/yield-prediction">
              <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Learn More</button>
            </Link>
          </Item>
        </Grid>
  </Grid>
</Box>
    </div>
  );
}

