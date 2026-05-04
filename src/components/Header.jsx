import React, { useState } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutClient } from '../store/authSlice';
import {
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Drawer,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'News', path: '/news' },
    { name: 'Find pet', path: '/notices' },
    { name: 'Our friends', path: '/friends' },
  ];

  const handleLogout = () => dispatch(logoutClient());

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        px: { xs: 2, lg: "64px" },
        py: { xs: 2, lg: "32px" },
        position: "relative",
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          maxWidth: "1216px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <MuiLink
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 0,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              lineHeight: "28px",
              letterSpacing: "-0.04em",
              color: "#262626",
            }}
          >
            petl
          </Typography>
          <Box
            sx={{
              width: 23,
              height: 23,
              bgcolor: "#F6B83D",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: "2px",
              flexShrink: 0,
            }}
          >
            <svg width="13" height="12" viewBox="0 0 14 13" fill="none">
              <path
                d="M7 11.5S1 7.5 1 3.5A3 3 0 0 1 7 2.118 3 3 0 0 1 13 3.5C13 7.5 7 11.5 7 11.5Z"
                fill="white"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              lineHeight: "28px",
              letterSpacing: "-0.04em",
              color: "#262626",
            }}
          >
            ve
          </Typography>
        </MuiLink>

        {/* Desktop Nav - Centered */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: "10px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.name}
              component={NavLink}
              to={link.path}
              sx={{
                height: 50,
                px: 3,
                borderRadius: "30px",
                fontSize: 16,
                fontWeight: 500,
                border: "1px solid rgba(38, 38, 38, 0.15)",
                color: "#262626",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#F6B83D",
                  bgcolor: "transparent",
                },
                "&.active": {
                  borderColor: "#F6B83D",
                  bgcolor: "transparent",
                },
              }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        {/* Auth / User - Right (Tablet & Desktop) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Tablet/Desktop Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
            {token ? (
              <>
                <Button
                  onClick={handleLogout}
                  sx={{
                    height: 50,
                    px: "35px",
                    bgcolor: "#FFF4DF",
                    color: "#F6B83D",
                    borderRadius: "30px",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    "&:hover": { bgcolor: "#fee8c1" },
                  }}
                >
                  LOG OUT
                </Button>
                <MuiLink
                  component={RouterLink}
                  to="/profile"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <Avatar
                    src={user?.avatar || user?.avatarURL}
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#FFF4DF",
                      color: "#F6B83D",
                      borderRadius: "50%",
                    }}
                  >
                    {!(user?.avatar || user?.avatarURL) && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"
                          fill="#F6B83D"
                        />
                      </svg>
                    )}
                  </Avatar>
                  <Typography
                    sx={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      color: "#262626",
                      fontSize: "20px",
                      lineHeight: "20px",
                      letterSpacing: "-0.03em",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    {user?.name?.split(" ")[0] || "Profile"}
                  </Typography>
                </MuiLink>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    height: 50,
                    px: "35px",
                    bgcolor: "#F6B83D",
                    color: "white",
                    borderRadius: "30px",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    "&:hover": { bgcolor: "#e5a52e" },
                  }}
                >
                  LOG IN
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  sx={{
                    height: 50,
                    px: "20px",
                    bgcolor: "#FFF4DF",
                    color: "#F6B83D",
                    borderRadius: "30px",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    "&:hover": { bgcolor: "#fee8c1" },
                  }}
                >
                  REGISTRATION
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Hamburger Icon */}
          <IconButton
            onClick={() => setIsMenuOpen(true)}
            sx={{ display: { lg: "none" }, color: "#262626", p: 0 }}
          >
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            bgcolor: "#F6B83D",
            p: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 8,
          }}
        >
          <MuiLink
            component={RouterLink}
            to="/"
            onClick={() => setIsMenuOpen(false)}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: 0,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: 800, color: "white" }}
            >
              petl
            </Typography>
            <Box
              sx={{
                width: 23,
                height: 23,
                bgcolor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: "2px",
              }}
            >
              <svg width="13" height="12" viewBox="0 0 14 13" fill="none">
                <path
                  d="M7 11.5S1 7.5 1 3.5A3 3 0 0 1 7 2.118 3 3 0 0 1 13 3.5C13 7.5 7 11.5 7 11.5Z"
                  fill="#F6B83D"
                />
              </svg>
            </Box>
            <Typography
              sx={{ fontSize: 28, fontWeight: 700, color: "white" }}
            >
              ve
            </Typography>
          </MuiLink>
          <IconButton onClick={() => setIsMenuOpen(false)}>
            <CloseIcon sx={{ fontSize: 36, color: "white" }} />
          </IconButton>
        </Box>

        {/* Drawer Nav Links */}
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.name}
              component={NavLink}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              sx={{
                width: "100%",
                maxWidth: "280px",
                height: "56px",
                borderRadius: "30px",
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
                bgcolor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                textTransform: "none",
                "&.active": {
                  bgcolor: "white",
                  color: "#F6B83D",
                  border: "none",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        {/* Drawer Auth Buttons (Mobile Only) */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 2,
            mb: 4,
            px: 2,
          }}
        >
          {!token ? (
            <>
              <Button
                component={RouterLink}
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                fullWidth
                sx={{
                  height: "50px",
                  borderRadius: "30px",
                  bgcolor: "white",
                  color: "#F6B83D",
                  fontWeight: 700,
                  fontSize: "16px",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                }}
              >
                LOG IN
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                fullWidth
                sx={{
                  height: "50px",
                  borderRadius: "30px",
                  bgcolor: "#FFF4DF",
                  color: "#F6B83D",
                  fontWeight: 700,
                  fontSize: "16px",
                  "&:hover": { bgcolor: "#fee8c1" },
                }}
              >
                REGISTRATION
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                fullWidth
                sx={{
                  height: "50px",
                  borderRadius: "30px",
                  bgcolor: "#FFF4DF",
                  color: "#F6B83D",
                  fontWeight: 700,
                  fontSize: "16px",
                  "&:hover": { bgcolor: "#fee8c1" },
                }}
              >
                LOG OUT
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
