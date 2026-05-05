import React from "react";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const NoticeCard = ({ item, isFavorite, onToggleFavorite, onLearnMore }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        width: "100%",
        p: 2.5,
        border: "1px solid rgba(38, 38, 38, 0.05)",
      }}
    >
   
      <Box
        sx={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          height: 180,
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={item.imgURL || item.imgUrl}
          alt={item.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
          }}
        />

 
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {[
            { label: "Sex", value: item.sex },
            { label: "Type", value: item.species },
            { label: "Location", value: item.locationId?.label?.split(",")[0] || "Kyiv" },
            {
              label: "Birthday",
              value: item.birthday
                ? new Date(item.birthday).toLocaleDateString("en-GB").replaceAll("/", ".")
                : "21.09.2020",
            },
          ].map((chip) => (
            <Box
              key={chip.label}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: "30px",
                fontSize: 10,
                fontWeight: 500,
                display: "flex",
                gap: "4px",
              }}
            >
              <Typography sx={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                {chip.label}:
              </Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
                {chip.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

    
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#262626",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "75%",
            }}
          >
            {item.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 18, color: "#FFC531" }} />
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: "#262626" }}
            >
              {item.popularity}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#262626",
            lineHeight: "18px",
            letterSpacing: "-0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "36px",
          }}
        >
          {item.comment || "No description provided."}
        </Typography>
      </Box>

      
      <Box sx={{ mt: 3 }}>
     
        <Box sx={{ height: "38px", display: "flex", alignItems: "center", mb: 1.5 }}>
          {item.price && (
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                color: "#F6B83D",
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              ${item.price}
            </Typography>
          )}
        </Box>


        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button
            onClick={() => onLearnMore(item._id)}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#F6B83D",
              color: "white",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 16,
              height: 48,
              boxShadow: "none",
              "&:hover": { bgcolor: "#e5a52e", boxShadow: "none" },
            }}
          >
            Learn more
          </Button>

          <IconButton
            onClick={() => onToggleFavorite(item._id)}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#FFF4DF",
              borderRadius: "50%",
              flexShrink: 0,
              color: isFavorite ? "#F6B83D" : "rgba(246, 184, 61, 0.5)",
              "&:hover": { bgcolor: "#fee8c1" },
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.3667 3.84172C16.9412 3.41594 16.4359 3.07809 15.88 2.84765C15.3241 2.61721 14.7285 2.49869 14.1269 2.49869C13.5252 2.49869 12.9296 2.61721 12.3737 2.84765C11.8178 3.07809 11.3126 3.41594 10.887 3.84172L10.0001 4.72859L9.11322 3.84172C8.25369 2.98219 7.08772 2.49911 5.87197 2.49911C4.65622 2.49911 3.49025 2.98219 2.63072 3.84172C1.77119 4.70125 1.28811 5.86722 1.28811 7.08297C1.28811 8.29872 1.77119 9.46469 2.63072 10.3242L3.51759 11.2211L10.0001 17.7036L16.4826 11.2211L17.3695 10.3242C17.7952 9.89862 18.1331 9.39335 18.3635 8.83745C18.594 8.28155 18.7125 7.68595 18.7125 7.08428C18.7125 6.48261 18.594 5.88701 18.3635 5.33111C18.1331 4.77521 17.7952 4.26993 17.3695 3.84434L17.3667 3.84172Z"
                stroke="#F6B83D"
                fill={isFavorite ? "#F6B83D" : "none"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </Box>
      </Box>
    </Card>


  );
};

export default NoticeCard;
