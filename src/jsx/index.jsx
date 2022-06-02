import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';

// components
import {Main} from './components/main/main.jsx';
import {Consumer} from './components/consumer/consumer.jsx';
import {FunctionName} from './component-hook-sample.jsx';
import {YourCalss} from './component-class-sample.jsx';

// context
import {MemberContext, defaultMember} from './context/member.jsx';
import {ThemeContext} from './context/theme.jsx';

function Index(props) {
  return (
    <MemberContext.Provider value={defaultMember}>
    <ThemeContext.Provider value="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/class" element={<YourCalss/>} />
          <Route path="/class/consumer" element={<Consumer />} />
          <Route path="/hook" element={<FunctionName />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
    </MemberContext.Provider>
  )
}

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<Index />);