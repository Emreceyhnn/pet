import React from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient } from "../store/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  Button,
  Link as MuiLink,
  Drawer,
  IconButton,
} from "@mui/material";
import SEO from "../components/SEO";

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
        bgcolor: "#F9F9F9",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: "16px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <SEO 
        title="Home" 
        description="Welcome to PetLove! Take good care of your small pets and find your perfect companion today." 
      />


        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1216px",
            mx: "auto",
            boxSizing: "border-box",
            bgcolor: "#F6B83D",
            borderRadius: { xs: "30px", lg: "60px" },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            pb: { xs: "60px", lg: "40px" },
            flex: { xs: "none", lg: 1 },
            minHeight: 0,
            flexShrink: 0,
          }}
        >

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

            <MuiLink
              component={RouterLink}
              to="/"
              aria-label="PetLove Home"
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


            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

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
                              alt="User avatar"
                              loading="lazy"
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


              <IconButton
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                sx={{ display: { lg: "none" }, color: "#fff", p: 0 }}
              >
                <MenuIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
          </Box>


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

            <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "700px", lg: "760px" } }}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: 50, sm: 64, lg: 90 },
                  lineHeight: { xs: 1, lg: 0.95 },
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                }}
              >
                Take good{" "}
                <Box component="span" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  care
                </Box>{" "}
                of
                <br />
                your small pets
              </Typography>
            </Box>


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


        <Box
          sx={{
            width: "100%",
            maxWidth: "1216px",
            mx: "auto",
            mt: { xs: "10px", lg: 0 },
            boxSizing: "border-box",
            flex: 1,
            minHeight: 0,
            borderRadius: { xs: "30px", lg: "60px" },
            overflow: "hidden",
            bgcolor: "#000",
          }}
        >
          <Box
            component="img"
            src="/home-hero.webp"
            alt="Woman with dog"
            loading="eager"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
      </Box>


      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        slotProps={{
          modal: { keepMounted: true },
          paper: {
            sx: {
              width: { xs: "100%", md: "374px" },
              height: "100%",
              bgcolor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              p: "40px 32px",
              boxSizing: "border-box",
            },
          },
        }}
      >

        <Box
          sx={{
            position: "absolute",
            top: "30px",
            right: "30px",
          }}
        >
          <IconButton 
            onClick={() => setIsMenuOpen(false)} 
            aria-label="Close menu"
            sx={{ p: 0, color: "#262626" }}
          >
            <CloseIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>


        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "16px", md: "20px" },
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.label}
              component={NavLink}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              sx={{
                minWidth: { xs: "120px", md: "140px" },
                height: { xs: "40px", md: "50px" },
                px: "20px",
                borderRadius: "30px",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                color: "#262626",
                bgcolor: "transparent",
                border: "1px solid rgba(38,38,38,0.4)",
                textTransform: "none",
                fontFamily: "'Manrope', sans-serif",
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
                "&.active": { borderColor: "#F6B83D", bgcolor: "rgba(246,184,61,0.06)" },
                "&:hover": { bgcolor: "rgba(38,38,38,0.04)", borderColor: "#262626" },
              }}
            >
              {link.label}
            </Button>
          ))}
          {token && (
            <Button
              component={NavLink}
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              sx={{
                minWidth: { xs: "120px", md: "140px" },
                height: { xs: "40px", md: "50px" },
                px: "20px",
                borderRadius: "30px",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                color: "#262626",
                bgcolor: "transparent",
                border: "1px solid rgba(38,38,38,0.4)",
                textTransform: "none",
                fontFamily: "'Manrope', sans-serif",
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
                "&.active": {
                  borderColor: "#F6B83D",
                  bgcolor: "rgba(246,184,61,0.06)",
                },
                "&:hover": {
                  bgcolor: "rgba(38,38,38,0.04)",
                  borderColor: "#262626",
                },
              }}
            >
              Profile
            </Button>
          )}
        </Box>


        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "16px", sm: "8px" },
            mt: "40px",
            mb: "20px",
            width: "100%",
            px: "20px",
            boxSizing: "border-box",
          }}
        >
          {!token ? (
            <>
              <Button
                component={RouterLink}
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                sx={{
                  width: { xs: "100%", sm: "119px" },
                  height: { xs: "40px", md: "50px" },
                  borderRadius: "30px",
                  bgcolor: "#F6B83D",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: { xs: "14px", md: "16px" },
                  fontFamily: "'Manrope', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                  "&:hover": { bgcolor: "#e5a52e" },
                }}
              >
                LOG IN
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                sx={{
                  width: { xs: "100%", sm: "149px" },
                  height: { xs: "40px", md: "50px" },
                  borderRadius: "30px",
                  bgcolor: "transparent",
                  border: "2px solid #F6B83D",
                  color: "#F6B83D",
                  fontWeight: 700,
                  fontSize: { xs: "14px", md: "16px" },
                  fontFamily: "'Manrope', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                  "&:hover": { bgcolor: "#FFF4DF" },
                }}
              >
                REGISTRATION
              </Button>
            </>
          ) : (
            <Button
              onClick={() => { handleLogout(); setIsMenuOpen(false); }}
              sx={{
                width: { xs: "100%", sm: "276px" },
                height: { xs: "40px", md: "50px" },
                borderRadius: "30px",
                bgcolor: "transparent",
                border: "2px solid #F6B83D",
                color: "#F6B83D",
                fontWeight: 700,
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "'Manrope', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                "&:hover": { bgcolor: "#FFF4DF" },
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
