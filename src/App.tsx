import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme';
import HomePage from './HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OctomizePage } from './octomize';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="octomize" element={<OctomizePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
