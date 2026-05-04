import React from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient } from "../store/authSlice";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Link as MuiLink,
} from "@mui/material";

const Home = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "News", to: "/news" },
    { label: "Find pet", to: "/notices" },
    { label: "Our friends", to: "/friends" },
  ];

  const handleLogout = () => dispatch(logoutClient());

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "1216px",
        mx: "auto",
        px: { xs: 2, lg: "64px" },
        py: { xs: 2, lg: "32px" },
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "10px", lg: "16px" },
      }}
    >
      {/* ── YELLOW HERO BLOCK ── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          boxSizing: "border-box",
          minHeight: { xs: "400px", md: "480px", lg: "calc(50vh - 12px)" },
          bgcolor: "#F6B83D",
          borderRadius: { xs: "30px", lg: "60px" },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── HEADER ROW ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 3, lg: "64px" },
            pt: { xs: 3, lg: "16px" },
            height: { xs: "80px", lg: "82px" },
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
              zIndex: 10,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                lineHeight: "28px",
                letterSpacing: "-0.04em",
                color: "#fff",
              }}
            >
              petl
            </Typography>
            <Box
              sx={{
                width: 23,
                height: 23,
                bgcolor: "#fff",
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
                  fill="#F6B83D"
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
                color: "#fff",
              }}
            >
              ve
            </Typography>
          </MuiLink>

          {/* Desktop Nav - Centered exactly on large screens */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: "10px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map(({ label, to }) => (
              <Button
                key={label}
                component={NavLink}
                to={to}
                sx={{
                  height: 50,
                  px: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "30px",
                  fontSize: 16,
                  textTransform: "none",
                  color: "white",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  lineHeight: "20px",
                  letterSpacing: "-0.03em",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.6)",
                  },
                  "&.active": {
                    bgcolor: "white",
                    color: "#F6B83D",
                    borderColor: "white",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Auth/User — right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Tablet/Desktop Auth */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
              {token ? (
                <>
                  <MuiLink
                    component={RouterLink}
                    to="/profile"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: "#FFF4DF",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {user?.avatar || user?.avatarURL ? (
                        <Box
                          component="img"
                          src={user.avatar || user.avatarURL}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
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
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: "20px",
                        letterSpacing: "-0.03em",
                        color: "#fff",
                      }}
                    >
                      {user?.name?.split(" ")[0] || "Profile"}
                    </Typography>
                  </MuiLink>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{
                      height: 50,
                      px: "35px",
                      bgcolor: "#fff",
                      color: "#F6B83D",
                      borderRadius: "30px",
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      textTransform: "uppercase",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    Log In
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
                      textTransform: "uppercase",
                      "&:hover": { bgcolor: "#fee8c1" },
                    }}
                  >
                    Registration
                  </Button>
                </Box>
              )}
            </Box>

            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setIsMenuOpen(true)}
              sx={{ display: { lg: "none" }, color: "#fff", p: 0 }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        </Box>

        {/* ── CONTENT ROW ── */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: { xs: "flex-start", lg: "flex-end" },
            px: { xs: 3, lg: "64px" },
            pb: { xs: 5, lg: "48px" },
            pt: { xs: 4, lg: 0 },
            gap: { xs: "24px", lg: "32px" },
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
          }}
        >
          {/* Headline */}
          <Box sx={{ flex: "0 0 auto", maxWidth: { xs: "100%", lg: "65%" } }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: { xs: 40, sm: 54, lg: 80 },
                lineHeight: { xs: 1.1, lg: 1 },
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              Take good{" "}
              <Box component="span" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>
                care
              </Box>{" "}
              of
              <br />
              your small pets
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ flex: "0 0 auto", maxWidth: { xs: "100%", lg: "250px" } }}>
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: { xs: "14px", lg: "16px" },
                lineHeight: { xs: "18px", lg: "22px" },
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── HERO IMAGE BLOCK ── */}
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          height: { xs: "400px", md: "500px", lg: "calc(50vh - 12px)" },
          borderRadius: { xs: "30px", lg: "60px" },
          overflow: "hidden",
          bgcolor: "#000",
        }}
      >
        <Box
          component="img"
          src="/home-hero.png"
          alt="Woman with dog"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </Box>

      {/* Mobile menu drawer (Duplicate of Header.jsx drawer for Home) */}
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
            <Typography sx={{ fontSize: 28, fontWeight: 800, color: "white" }}>
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
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: "white" }}>
              ve
            </Typography>
          </MuiLink>
          <IconButton onClick={() => setIsMenuOpen(false)}>
            <CloseIcon sx={{ fontSize: 36, color: "white" }} />
          </IconButton>
        </Box>

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
              key={link.label}
              component={NavLink}
              to={link.to}
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
              {link.label}
            </Button>
          ))}
        </Box>

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
                }}
              >
                REGISTRATION
              </Button>
            </>
          ) : (
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
              }}
            >
              LOG OUT
            </Button>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Home;
