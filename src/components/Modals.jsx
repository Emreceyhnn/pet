import { Link as RouterLink } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// ────────────────────────────────────────────────────────────
// Base Modal (Using MUI Dialog)
// ────────────────────────────────────────────────────────────
export const Modal = ({ isOpen, onClose, children, maxWidth = "sm" }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "28px",
          p: 2,
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#9ca3af",
          "&:hover": { bgcolor: "#f3f4f6", color: "#374151" },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: 2 }}>{children}</DialogContent>
    </Dialog>
  );
};

// ────────────────────────────────────────────────────────────
// Attention Modal
// ────────────────────────────────────────────────────────────
export const ModalAttention = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xs">
      <Box sx={{ textAlign: "center", py: 2 }}>
        {/* Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#FFF4DF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: 40, color: "#F6B83D" }} />
        </Box>

        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#262626", mb: 1.5 }}
        >
          Attention
        </Typography>
        <Typography
          sx={{ color: "#6b7280", fontSize: 14, mb: 4, lineHeight: 1.6 }}
        >
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            component={RouterLink}
            to="/login"
            onClick={onClose}
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              bgcolor: "#F6B83D",
              color: "white",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { bgcolor: "#e5a52e" },
            }}
          >
            Log In
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            onClick={onClose}
            fullWidth
            variant="outlined"
            sx={{
              py: 1.5,
              borderColor: "#F6B83D",
              color: "#F6B83D",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { borderColor: "#e5a52e", bgcolor: "#FFF4DF" },
            }}
          >
            Registration
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// ────────────────────────────────────────────────────────────
// Notice Detail Modal
// ────────────────────────────────────────────────────────────
export const ModalNotice = ({
  isOpen,
  onClose,
  notice,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!notice) return null;

  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return "01.10.2022";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "01.10.2022";
      return date.toLocaleDateString("uk-UA");
    } catch (e) {
      return "01.10.2022";
    }
  };

  const popularity =
    typeof notice.popularity === "number" ? notice.popularity : 0;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 473,
          height: 510,
          maxWidth: "none",
          borderRadius: "30px",
          p: 0,
          position: "relative",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          p: 0,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </IconButton>

      <Box>
        <Box sx={{ position: "relative" }}>
          {/* Category Tag */}
          <Box
            sx={{
              position: "absolute",
              left: 160,
              top: 40,
              bgcolor: "#FFF4DF",
              borderRadius: "30px",
              px: "14px",
              py: "8px",
              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#F6B83D",
                textTransform: "capitalize",
                lineHeight: "18px",
                letterSpacing: "-0.02em",
              }}
            >
              {notice.category || "Sell"}
            </Typography>
          </Box>
          {/* Pet Image */}
          <Box
            sx={{
              position: "absolute",
              width: 150,
              height: 150,
              left: "50%",
              transform: "translateX(-50%)",
              top: 40,
              borderRadius: "100px",
              overflow: "hidden",
              bgcolor: "#f3f4f6",
            }}
          >
            <Box
              component="img"
              src={notice.imgURL || notice.imgUrl}
              alt={notice.name}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150x150?text=No+Image";
              }}
            />
          </Box>
        </Box>

        {/* Title and Rating */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: 206,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "24px",
              color: "#2B2B2A",
              textAlign: "center",
              px: 3,
            }}
          >
            {notice.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Box key={star} sx={{ width: 16, height: 16 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1L10.163 5.382L15 6.088L11.5 9.5L12.326 14.326L8 12.046L3.674 14.326L4.5 9.5L1 6.088L5.837 5.382L8 1Z"
                    fill={
                      star <= Math.round(popularity)
                        ? "#FFC531"
                        : "rgba(38, 38, 38, 0.05)"
                    }
                    stroke={
                      star <= Math.round(popularity) ? "#FFC531" : "#F4F4F4"
                    }
                    strokeWidth="1.2"
                  />
                </svg>
              </Box>
            ))}
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                color: "#2B2B2A",
                ml: "2px",
              }}
            >
              {popularity}
            </Typography>
          </Box>
        </Box>

        {/* Details Block */}
        <Box
          sx={{
            position: "absolute",
            width: 300,
            left: "50%",
            transform: "translateX(-50%)",
            top: 280,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "27px",
          }}
        >
          {/* Name */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(38, 38, 38, 0.5)",
                mb: "4px",
              }}
            >
              Name
            </Typography>
            <Typography
              sx={{ fontSize: 12, fontWeight: 500, color: "#262626" }}
            >
              {notice.name || "Unknown"}
            </Typography>
          </Box>
          {/* Birthday */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(38, 38, 38, 0.5)",
                mb: "4px",
              }}
            >
              Birthday
            </Typography>
            <Typography
              sx={{ fontSize: 12, fontWeight: 500, color: "#262626" }}
            >
              {formatDate(notice.birthday)}
            </Typography>
          </Box>
          {/* Sex */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(38, 38, 38, 0.5)",
                mb: "4px",
              }}
            >
              Sex
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: "#262626",
                textTransform: "capitalize",
              }}
            >
              {notice.sex || "Unknown"}
            </Typography>
          </Box>
          {/* Species */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(38, 38, 38, 0.5)",
                mb: "4px",
              }}
            >
              Species
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: "#262626",
                textTransform: "capitalize",
              }}
            >
              {notice.species || "Unknown"}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          sx={{
            position: "absolute",
            width: 260,
            left: "50%",
            transform: "translateX(-50%)",
            top: 328,
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "18px",
            color: "#2B2B2A",
            textAlign: "center",
            letterSpacing: "-0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {notice.comment || "Adorable puppy looking for a loving home."}
        </Typography>

        {/* Price */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: 378,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "24px",
              color: "#2B2B2A",
            }}
          >
            ${notice.price || "0.00"}
          </Typography>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            position: "absolute",
            width: 330,
            left: "50%",
            transform: "translateX(-50%)",
            top: 422,
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            onClick={() => onToggleFavorite(notice._id)}
            sx={{
              width: 160,
              height: 48,
              bgcolor: isFavorite ? "#FFF4DF" : "#F6B83D",
              color: isFavorite ? "#F6B83D" : "#FFFFFF",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              gap: "8px",
              "&:hover": { bgcolor: isFavorite ? "#fee8c1" : "#e5a52e" },
            }}
          >
            {isFavorite ? "Added" : "Add to"}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M15.63 3.4575C15.247 3.0743 14.7924 2.77024 14.2921 2.56285C13.7918 2.35545 13.2555 2.24878 12.7139 2.24878C12.1722 2.24878 11.6359 2.35545 11.1356 2.56285C10.6353 2.77024 10.1807 3.0743 9.7977 3.4575L8.99933 4.25588L8.20095 3.4575C7.4273 2.68385 6.37793 2.24915 5.2837 2.24915C4.18947 2.24915 3.1401 2.68385 2.36645 3.4575C1.5928 4.23115 1.15811 5.28052 1.15811 6.37475C1.15811 7.46898 1.5928 8.51835 2.36645 9.292L3.16483 10.0904L8.99933 15.9249L14.8338 10.0904L15.6322 9.292C16.0154 8.90901 16.3195 8.45437 16.5268 7.95408C16.7342 7.45378 16.8409 6.91754 16.8409 6.37588C16.8409 5.83421 16.7342 5.29797 16.5268 4.79767C16.3195 4.29738 16.0154 3.84274 15.6322 3.45975L15.63 3.4575Z"
                stroke={isFavorite ? "#F6B83D" : "#FFFFFF"}
                fill={isFavorite ? "#F6B83D" : "none"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <Button
            component="a"
            href={`mailto:${notice.owner?.email || "contact@petlove.com"}`}
            sx={{
              width: 160,
              height: 48,
              bgcolor: "#FFF4DF",
              color: "#F6B83D",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              "&:hover": { bgcolor: "#fee8c1" },
            }}
          >
            Contact
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
// ────────────────────────────────────────────────────────────
// Edit Profile Modal
// ────────────────────────────────────────────────────────────
const editSchema = yup.object().shape({
  avatar: yup.string(),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
});

export const ModalEditProfile = ({ isOpen, onClose, user, onSave }) => {
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      avatar: user?.avatar || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "+380",
    },
  });

  const avatarUrl = watch("avatar");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the file object itself for the form submission
      setValue("avatarFile", file);
      
      // Update the preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: "90%", sm: 480 },
          borderRadius: "30px",
          p: { xs: 3, sm: 5 },
          bgcolor: "#FFFFFF",
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "#262626",
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#262626",
          mb: 3,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        Edit information
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSave)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Avatar Preview */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#FFF4DF",
              border: "1px solid #F6B83D",
            }}
          >
            {!avatarUrl && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"
                  fill="#F6B83D"
                />
              </svg>
            )}
          </Avatar>
        </Box>

        {/* Avatar URL & Upload Row */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
          <TextField
            {...register("avatar")}
            fullWidth
            placeholder="Avatar URL"
            error={!!errors.avatar}
            slotProps={{
              input: {
                sx: {
                  borderRadius: "100px",
                  height: 52,
                  fontSize: 14,
                  fontFamily: "'Manrope', sans-serif",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F6B83D",
                  },
                },
              },
            }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <Button
            onClick={handleUploadClick}
            sx={{
              height: 52,
              px: 3,
              borderRadius: "100px",
              bgcolor: "#FFF4DF",
              color: "#262626",
              whiteSpace: "nowrap",
              fontSize: 14,
              fontWeight: 500,
              textTransform: "none",
              display: "flex",
              gap: 1,
              fontFamily: "'Manrope', sans-serif",
              "&:hover": { bgcolor: "#fee8c1" },
            }}
          >
            Upload photo
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M12 10.5L9 7.5L6 10.5"
                stroke="#F6B83D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 7.5V13.5"
                stroke="#F6B83D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.3 12.18C15.84 11.79 16.21 11.19 16.32 10.53C16.43 9.87 16.27 9.19 15.87 8.65C15.47 8.11 14.87 7.74 14.19 7.64C13.51 7.54 12.81 7.71 12.24 8.12C11.96 6.37 10.98 4.86 9.5 3.97C8.02 3.08 6.22 2.92 4.6 3.53C2.98 4.14 1.74 5.44 1.22 7.07C0.7 8.7 0.96 10.47 1.94 11.88"
                stroke="#F6B83D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Box>

        {/* Other Fields */}
        <TextField
          {...register("name")}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          slotProps={{
            input: {
              sx: {
                borderRadius: "100px",
                height: 52,
                fontFamily: "'Manrope', sans-serif",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(38, 38, 38, 0.15)",
                },
              },
            },
          }}
        />
        <TextField
          {...register("email")}
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{
            input: {
              sx: {
                borderRadius: "100px",
                height: 52,
                fontFamily: "'Manrope', sans-serif",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(38, 38, 38, 0.15)",
                },
              },
            },
          }}
        />
        <TextField
          {...register("phone")}
          fullWidth
          placeholder="+380XXXXXXXXX"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          slotProps={{
            input: {
              sx: {
                borderRadius: "100px",
                height: 52,
                fontFamily: "'Manrope', sans-serif",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(38, 38, 38, 0.15)",
                },
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            py: 2,
            bgcolor: "#F6B83D",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: 16,
            textTransform: "none",
            mt: 2,
            "&:hover": { bgcolor: "#e5a52e" },
          }}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

// ────────────────────────────────────────────────────────────
// Log Out Modal
// ────────────────────────────────────────────────────────────
export const ModalLogout = ({ isOpen, onClose, onLogout }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 440,
          borderRadius: "30px",
          p: 5,
          textAlign: "center",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          width: 80,
          height: 80,
          bgcolor: "#FFF4DF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12L12 12.01M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"
            fill="#F6B83D"
          />
        </svg>
      </Box>

      <Typography
        sx={{ fontSize: 20, fontWeight: 700, color: "#262626", mb: 4 }}
      >
        Already leaving?
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onLogout}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#F6B83D",
            color: "white",
            borderRadius: "100px",
            height: 48,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { bgcolor: "#e5a52e" },
          }}
        >
          Yes
        </Button>
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            bgcolor: "#F9F9F9",
            color: "rgba(38, 38, 38, 0.5)",
            borderRadius: "100px",
            height: 48,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};

// ────────────────────────────────────────────────────────────
// Congrats Modal
// ────────────────────────────────────────────────────────────
export const ModalCongrats = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 440,
          borderRadius: "30px",
          p: 5,
          textAlign: "center",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          width: 80,
          height: 80,
          bgcolor: "#FFF4DF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12L12 12.01M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"
            fill="#F6B83D"
          />
        </svg>
      </Box>

      <Typography
        sx={{ fontSize: 24, fontWeight: 700, color: "#262626", mb: 2 }}
      >
        Congrats
      </Typography>
      <Typography
        sx={{
          color: "rgba(38, 38, 38, 0.8)",
          fontSize: 16,
          lineHeight: "22px",
          mb: 4,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        You have successfully created your account. Start your happy life with a
        new friend.
      </Typography>

      <Button
        onClick={onClose}
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#F6B83D",
          color: "white",
          borderRadius: "100px",
          height: 52,
          fontWeight: 700,
          textTransform: "none",
          "&:hover": { bgcolor: "#e5a52e" },
        }}
      >
        Go to profile
      </Button>
    </Dialog>
  );
};
