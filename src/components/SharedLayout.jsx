import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { Box } from '@mui/material';

const SharedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isHomePage ? 'white' : '#F9F9F9',
      }}
    >
      {!isHomePage && <Header />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SharedLayout;
