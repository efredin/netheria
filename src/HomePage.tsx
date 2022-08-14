import React from 'React';
import { Paper } from '@mui/material';
import { Page } from './layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Page>
      <Paper sx={{ my: 2, p: 2 }}>
        <p>Welcome to Netheria</p>
        <p>Check out the <Link to="/octomize">Octomize dashboard</Link></p>
      </Paper>
    </Page>
  );
};

export default HomePage;
