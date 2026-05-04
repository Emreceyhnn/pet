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

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(7, "Min 7 characters")
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setError("");
      const response = await axios.post(
        "https://petlove.b.goit.study/api/users/signup",
        data,
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
        bgcolor: "rgba(249, 249, 249, 1)",

        px: { xs: 2, lg: "32px" },
        py: "16px",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          maxWidth: "1216px",
          mx: "auto",
          gap: { md: 4, lg: 8 },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "flex-end",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {/* Exact Figma Layout for Left Card */}
          <Box
            sx={{
              position: "relative",
              width: "592px",
              height: "654px",
              bgcolor: "#F6B83D",
              borderRadius: "60px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/bg.png"
              alt="Pet illustration"
              sx={{
                position: "absolute",
                width: "512px",
                height: "660px",
                left: "40px",
                top: "-6px",
                objectFit: "contain",
              }}
            />

            {/* Pet Image */}
            <Box
              component="img"
              src="/register cat.png"
              alt="Pet illustration"
              sx={{
                scale: 1.4,
                position: "absolute",
                width: "512px",
                height: "660px",
                left: "40px",
                top: "120px",
                objectFit: "contain",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: "294px",
                height: "121px",
                left: "60px",
                top: "450px",
                bgcolor: "#FFFFFF",
                borderRadius: "20px",
              }}
            >
              {/* Image Icon Block */}
              <Box
                sx={{
                  position: "absolute",
                  width: "60px",
                  height: "60px",
                  left: "16px",
                  top: "16px",
                }}
              >
                {/* Ellipse */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "60px",
                    height: "60px",
                    left: "0px",
                    top: "0px",
                    bgcolor: "#FFF4DF",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 800,
                      fontSize: "32px",
                      lineHeight: "32px",
                      letterSpacing: "-0.04em",
                      color: "#FFFFFF",
                    }}
                  >
                    🐈
                  </Typography>
                </Box>
              </Box>

              {/* Text Block */}
              <Box
                sx={{
                  position: "absolute",
                  width: "194px",
                  height: "84px",
                  left: "84px",
                  top: "19px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                {/* Top row: Name & Birthday */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "48px",
                    width: "194px",
                    height: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "20px",
                      letterSpacing: "-0.03em",
                      color: "#F6B83D",
                    }}
                  >
                    Jack
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: "4px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "14px",
                        letterSpacing: "-0.02em",
                        color: "rgba(38, 38, 38, 0.5)",
                      }}
                    >
                      Birthday:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "14px",
                        letterSpacing: "-0.02em",
                        color: "#262626",
                      }}
                    >
                      18.10.2021
                    </Typography>
                  </Box>
                </Box>

                {/* Description */}
                <Typography
                  sx={{
                    width: "194px",
                    height: "56px",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "14px",
                    letterSpacing: "-0.02em",
                    color: "rgba(38, 38, 38, 0.8)",
                  }}
                >
                  Jack is a gray Persian cat with green eyes. He loves to be
                  pampered and groomed, and enjoys playing with toys.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right: Form */}
        <Stack
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255, 255, 255, 1)",
            borderRadius: "60px",
          }}
        >
          <Box sx={{ maxWidth: 424, width: "100%" }}>
            <Typography variant="h2" sx={{ mb: 2, color: "#262626" }}>
              Registration
            </Typography>
            <Typography sx={{ color: "rgba(38, 38, 38, 0.5)", mb: 4 }}>
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
                slotProps={{ input: { sx: { borderRadius: "30px", px: 1 } } }}
              />

              <TextField
                {...register("email")}
                placeholder="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                slotProps={{ input: { sx: { borderRadius: "30px", px: 1 } } }}
              />

              <TextField
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    sx: { borderRadius: "30px" },
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
                slotProps={{
                  input: {
                    sx: { borderRadius: "30px" },
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
                  height: 48,
                  borderRadius: "30px",
                  bgcolor: "#F6B83D",
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
