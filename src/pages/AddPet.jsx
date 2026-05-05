import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { fetchCurrentUser } from "../store/authSlice";
import {
  Stack,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ModalCongrats } from "../components/Modals";
import SEO from "../components/SEO";


const schema = yup.object({
  name: yup.string().required("Pet's name is required"),
  title: yup.string().required("Title is required"),
  imgURL: yup.string().url("Enter a valid URL").nullable(),
  species: yup.string().required("Type of pet is required"),
  birthday: yup
    .string()
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, "Use DD.MM.YYYY format")
    .required("Birthday is required"),
  sex: yup.string().required("Sex is required"),
});


const SPECIES = [
  "dog", "cat", "monkey", "bird", "snake", "turtle",
  "lizard", "frog", "fish", "ants", "bees", "butterfly", "spider", "scorpion",
];


const GENDERS = [
  { value: "female", icon: "♀", color: "#F43F5E", bg: "#FFF0F3", activeBg: "#F43F5E" },
  { value: "male",   icon: "♂", color: "#3B82F6", bg: "#EFF6FF", activeBg: "#3B82F6" },
  { value: "multiple", icon: "⚥", color: "#6B7280", bg: "#F3F4F6", activeBg: "#6B7280" },
];


const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    height: "52px",
    fontFamily: "'Manrope', sans-serif",
    fontSize: "14px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(38,38,38,0.15)" },
    "&:hover fieldset": { borderColor: "rgba(38,38,38,0.35)" },
    "&.Mui-focused fieldset": { borderColor: "#F6B83D", borderWidth: "1.5px" },
  },
  "& .MuiOutlinedInput-input": {
    padding: "0 18px",
    fontFamily: "'Manrope', sans-serif",
    "&::placeholder": { color: "rgba(38,38,38,0.4)", opacity: 1 },
  },
  "& .MuiFormHelperText-root": { fontFamily: "'Manrope', sans-serif", fontSize: "11px" },
};


const toApiDate = (str) => {
  const [d, m, y] = str.split(".");
  return `${y}-${m}-${d}`;
};


