import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { useRef } from "react";



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


export const ModalAttention = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xs">
      <Box sx={{ textAlign: "center", py: 2 }}>
  
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
          width: { xs: "90%", sm: 473 },
          borderRadius: "30px",
          p: 0,
          position: "relative",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
        },
      }}
    >

      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          bgcolor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { bgcolor: "white" },
        }}
      >
        <CloseIcon sx={{ color: "#262626" }} />
      </IconButton>

      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        <Box sx={{ position: "relative", mb: 3 }}>

          <Box
            sx={{
              width: "100%",
              height: { xs: 200, sm: 190 },
              borderRadius: "30px",
              overflow: "hidden",
              bgcolor: "#f3f4f6",
              mb: 2,
            }}
          >
            <Box
              component="img"
              src={notice.imgURL || notice.imgUrl}
              alt={notice.name}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x200?text=No+Image";
              }}
            />
          </Box>


          <Box
            sx={{
              position: "absolute",
              left: 16,
              top: 16,
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
        </Box>


        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            mb: 2,
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


        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            mb: 3,
          }}
        >

          <Box sx={{ textAlign: "center", minWidth: 60 }}>
            <Typography
              sx={{ fontSize: 10, color: "rgba(38, 38, 38, 0.5)", mb: 0.5 }}
            >
              Name
            </Typography>
            <Typography
              sx={{ fontSize: 12, fontWeight: 500, color: "#262626" }}
            >
              {notice.name || "Unknown"}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center", minWidth: 60 }}>
            <Typography
              sx={{ fontSize: 10, color: "rgba(38, 38, 38, 0.5)", mb: 0.5 }}
            >
              Birthday
            </Typography>
            <Typography
              sx={{ fontSize: 12, fontWeight: 500, color: "#262626" }}
            >
              {formatDate(notice.birthday)}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center", minWidth: 60 }}>
            <Typography
              sx={{ fontSize: 10, color: "rgba(38, 38, 38, 0.5)", mb: 0.5 }}
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

          <Box sx={{ textAlign: "center", minWidth: 60 }}>
            <Typography
              sx={{ fontSize: 10, color: "rgba(38, 38, 38, 0.5)", mb: 0.5 }}
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


        <Typography
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "18px",
            color: "#2B2B2A",
            textAlign: "center",
            mb: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {notice.comment || "Adorable furry looking for a loving home."}
        </Typography>


        <Stack spacing={2}>
          {notice.price && notice.price > 0 && (
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#2B2B2A",
                textAlign: "center",
              }}
            >
              ${notice.price}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => onToggleFavorite(notice._id)}
              fullWidth
              sx={{
                height: 48,
                bgcolor: isFavorite ? "#FFF4DF" : "#F6B83D",
                color: isFavorite ? "#F6B83D" : "#FFFFFF",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 16,
                gap: "8px",
                fontFamily: "'Manrope', sans-serif",
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
              fullWidth
              sx={{
                height: 48,
                bgcolor: "#FFF4DF",
                color: "#F6B83D",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "'Manrope', sans-serif",
                "&:hover": { bgcolor: "#fee8c1" },
              }}
            >
              Contact
            </Button>
          </Box>
        </Stack>
      </Box>
    </Dialog>
  );
};

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
    reset,
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


  React.useEffect(() => {
    if (isOpen) {
      reset({
        avatar: user?.avatar || "",
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "+380",
        avatarFile: undefined,
      });
    }
  }, [isOpen, user, reset]);

  const avatarUrl = watch("avatar");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      
      setValue("avatarFile", file);

      
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
          fontSize: { xs: 20, sm: 24 },
          fontWeight: 700,
          color: "#262626",
          mb: 3,
          fontFamily: "'Manrope', sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        Edit information
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSave)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >

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


        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.5,
          }}
        >
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
              color: "#F6B83D",
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
            py: 1.5,
            bgcolor: "#F6B83D",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: 16,
            textTransform: "none",
            mt: 2,
            fontFamily: "'Manrope', sans-serif",
            "&:hover": { bgcolor: "#e5a52e" },
          }}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
};


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
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: "#262626",
          mb: 4,
          fontFamily: "'Manrope', sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        Already leaving?
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onLogout}
          fullWidth
          sx={{
            bgcolor: "#F6B83D",
            color: "white",
            borderRadius: "100px",
            height: 48,
            fontWeight: 700,
            textTransform: "none",
            fontFamily: "'Manrope', sans-serif",
            "&:hover": { bgcolor: "#e5a52e" },
          }}
        >
          Yes
        </Button>
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            bgcolor: "rgba(38, 38, 38, 0.05)",
            color: "#262626",
            borderRadius: "100px",
            height: 48,
            fontWeight: 700,
            textTransform: "none",
            fontFamily: "'Manrope', sans-serif",
            "&:hover": { bgcolor: "rgba(38, 38, 38, 0.1)" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};


export const ModalCongrats = ({
  isOpen,
  onClose,
  title = "Congrats",
  text,
  buttonText = "Go to profile",
}) => {
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
        <Box
          component="img"
          src="/cat-success.webp" // Using a generic success image or similar
          sx={{ width: 44, height: 44, objectFit: "contain" }}
          onError={(e) => {
            // Fallback to emoji if image is missing
            e.target.style.display = "none";
            e.target.parentElement.innerHTML =
              '<span style="font-size: 32px">🐱</span>';
          }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#F6B83D", // Match image color
          mb: 2,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "#262626",
          fontSize: 16,
          fontWeight: 500,
          lineHeight: "22px",
          mb: 4,
          fontFamily: "'Manrope', sans-serif",
          px: 2,
        }}
      >
        {text ||
          "The first fluff in the favorites! May your friendship be the happiest and filled with fun."}
      </Typography>

      <Button
        component={RouterLink}
        to="/profile"
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
          fontSize: 16,
          "&:hover": { bgcolor: "#e5a52e" },
        }}
      >
        {buttonText}
      </Button>
    </Dialog>
  );
};

export const ModalDeletePet = ({ isOpen, onClose, onDelete }) => {
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
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6H5H21"
            stroke="#F6B83D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
            stroke="#F6B83D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>

      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: "#262626",
          mb: 2,
          fontFamily: "'Manrope', sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        Delete pet?
      </Typography>
      <Typography
        sx={{
          color: "rgba(38, 38, 38, 0.8)",
          fontSize: 14,
          lineHeight: "1.5",
          mb: 4,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        Are you sure you want to remove this pet? This action cannot be undone.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onDelete}
          fullWidth
          sx={{
            bgcolor: "#F6B83D",
            color: "white",
            borderRadius: "100px",
            height: 48,
            fontWeight: 700,
            textTransform: "none",
            fontFamily: "'Manrope', sans-serif",
            "&:hover": { bgcolor: "#e5a52e" },
          }}
        >
          Yes
        </Button>
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            bgcolor: "rgba(38, 38, 38, 0.05)",
            color: "#262626",
            borderRadius: "100px",
            height: 48,
            fontWeight: 700,
            textTransform: "none",
            fontFamily: "'Manrope', sans-serif",
            "&:hover": { bgcolor: "rgba(38, 38, 38, 0.1)" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};
