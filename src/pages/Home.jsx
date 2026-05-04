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

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        pt: "16px",
        pb: "16px",
        px: { xs: 2, lg: "32px" },
      }}
    >
      <Box
        sx={{
          maxWidth: "1216px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0, // 0 gap to make the blocks touch perfectly
        }}
      >
        {/* ── YELLOW HERO BLOCK ── */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "auto", lg: "384px" },
            minHeight: { xs: 400, lg: "384px" },
            bgcolor: "#F6B83D",
            borderRadius: "60px",
            overflow: "hidden",
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
              height: { xs: "auto", lg: "82px" },
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
                  fontWeight: 800,
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

            {/* Nav - Centered exactly on large screens */}
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
              {[
                { label: "News", to: "/news" },
                { label: "Find pet", to: "/notices" },
                { label: "Our friends", to: "/friends" },
              ].map(({ label, to }) => (
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
                      {user?.avatar ? (
                        <Box
                          component="img"
                          src={user.avatar}
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
                        display: { xs: "none", md: "block" },
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
                      color: "#fff",
                      bgcolor: "#FFF4DF",
                      color: "#F6B83D",
                      borderRadius: "30px",
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      display: { xs: "none", sm: "flex" },
                      textTransform: "uppercase",
                      "&:hover": { bgcolor: "#fee8c1" },
                    }}
                  >
                    Registration
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          {/* ── HEADLINE ── */}
          <Box
            sx={{
              position: { lg: "absolute" },
              left: { lg: "64px" },
              top: { lg: "178px" },
              px: { xs: 3, lg: 0 },
              mt: { xs: 4, lg: 0 },
              width: { lg: "760px" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: { xs: 54, lg: 90 },
                lineHeight: { xs: "54px", lg: "87px" },
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

          {/* ── DESCRIPTION ── */}
          <Box
            sx={{
              position: { lg: "absolute" },
              left: { lg: "897px" },
              top: { lg: "264px" },
              width: { xs: "100%", lg: "255px" },
              px: { xs: 3, lg: 0 },
              mt: { xs: 3, lg: 0 },
              mb: { xs: 4, lg: 0 },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "22px",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </Typography>
          </Box>
        </Box>

        {/* ── HERO IMAGE BLOCK ── */}
        <Box
          sx={{
            width: "100%",
            height: { xs: 400, lg: "384px" },
            borderRadius: "60px",
            overflow: "hidden",
            // Removed margin to let it touch the yellow block
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
              objectPosition: "center 20%",
              display: "block",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
