import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const LOGO_DURATION = 1200;   // ms logo görünür kalır
const COUNT_DURATION = 1600;  // ms sayaç sürer (0→100)

const Loader = ({ onDone }) => {
  const [phase, setPhase] = useState('logo');   // 'logo' | 'progress'
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef(null);

  // Phase 1 → Phase 2
  useEffect(() => {
    const t = setTimeout(() => setPhase('progress'), LOGO_DURATION);
    return () => clearTimeout(t);
  }, []);

  // Sayaç animasyonu
  useEffect(() => {
    if (phase !== 'progress') return;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setPct(Math.round(eased * 100));
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // %100 olunca fade-out
        setTimeout(() => {
          setVisible(false);
          onDone?.();
        }, 300);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, onDone]);

  // SVG ring hesabı
  const size = 140;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.5s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {/* Tam ekran arka plan */}
      <Box
        component="img"
        src="/landing loader background.png"
        alt=""
        loading="eager"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Hafif karartma overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.25)',
        }}
      />

      {/* İçerik */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* LOGO PHASE */}
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            transition: 'opacity 0.4s ease',
            opacity: phase === 'logo' ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 52,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            petl
          </Typography>
          {/* Heart icon – sarı dolu */}
          <Box
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#F6B83D',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: '4px',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
              <path
                d="M10 16.5S1 11 1 4.5A4.5 4.5 0 0 1 10 2.318 4.5 4.5 0 0 1 19 4.5C19 11 10 16.5 10 16.5Z"
                fill="#fff"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 52,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            ve
          </Typography>
        </Box>

        {/* PROGRESS PHASE */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.4s ease',
            opacity: phase === 'progress' ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={stroke}
            />
            {/* Progress */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#fff"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
          </svg>
          {/* Ortadaki yüzde */}
          <Box sx={{ position: 'absolute' }}>
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {pct}%
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Loader;
