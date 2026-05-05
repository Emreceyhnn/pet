import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import SEO from "../components/SEO";

const NotFound = () => {
  const { token, user } = useSelector((s) => s.auth);

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: { xs: "10px", md: "20px" },
        boxSizing: "border-box",
      }}
    >
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist. Return to PetLove home page to find your perfect pet companion." 
      />
     
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, lg: "64px" },
          height: "80px",
          bgcolor: "#fff",
          mb: "10px",
        }}
      >
      
        <MuiLink
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "flex-end", gap: 0, textDecoration: "none", color: "inherit" }}
        >
          <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 700, lineHeight: "28px", letterSpacing: "-0.04em", color: "#262626" }}>
            petl
          </Typography>
          <Box sx={{ width: 23, height: 23, bgcolor: "#F6B83D", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mb: "2px", flexShrink: 0 }}>
            <svg width="13" height="12" viewBox="0 0 14 13" fill="none">
              <path d="M7 11.5S1 7.5 1 3.5A3 3 0 0 1 7 2.118 3 3 0 0 1 13 3.5C13 7.5 7 11.5 7 11.5Z" fill="#fff" />
            </svg>
          </Box>
          <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 700, lineHeight: "28px", letterSpacing: "-0.04em", color: "#262626" }}>
            ve
          </Typography>
        </MuiLink>

      
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
          {[{ label: "News", to: "/news" }, { label: "Find pet", to: "/notices" }, { label: "Our friends", to: "/friends" }].map(({ label, to }) => (
            <Button
              key={label}
              component={NavLink}
              to={to}
              sx={{
                height: 48,
                px: "20px",
                borderRadius: "30px",
                fontSize: 15,
                textTransform: "none",
                color: "#262626",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                border: "1px solid rgba(38, 38, 38, 0.15)",
                "&:hover": { borderColor: "#F6B83D", bgcolor: "transparent" },
                "&.active": { borderColor: "#F6B83D", bgcolor: "transparent" },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {token ? (
            <>
              <Button 
                sx={{ 
                  height: 48, 
                  px: "30px", 
                  bgcolor: "#F6B83D", 
                  color: "#fff", 
                  borderRadius: "30px", 
                  fontFamily: "'Manrope', sans-serif", 
                  fontWeight: 700, 
                  fontSize: "14px", 
                  textTransform: "uppercase", 
                  "&:hover": { bgcolor: "#e5a52e" } 
                }}
              >
                LOG OUT
              </Button>
              <MuiLink component={RouterLink} to="/profile" sx={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <Box sx={{ width: 48, height: 48, bgcolor: "#FFF4DF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {user?.avatar
                    ? <Box component="img" src={user.avatar} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z" fill="#F6B83D" /></svg>
                  }
                </Box>
                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 700, color: "#262626", display: { xs: "none", sm: "block" } }}>
                  {user?.name?.split(" ")[0] || "Profile"}
                </Typography>
              </MuiLink>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" sx={{ height: 48, px: "30px", bgcolor: "#F6B83D", color: "#fff", borderRadius: "30px", fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", "&:hover": { bgcolor: "#e5a52e" } }}>
                Log In
              </Button>
              <Button component={RouterLink} to="/register" sx={{ height: 48, px: "20px", bgcolor: "#FFF4DF", color: "#F6B83D", borderRadius: "30px", fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "14px", display: { xs: "none", sm: "flex" }, textTransform: "uppercase", "&:hover": { bgcolor: "#fee8c1" } }}>
                Registration
              </Button>
            </>
          )}
        </Box>
      </Box>


      <Box
        sx={{
          flex: 1,
          bgcolor: "#F6B83D",
          borderRadius: { xs: "40px", md: "60px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
       
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: "10px", sm: "20px", md: "32px" },
            mb: "20px",
          }}
        >

          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "120px", sm: "200px", md: "300px" },
              lineHeight: 0.8,
              color: "#fff",
              letterSpacing: "-0.04em",
            }}
          >
            4
          </Typography>

 
          <Box
            sx={{
              width: { xs: "140px", sm: "220px", md: "280px" },
              height: { xs: "140px", sm: "220px", md: "280px" },
              borderRadius: "50%",
              overflow: "hidden",
              bgcolor: "rgba(255,255,255,0.1)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="/404.webp"
              alt="Lost cat"
              sx={{
                width: "90%",
                height: "90%",
                objectFit: "contain",
              }}
            />
          </Box>


          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "120px", sm: "200px", md: "300px" },
              lineHeight: 0.8,
              color: "#fff",
              letterSpacing: "-0.04em",
            }}
          >
            4
          </Typography>
        </Box>


        <Typography
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "18px", sm: "24px" },
            color: "#fff",
            letterSpacing: "-0.02em",
            mb: "32px",
            textAlign: "center",
          }}
        >
          Ooops! This page not found :(
        </Typography>


        <Button
          component={RouterLink}
          to="/home"
          sx={{
            height: "56px",
            px: "50px",
            borderRadius: "30px",
            bgcolor: "#FFF4DF",
            color: "#F6B83D",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "none",
            "&:hover": { bgcolor: "#fee8c1" },
          }}
        >
          To home page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
