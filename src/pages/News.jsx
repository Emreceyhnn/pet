import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import CustomPagination from "../components/CustomPagination";
import SEO from "../components/SEO";

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://petlove.b.goit.study/api/news?page=${page}&limit=6${
            search ? `&keyword=${search}` : ""
          }`,
        );
        setNews(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page, search]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#F9F9F9",
        px: { xs: 2, lg: "64px" },
        pb: { xs: "60px", lg: "100px" },
      }}
    >
      <SEO 
        title="News" 
        description="Stay updated with the latest news about pets, adoption stories, and animal care tips from PetLove." 
      />
      <Box
        sx={{
          maxWidth: "1216px",
          mx: "auto",
          pt: { xs: "40px", lg: "80px" },
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: "40px",
            gap: { xs: "20px", md: 0 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "32px", lg: "54px" },
              lineHeight: { xs: "32px", lg: "54px" },
              letterSpacing: "-0.03em",
              color: "#262626",
            }}
          >
            News
          </Typography>

          <TextField
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            variant="outlined"
            sx={{
              width: { xs: "100%", md: "230px" },
              "& .MuiOutlinedInput-root": {
                height: "48px",
                borderRadius: "30px",
                border: "1px solid rgba(38, 38, 38, 0.15)",
                px: "14px",
                bgcolor: "white",
                "& fieldset": { border: "none" },
                "&:hover": { border: "1px solid #F6B83D" },
                "&.Mui-focused": { border: "1px solid #F6B83D" },
              },
              "& .MuiInputBase-input": {
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "-0.03em",
                color: "#262626",
                padding: 0,
                "&::placeholder": {
                  color: "rgba(38, 38, 38, 0.5)",
                  opacity: 1,
                },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        width: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle
                          cx="8"
                          cy="8"
                          r="6.5"
                          stroke="#262626"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M12.5 12.5L16 16"
                          stroke="#262626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

       
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#F6B83D" }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: "35px",
            }}
          >
            {news?.map((item) => (
              <Box
                key={item._id}
                sx={{
                  width: "100%",
                  maxWidth: "361px",
                  height: { lg: "476px" },
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "transparent",
                  mx: "auto",
                }}
              >
         
                <Box
                  sx={{
                    width: "100%",
                    height: "226px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    mb: "28px",
                  }}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 700,
                        fontSize: "20px",
                        lineHeight: "26px",
                        letterSpacing: "-0.03em",
                        color: "#262626",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        height: "52px",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "20px",
                        letterSpacing: "-0.02em",
                        color: "#262626",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        height: "80px",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>

               
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                      pb: "28px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "20px",
                        letterSpacing: "-0.02em",
                        color: "rgba(38, 38, 38, 0.5)",
                      }}
                    >
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </Typography>
                    <MuiLink
                      href={item.url}
                      target="_blank"
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "20px",
                        letterSpacing: "-0.02em",
                        color: "#F6B83D",
                        textDecoration: "underline",
                      }}
                    >
                      Read more
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        
        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </Box>
    </Box>
  );
};

export default News;
