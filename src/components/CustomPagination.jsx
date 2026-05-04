import React from 'react';
import { Box, Typography } from '@mui/material';

const PaginationButton = ({ onClick, disabled, children, active }) => (
  <Box
    onClick={!disabled ? onClick : undefined}
    sx={{
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'default' : 'pointer',
      border: '1px solid rgba(38, 38, 38, 0.05)',
      bgcolor: active ? '#F6B83D' : 'white',
      color: active ? 'white' : '#262626',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: active ? '#F6B83D' : !disabled ? 'rgba(38, 38, 38, 0.05)' : 'white',
      },
      userSelect: 'none',
    }}
  >
    {children}
  </Box>
);

const CustomPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={page === i}
          onClick={() => onPageChange(i)}
        >
          <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '18px' }}>
            {i}
          </Typography>
        </PaginationButton>
      );
    }
    return pages;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '24px',
      mt: '60px',
      width: '100%'
    }}>
      {/* Prev Block */}
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <PaginationButton disabled={page === 1} onClick={() => onPageChange(1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 16L7 12L11 8M17 16L13 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PaginationButton>
        <PaginationButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 16L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PaginationButton>
      </Box>

      {/* Page Numbers */}
      <Box sx={{ display: 'flex', gap: '8px' }}>
        {renderPageNumbers()}
      </Box>

      {/* Next Block */}
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <PaginationButton disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 16L14 12L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PaginationButton>
        <PaginationButton disabled={page === totalPages} onClick={() => onPageChange(totalPages)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 16L17 12L13 8M7 16L11 12L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PaginationButton>
      </Box>
    </Box>
  );
};

export default CustomPagination;
