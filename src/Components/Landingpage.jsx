import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'; 
import i1 from '/Users/sharvarisoparkar/Desktop/AgroNeuxs/agro_nexus/src/images/pic1.jpg';
import i2 from '/Users/sharvarisoparkar/Desktop/AgroNeuxs/agro_nexus/src/images/pexels-timmossholder-974314.jpg'
import i3 from '/Users/sharvarisoparkar/Desktop/AgroNeuxs/agro_nexus/src/images/pexels-quang-nguyen-vinh-222549-2132250.jpg'
import Botpress from './Botpress';
import Services from './Services';
import { Link } from 'react-router-dom';
const images = [
  i1,i2,i3,i1,i2,i3
];

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

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change background every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  return (
<div>
    <div style={backgroundStyle}>
      
      <div className="content" style={{ textAlign: 'center', color: 'white', paddingTop: '20vh' }}>
        <h1 style={{fontSize:'30px',color:'black'}}>Welcome to Agronexus </h1>
        <p>Real-time crop recommendation System</p>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          SERVICES
        </button>
      </div>
    </div>
      <Services/>
      <Botpress/>
      </div>
  );
};

export default LandingPage;