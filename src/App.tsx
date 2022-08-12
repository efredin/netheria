import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import ThemeProvider from './ThemeProvider';

const RoutedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <div>Hellow world</div>
    </ThemeProvider>
  );
};

export default RoutedApp;
