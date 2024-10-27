import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const API_KEY = 'f0f7ec7e13f54b2ca24dd0db3b977cb4';  // Replace with your OpenCage API key

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState('Fetching location...');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Get user's latitude and longitude
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchCityName(latitude, longitude);
        },
        (error) => {
          setLocation('Location access denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  // Fetch city name using OpenCage API
  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
      );
      const city = response.data.results[0].components.city || 'City not found';
      setLocation(city);
    } catch (error) {
      console.error('Error fetching city name:', error);
      setLocation('Unable to fetch city');
    }
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home','ChatBot' ,'Help' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Left Side: Drawer Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Center: Company Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>AGRONEXUS</Typography>

          {/* Right Side: User Location */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </Box>
  );
}
