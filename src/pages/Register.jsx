import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SEO from "../components/SEO";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch("password", "");
  const isPasswordSecure =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const onSubmit = async (data) => {
    try {
      setError("");
      const { confirmPassword, ...registerData } = data;
      const response = await axios.post(
        "https://petlove.b.goit.study/api/users/signup",
        registerData,
      );
      dispatch(
        setCredentials({ user: response.data, token: response.data.token }),
      );
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#F9F9F9",
        px: { xs: 2, lg: "64px" },
        py: { xs: 2, lg: "16px" },
        minHeight: "calc(100vh - 130px)",
      }}
    >
      <SEO
        title="Registration"
        description="Join PetLove today! Create an account to start finding your perfect pet companion and share your love for animals."
      />
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          maxWidth: "1216px",
          mx: "auto",
          gap: { xs: 2, md: 4, lg: 8 },
        }}
      >
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            bgcolor: "#F6B83D",
            height: { xs: "280px", sm: "302px", md: "654px" },
            borderRadius: { xs: "30px", md: "60px" },
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/bg.png"
            alt=""
            sx={{
              scale: { xs: 1.1, sm: 1.3, md: 0.9 },
              position: "absolute",
              width: { xs: "120%", sm: "100%", md: "512px" },
              height: "auto",
              left: { xs: "-10%", sm: "0", md: "40px" },
              top: { xs: "-10px", md: "-6px" },
              objectFit: "contain",
              opacity: 0.8,
            }}
          />

          <Box
            component="img"
            src="/register cat.webp"
            alt="Pet illustration"
            sx={{
              scale: { xs: 1.1, sm: 1.2, md: 1.4 },
              position: "absolute",
              width: { xs: "240px", sm: "320px", md: "512px" },
              height: "auto",
              left: { xs: "50%", md: "auto" },
              right: { xs: "auto", md: "40px" },
              transform: { xs: "translateX(-50%)", md: "none" },
              top: { xs: "40px", sm: "60px", md: "260px" },
              objectFit: "contain",
            }}
          />

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              width: "294px",
              height: "121px",
              left: { sm: "16px", md: "60px" },
              bottom: { sm: "20px", md: "40px" },
              bgcolor: "#FFFFFF",
              borderRadius: "20px",
              zIndex: 5,
              transform: { sm: "scale(0.9)", md: "none" },
              transformOrigin: "bottom left",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "60px",
                height: "60px",
                left: "16px",
                top: "16px",
                bgcolor: "#FFF4DF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "32px" }}>🐈</Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: "84px",
                top: "19px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "48px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#F6B83D",
                  }}
                >
                  Jack
                </Typography>
                <Box sx={{ display: "flex", gap: "4px" }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "rgba(38, 38, 38, 0.5)",
                    }}
                  >
                    Birthday:
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#262626" }}>
                    18.10.2021
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgba(38, 38, 38, 0.8)",
                  maxWidth: "194px",
                }}
              >
                Jack is a gray Persian cat with green eyes. He loves to be
                pampered and groomed.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Stack
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#FFFFFF",
            borderRadius: { xs: "30px", md: "60px" },
            p: { xs: 3, sm: 5, md: 6 },
            minHeight: { xs: "auto", sm: "560px", md: "654px" },
          }}
        >
          <Box sx={{ maxWidth: 424, width: "100%" }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                color: "#262626",
                fontSize: { xs: "32px", md: "54px" },
                fontWeight: 700,
              }}
            >
              Registration
            </Typography>
            <Typography
              sx={{
                color: "rgba(38, 38, 38, 0.5)",
                mb: 4,
                fontSize: { xs: "14px", md: "18px" },
              }}
            >
              Thank you for your interest in our platform!
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {error && (
                <Alert severity="error" sx={{ borderRadius: "12px" }}>
                  {error}
                </Alert>
              )}

              <TextField
                {...register("name")}
                placeholder="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    height: "52px",
                    fontFamily: "'Manrope', sans-serif",
                    "& fieldset": { borderColor: "rgba(38,38,38,0.15)" },
                    "&:hover fieldset": { borderColor: "rgba(38,38,38,0.35)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F6B83D",
                      borderWidth: "1.5px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "0 18px",
                    fontFamily: "'Manrope', sans-serif",
                    "&::placeholder": {
                      color: "rgba(38,38,38,0.4)",
                      opacity: 1,
                    },
                  },
                }}
              />

              <TextField
                {...register("email")}
                placeholder="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    height: "52px",
                    fontFamily: "'Manrope', sans-serif",
                    "& fieldset": { borderColor: "rgba(38,38,38,0.15)" },
                    "&:hover fieldset": { borderColor: "rgba(38,38,38,0.35)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F6B83D",
                      borderWidth: "1.5px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "0 18px",
                    fontFamily: "'Manrope', sans-serif",
                    "&::placeholder": {
                      color: "rgba(38,38,38,0.4)",
                      opacity: 1,
                    },
                  },
                }}
              />

              <TextField
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                fullWidth
                error={!!errors.password}
                helperText={
                  errors.password ? (
                    errors.password.message
                  ) : isPasswordSecure ? (
                    <Typography
                      component="span"
                      sx={{ color: "#08aa43", fontSize: "12px" }}
                    >
                      Password is secure
                    </Typography>
                  ) : null
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    height: "52px",
                    fontFamily: "'Manrope', sans-serif",
                    "& fieldset": { borderColor: "rgba(38,38,38,0.15)" },
                    "&:hover fieldset": { borderColor: "rgba(38,38,38,0.35)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F6B83D",
                      borderWidth: "1.5px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "0 18px",
                    fontFamily: "'Manrope', sans-serif",
                    "&::placeholder": {
                      color: "rgba(38,38,38,0.4)",
                      opacity: 1,
                    },
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#F6B83D" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    height: "52px",
                    fontFamily: "'Manrope', sans-serif",
                    "& fieldset": { borderColor: "rgba(38,38,38,0.15)" },
                    "&:hover fieldset": { borderColor: "rgba(38,38,38,0.35)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F6B83D",
                      borderWidth: "1.5px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "0 18px",
                    fontFamily: "'Manrope', sans-serif",
                    "&::placeholder": {
                      color: "rgba(38,38,38,0.4)",
                      opacity: 1,
                    },
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          sx={{ color: "#F6B83D" }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                fullWidth
                sx={{
                  mt: 2,
                  height: 52,
                  borderRadius: "30px",
                  bgcolor: "#F6B83D",
                  fontSize: "16px",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#e5a52e" },
                }}
              >
                {isSubmitting ? "Registering..." : "Registration"}
              </Button>

              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  fontSize: 14,
                  color: "rgba(38, 38, 38, 0.5)",
                }}
              >
                Already have an account?{" "}
                <MuiLink
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: "#F6B83D",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Login
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Register;
