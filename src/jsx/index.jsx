import React, { createContext, useContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// pages
import Main from './pages/main.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import LandingPage from './pages/landing.jsx';
import Devices from './pages/devices.jsx';
import DeliveryLogs from './pages/logs.jsx';

// components
import { DashboardLayout } from './layouts/dashboard/layout.jsx';

// context
import { AuthProvider } from './contexts/auth-context.jsx';


const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#884A39',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#F9E0BB'
    },
    secondary: {
      light: '#0066ff',
      main: '#C38154',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: '#F9E0BB'
    },
    info: {
      main: '#C38154',
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,

    avatar: '#99592A',
  },
  zIndex: {
    dialog: 1600,
  },
  layout: {
    SIDE_NAV_WIDTH: '280px',
    TOP_BAR_HEIGHT: '64px',
  }
});

function LayoutWrapper() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} showLayout={false} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/delivery-logs" element={<DeliveryLogs />} />
      </Routes>
    </DashboardLayout>
  );
}

const App = (props) => {
  // console.clear();
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthProvider>
          <LayoutWrapper />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />);