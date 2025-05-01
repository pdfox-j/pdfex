import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import LandingPage from './LandingPage';
import PdfReader from './PdfReader';
import LoginRegister from './LoginRegister';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lector" element={<PdfReader />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
