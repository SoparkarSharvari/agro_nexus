
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './Components/Landingpage'; // Corrected casing
import './App.css';
import Headerfile from './Components/Header';
import Footer from './Components/Footer';
import Botpress from './Components/Botpress';
import CropRecommendation from './Components/Model1';
import CropPrediction from './Components/Model2';
import YieldPrediction from './Components/Model3';

function App() {
  return (
    <Router>
      <Headerfile/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/crop-prediction" element={<CropPrediction />} />
        <Route path="/yield-prediction" element={<YieldPrediction />} />
      </Routes>
     <Footer/>
    </Router>
  );
}
export default App;
