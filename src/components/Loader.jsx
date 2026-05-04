import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F9F9F9',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <Box
        component="img"
        src="/landing loader background.png"
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />
      {/* Spinner + logo */}
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 800, color: '#262626' }}>petl</Typography>
          <Typography sx={{ fontSize: 40 }}>❤️</Typography>
          <Typography sx={{ fontSize: 40, fontWeight: 800, color: '#262626' }}>ve</Typography>
        </Box>
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: '#F6B83D',
            '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
          }}
        />
      </Box>
    </Box>
  );
};

export default Loader;
