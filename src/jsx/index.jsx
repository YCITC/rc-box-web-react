import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

// components
import { Main } from './pages/main/main.jsx';
import SignUp from './pages/SignUp.jsx';
import LandingPage from './pages/landing.jsx';

function Index(props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<Index />);