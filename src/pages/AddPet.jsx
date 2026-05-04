import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { fetchCurrentUser } from "../store/authSlice";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  RadioGroup,
  Radio,
  FormHelperText,
  Stack,
  Container,
} from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  imgURL: yup.string(),
  species: yup.string().required("Species is required"),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD")
    .required("Birthday is required"),
  sex: yup.string().required("Sex is required"),
});

const AddPet = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sex: "female",
    },
  });

  const fileInputRef = React.useRef(null);
  const selectedSex = watch("sex");
  const imgUrlValue = watch("imgURL");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatarFile", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("imgURL", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("species", data.species);
      formData.append("birthday", data.birthday);
      formData.append("sex", data.sex);

      if (data.avatarFile) {
        formData.append("imgURL", data.avatarFile);
      } else if (data.imgURL && !data.imgURL.startsWith("data:")) {
        formData.append("imgURL", data.imgURL);
      }

      await axios.post(
        "https://petlove.b.goit.study/api/users/current/pets/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      dispatch(fetchCurrentUser());
      navigate("/profile");
    } catch (error) {
      console.error("Error adding pet", error);
      alert(error.response?.data?.message || "Error adding pet");
    }
  };

  return (
    <Box sx={{ bgcolor: "#F9F9F9", py: { xs: 2, lg: "32px" } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={4}
          sx={{ width: "100%", alignItems: "stretch" }}
        >
          {/* Left Side: Brand Image Section */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "592px",
              height: "654px",
              bgcolor: "#F6B83D",
              borderRadius: "60px",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* Background Pattern */}
            <Box
              component="img"
              src="/bg.png"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                top: 0,
                left: 0,
                opacity: 0.8,
              }}
            />
            {/* Dog Image */}
            <Box
              component="img"
              src="/add pet dog.png"
              sx={{
                position: "absolute",
                width: "480px",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2,
              }}
            />
          </Box>

          {/* Right Side: Form Section */}
          <Paper
            elevation={0}
            sx={{
              flexGrow: 1,
              borderRadius: "60px",
              bgcolor: "white",
              p: { xs: 4, md: 8, lg: "60px 80px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "28px", lg: "44px" },
                color: "#262626",
                mb: 1,
              }}
            >
              Add pet
            </Typography>
            <Typography
              sx={{
                color: "rgba(38, 38, 38, 0.5)",
                mb: 5,
                fontSize: 16,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Fill in the form below to add your pet.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              {/* Sex Selector Chips */}
              <Box sx={{ mb: 1 }}>
                <RadioGroup row {...register("sex")} sx={{ gap: 2 }}>
                  {[
                    { value: "female", label: "Female", icon: "♀" },
                    { value: "male", label: "Male", icon: "♂" },
                    { value: "multiple", label: "Multiple", icon: "⚧" },
                  ].map((opt) => (
                    <Box
                      key={opt.value}
                      component="label"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        px: 3,
                        py: 1.5,
                        borderRadius: "100px",
                        bgcolor:
                          selectedSex === opt.value ? "#F6B83D" : "#F9F9F9",
                        color: selectedSex === opt.value ? "white" : "#262626",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          bgcolor:
                            selectedSex === opt.value ? "#e5a52e" : "#f0f0f0",
                        },
                      }}
                    >
                      <Radio value={opt.value} sx={{ display: "none" }} />
                      <Typography sx={{ fontSize: 18, lineHeight: 1 }}>
                        {opt.icon}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                        {opt.label}
                      </Typography>
                    </Box>
                  ))}
                </RadioGroup>
                {errors.sex && (
                  <FormHelperText error>{errors.sex.message}</FormHelperText>
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  {...register("imgURL")}
                  placeholder="Pet Image URL"
                  fullWidth
                  error={!!errors.imgURL}
                  helperText={errors.imgURL?.message}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "30px",
                        height: 52,
                        fontFamily: "'Manrope', sans-serif",
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
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    height: 52,
                    px: 3,
                    borderRadius: "100px",
                    bgcolor: "#FFF4DF",
                    color: "#F6B83D",
                    whiteSpace: "nowrap",
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: "none",
                    fontFamily: "'Manrope', sans-serif",
                    "&:hover": { bgcolor: "#fee8c1" },
                  }}
                >
                  Upload photo
                </Button>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...register("title")}
                  placeholder="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "30px",
                        height: 52,
                        fontFamily: "'Manrope', sans-serif",
                      },
                    },
                  }}
                />
                <TextField
                  {...register("name")}
                  placeholder="Pet Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "30px",
                        height: 52,
                        fontFamily: "'Manrope', sans-serif",
                      },
                    },
                  }}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...register("birthday")}
                  placeholder="YYYY-MM-DD"
                  fullWidth
                  error={!!errors.birthday}
                  helperText={errors.birthday?.message}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "30px",
                        height: 52,
                        fontFamily: "'Manrope', sans-serif",
                      },
                    },
                  }}
                />
                <TextField
                  {...register("species")}
                  placeholder="Species"
                  fullWidth
                  error={!!errors.species}
                  helperText={errors.species?.message}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "30px",
                        height: 52,
                        fontFamily: "'Manrope', sans-serif",
                      },
                    },
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 3, justifyContent: "flex-end" }}
              >
                <Button
                  component={RouterLink}
                  to="/profile"
                  sx={{
                    borderRadius: "100px",
                    px: 6,
                    height: 52,
                    bgcolor: "#F9F9F9",
                    color: "rgba(38, 38, 38, 0.5)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontFamily: "'Manrope', sans-serif",
                    "&:hover": { bgcolor: "#f0f0f0" },
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{
                    borderRadius: "100px",
                    px: 6,
                    height: 52,
                    bgcolor: "#F6B83D",
                    fontWeight: 700,
                    textTransform: "none",
                    fontFamily: "'Manrope', sans-serif",
                    "&:hover": { bgcolor: "#e5a52e" },
                  }}
                >
                  {isSubmitting ? "Adding..." : "Submit"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default AddPet;
