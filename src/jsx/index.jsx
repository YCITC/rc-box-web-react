import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// pages
import Main from './pages/main/main.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import LandingPage from './pages/landing.jsx';
import Devices from './pages/devices.jsx';
import Logs from './pages/log.jsx';

// components
// import Layout from './components/layout.jsx'
import SidebarLayout from './layouts/sidebar.jsx';
// import { Layout as DashboardLayout } from './layouts/dashboard/layout.jsx';
import { DashboardLayout } from './layouts/dashboard/layout.jsx';

const defaultTheme = createTheme();

function LayoutWrapper() {
  return (
    <>
    {/* <SidebarLayout> */}
    <DashboardLayout>
      {/* <h1>hello</h1> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} showLayout={false} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </DashboardLayout>
    {/* </SidebarLayout> */}
    </>
  );
}

const App = (props) => {
  console.clear();
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />);