import * as React from 'react';
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


// export default function Footer() {

//     const styleFooter = {
//         backgroundColor: '#f8f9fa',
//         padding: '20px',
//         textAlign: 'center',
//       };
    
//   return (
//     <div style={styleFooter}>
//      <h1> Footer </h1>
//     </div>
//   );
// }

// import React from 'react';
import {Container,Grid,Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '20px 0',
        borderTop: '1px solid #ddd',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are dedicated to building responsive and innovative web solutions.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Services
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Contact Us
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block">
              Facebook
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Twitter
            </Link>
            <Link href="#" color="inherit" underline="none" display="block">
              Instagram
            </Link>
          </Grid>
        </Grid>

        <Box textAlign="center" marginTop={3}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} AGRONEXUS . All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
