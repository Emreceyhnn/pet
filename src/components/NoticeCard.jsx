import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Grid,
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
      {/* Image Area */}
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

        {/* Category Tag */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "#FFF4DF",
            color: "#F6B83D",
            px: 1.5,
            py: 0.5,
            borderRadius: "30px",
            fontSize: 12,
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {item.category || "Sell"}
        </Box>

        {/* Favorite Button */}
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(item._id);
          }}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(4px)",
            color: "#F6B83D",
            width: 40,
            height: 40,
            "&:hover": { bgcolor: "white" },
          }}
        >
          {isFavorite ? (
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 16.5L7.875 15.4725C3.87 11.835 1.125 9.3375 1.125 6.255C1.125 3.7575 3.0825 1.8 5.58 1.8C6.9975 1.8 8.355 2.46 9 3.4875C9.645 2.46 11.0025 1.8 12.42 1.8C14.9175 1.8 16.875 3.7575 16.875 6.255C16.875 9.3375 14.13 11.835 10.125 15.48L9 16.5Z"
                fill="#F6B83D"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path
                d="M12.42 1.8C11.0025 1.8 9.645 2.46 9 3.4875C8.355 2.46 6.9975 1.8 5.58 1.8C3.0825 1.8 1.125 3.7575 1.125 6.255C1.125 9.3375 3.87 11.835 7.875 15.4725L9 16.5L10.125 15.48C14.13 11.835 16.875 9.3375 16.875 6.255C16.875 3.7575 14.9175 1.8 12.42 1.8ZM9.09 14.2875L9 14.3775L8.91 14.2875C5.235 10.95 2.625 8.58 2.625 6.255C2.625 4.5825 3.87 3.3 5.58 3.3C6.8325 3.3 8.0475 4.11 8.475 5.2275H9.525C9.9525 4.11 11.1675 3.3 12.42 3.3C14.13 3.3 15.375 4.5825 15.375 6.255C15.375 8.58 12.765 10.95 9.09 14.2875Z"
                fill="#F6B83D"
              />
            </svg>
          )}
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "#262626",
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <StarIcon sx={{ fontSize: 18, color: "#FFC531" }} />
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#262626" }}>
            {item.popularity}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: "Name", value: item.name },
            {
              label: "Birthday",
              value: item.birthday
                ? new Date(item.birthday).toLocaleDateString("en-GB")
                : "Unknown",
            },
            { label: "Sex", value: item.sex },
            { label: "Species", value: item.species },
          ].map((detail) => (
            <Grid item xs={3} key={detail.label}>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "rgba(38, 38, 38, 0.5)",
                }}
              >
                {detail.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#262626",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {detail.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "auto",
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#262626" }}>
          ${item.price || "0.00"}
        </Typography>
        <Button
          onClick={() => onLearnMore(item._id)}
          variant="contained"
          sx={{
            bgcolor: "#F6B83D",
            color: "white",
            borderRadius: "100px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            "&:hover": { bgcolor: "#e5a52e" },
          }}
        >
          Learn more
        </Button>
      </Box>
    </Card>
  );
};

export default NoticeCard;
