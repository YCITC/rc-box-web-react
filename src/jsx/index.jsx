import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';

// components
import {Main} from './components/main/main.jsx';

function Index(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<Index />);