const AddPet = () => {
  const { token } = useSelector((s) => s.auth);
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);

  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile]       = useState(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { sex: "female", species: "" },
  });

  const selectedSex = watch("sex");
  const imgUrlValue = watch("imgURL");


  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };


  const onSubmit = async (data) => {
    try {
      if (avatarFile) {

        const fd = new FormData();
        fd.append("name",     data.name);
        fd.append("title",    data.title);
        fd.append("species",  data.species);
        fd.append("birthday", toApiDate(data.birthday));
        fd.append("sex",      data.sex);
        fd.append("imgURL",   avatarFile);

        await axios.post(
          "https://petlove.b.goit.study/api/users/current/pets/add",
          fd,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {

        const body = {
          name:     data.name,
          title:    data.title,
          species:  data.species,
          birthday: toApiDate(data.birthday),
          sex:      data.sex,
          ...(data.imgURL ? { imgURL: data.imgURL } : {}),
        };

        await axios.post(
          "https://petlove.b.goit.study/api/users/current/pets/add",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      dispatch(fetchCurrentUser());
      setIsCongratsOpen(true);

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Error adding pet");
    }
  };


  const avatarSrc = avatarPreview || (imgUrlValue && !imgUrlValue.startsWith("data:") ? imgUrlValue : null);

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
        title="Add Pet" 
        description="Share your pet with the PetLove community! Add your pet's details and photos to find them a new friend or just show them off." 
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
            src="/add pet dog.webp"
            alt="Pet illustration"
            sx={{
              scale: { xs: 1.1, sm: 1.2, md: 1.45 },
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
        </Box>


        <Box
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
          <Box sx={{ maxWidth: { xs: "100%", md: 424, lg: 600 }, width: "100%" }}>

          <Box sx={{ mb: "32px" }}>
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: { xs: "24px", sm: "36px" },
                fontWeight: 700,
                color: "#262626",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Add my pet{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: "16px", sm: "20px" },
                  color: "rgba(38,38,38,0.4)",
                  fontStyle: "italic",
                  letterSpacing: 0,
                }}
              >
                / Personal details
              </Box>
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >

            <Box sx={{ display: "flex", gap: "8px", mb: "4px" }}>
              {GENDERS.map((g) => {
                const isActive = selectedSex === g.value;
                return (
                  <Box
                    key={g.value}
                    component="label"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      bgcolor: isActive ? g.activeBg : g.bg,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": { opacity: 0.85 },
                    }}
                  >
                    <input
                      type="radio"
                      value={g.value}
                      {...register("sex")}
                      style={{ display: "none" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: isActive ? "#fff" : g.color,
                        lineHeight: 1,
                        fontWeight: 600,
                        userSelect: "none",
                      }}
                    >
                      {g.icon}
                    </Typography>
                  </Box>
                );
              })}
            </Box>


            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: "4px" }}>
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  bgcolor: avatarSrc ? "transparent" : "#FFF4DF",
                  border: avatarSrc ? "none" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  flexShrink: 0,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 0.85 },
                }}
              >
                {avatarSrc ? (
                  <Box
                    component="img"
                    src={avatarSrc}
                    alt="avatar"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (

                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <ellipse cx="9" cy="11" rx="3.5" ry="4.5" fill="#F6B83D" />
                    <ellipse cx="17" cy="8"  rx="3.5" ry="4.5" fill="#F6B83D" />
                    <ellipse cx="25" cy="11" rx="3.5" ry="4.5" fill="#F6B83D" />
                    <path
                      d="M6 20c0-4.5 3-7 6-7 1.5 0 3 .7 4 1.7 1-1 2.5-1.7 4-1.7 3 0 6 2.5 6 7 0 3.5-3.5 7-10 10C8.5 27 6 23.5 6 20Z"
                      fill="#F6B83D"
                    />
                  </svg>
                )}
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Box>


            <Box sx={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <TextField
                {...register("imgURL")}
                placeholder="Enter URL"
                fullWidth
                error={!!errors.imgURL}
                helperText={errors.imgURL?.message}
                sx={inputSx}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  flexShrink: 0,
                  height: "52px",
                  px: "18px",
                  borderRadius: "30px",
                  bgcolor: "#FFF4DF",
                  color: "#F6B83D",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "#fee8c1" },
                }}
              >
                Upload photo&nbsp;
                <Box component="span" sx={{ fontSize: "16px" }}>↑</Box>
              </Button>
            </Box>


            <TextField
              {...register("title")}
              placeholder="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={inputSx}
            />


            <TextField
              {...register("name")}
              placeholder="Pet's Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={inputSx}
            />


            <Box sx={{ display: "flex", gap: "8px" }}>
              {/* Birthday */}
              <TextField
                {...register("birthday")}
                placeholder="00.00.0000"
                fullWidth
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                sx={{
                  ...inputSx,
                  flex: 1,
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayOutlinedIcon
                          sx={{ fontSize: "18px", color: "#F6B83D" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Species select */}
              <Controller
                name="species"
                control={control}
                render={({ field }) => (
                  <Box sx={{ flex: 1, position: "relative" }}>
                    <Select
                      {...field}
                      displayEmpty
                      fullWidth
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        borderRadius: "30px",
                        height: "52px",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "14px",
                        bgcolor: "#fff",
                        color: field.value ? "#262626" : "rgba(38,38,38,0.4)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: errors.species
                            ? "#d32f2f"
                            : "rgba(38,38,38,0.15)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(38,38,38,0.35)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#F6B83D",
                          borderWidth: "1.5px",
                        },
                        "& .MuiSelect-select": {
                          paddingLeft: "18px",
                        },
                        "& .MuiSelect-icon": {
                          color: "rgba(38,38,38,0.5)",
                          right: "14px",
                        },
                      }}
                      renderValue={(v) =>
                        v ? v : (
                          <span style={{ color: "rgba(38,38,38,0.4)" }}>
                            Type of pet
                          </span>
                        )
                      }
                      MenuProps={{
                        slotProps: {
                          paper: {
                            sx: {
                              borderRadius: "16px",
                              mt: "4px",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                              "& .MuiMenuItem-root": {
                                fontFamily: "'Manrope', sans-serif",
                                fontSize: "14px",
                                py: "10px",
                                px: "20px",
                                "&:hover": { bgcolor: "#FFF4DF" },
                                "&.Mui-selected": {
                                  bgcolor: "#FFF4DF",
                                  color: "#F6B83D",
                                  fontWeight: 600,
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      {SPECIES.map((s) => (
                        <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.species && (
                      <Typography
                        sx={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "11px",
                          color: "#d32f2f",
                          mt: "3px",
                          ml: "14px",
                        }}
                      >
                        {errors.species.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>


            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: "8px",
                mt: "8px",
                mb: "40px",
              }}
            >
              <Button
                component={RouterLink}
                to="/profile"
                sx={{
                  height: "52px",
                  px: "48px",
                  borderRadius: "30px",
                  bgcolor: "#F9F9F9",
                  color: "rgba(38,38,38,0.6)",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "none",
                  border: "1px solid rgba(38,38,38,0.1)",
                  "&:hover": { bgcolor: "#f0f0f0" },
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{
                  height: "52px",
                  px: "48px",
                  borderRadius: "30px",
                  bgcolor: "#F6B83D",
                  color: "#fff",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#e5a52e" },
                  "&:disabled": { bgcolor: "#fad88f", color: "#fff" },
                }}
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </Button>
            </Box>
          </Box>
          </Box>
        </Box>
      </Stack>

      <ModalCongrats
        isOpen={isCongratsOpen}
        onClose={() => {
          setIsCongratsOpen(false);
          navigate("/profile");
        }}
        title="Congrats"
        text="Your pet has been successfully added! May your friendship be the happiest and filled with fun."
      />
    </Box>
  );
};

export default AddPet;
