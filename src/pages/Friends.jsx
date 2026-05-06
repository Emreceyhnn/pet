import React, { useState, useEffect } from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import axios from "axios";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          "https://petlove.b.goit.study/api/friends",
        );
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#F9F9F9",
        minHeight: "100vh",
        px: { xs: 2, lg: "64px" },
        pb: { xs: 4, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: "1216px", mx: "auto" }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "40px", md: "54px" },
            lineHeight: { xs: "44px", md: "54px" },
            letterSpacing: "-0.03em",
            color: "#262626",
            mb: { xs: 5, md: 6 },
          }}
        >
          Our friends
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: "20px", lg: "28px 20px" },
          }}
        >
          {friends?.map((item) => {
            const openDay = item.workDays?.find((d) => d.isOpen);
            const workTime = openDay
              ? `${openDay.from} - ${openDay.to}`
              : "Day and night";

            return (
              <Box
                key={item._id}
                sx={{
                  width: "100%",
                  height: "196px",
                  bgcolor: "#FFFFFF",
                  borderRadius: "30px",
                  p: "24px",
                  display: "flex",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Work Time Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "#FFF4DF",
                    borderRadius: "30px",
                    px: "14px",
                    py: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "18px",
                      letterSpacing: "-0.02em",
                      color: "#F6B83D",
                    }}
                  >
                    {workTime}
                  </Typography>
                </Box>

                {/* Left: Logo/Image */}
                <Box
                  sx={{
                    width: { xs: 80, md: 90 },
                    height: { xs: 80, md: 90 },
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    alignSelf: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/90x90?text=Logo";
                    }}
                  />
                </Box>

                {/* Right: Info */}
                <Box
                  sx={{
                    ml: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexGrow: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "26px",
                      letterSpacing: "-0.04em",
                      color: "#262626",
                      mb: "12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {/* Email */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "flex-start",
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "18px",
                          letterSpacing: "-0.02em",
                          color: "rgba(38, 38, 38, 0.5)",
                          width: "70px",
                          flexShrink: 0,
                        }}
                      >
                        Email:
                      </Typography>
                      {item.email ? (
                        <MuiLink
                          href={`mailto:${item.email}`}
                          sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "18px",
                            letterSpacing: "-0.02em",
                            color: "#262626",
                            textDecoration: "none",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {item.email}
                        </MuiLink>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "18px",
                            letterSpacing: "-0.02em",
                            color: "#262626",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          website only
                        </Typography>
                      )}
                    </Box>

                    {/* Address */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "flex-start",
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "18px",
                          letterSpacing: "-0.02em",
                          color: "rgba(38, 38, 38, 0.5)",
                          width: "70px",
                          flexShrink: 0,
                        }}
                      >
                        Address:
                      </Typography>
                      {item.addressUrl ? (
                        <MuiLink
                          href={item.addressUrl}
                          target="_blank"
                          sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "18px",
                            letterSpacing: "-0.02em",
                            color: "#262626",
                            textDecoration: "none",
                            overflow: "hidden",
                            maxWidth: "150px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {item.address || "website only"}
                        </MuiLink>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "18px",
                            letterSpacing: "-0.02em",
                            color: "#262626",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.address || "website only"}
                        </Typography>
                      )}
                    </Box>

                    {/* Phone */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "flex-start",
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "18px",
                          letterSpacing: "-0.02em",
                          color: "rgba(38, 38, 38, 0.5)",
                          width: "70px",
                          flexShrink: 0,
                        }}
                      >
                        Phone:
                      </Typography>
                      {item.phone ? (
                        <MuiLink
                          href={`tel:${item.phone}`}
                          sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "18px",
                            letterSpacing: "-0.02em",
                            color: "#262626",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {item.phone}
                        </MuiLink>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "18px",
                            letterSpacing: "-0.02em",
                            color: "#262626",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          email only
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Friends;
