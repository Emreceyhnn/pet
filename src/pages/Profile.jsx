import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient } from "../store/authSlice";
import { Link as RouterLink } from "react-router-dom";
import {
  ModalNotice,
  ModalEditProfile,
  ModalLogout,
  ModalDeletePet,
  ModalCongrats,
} from "../components/Modals";
import NoticeCard from "../components/NoticeCard";
import axios from "axios";
import { fetchCurrentUser } from "../store/authSlice";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

const Profile = () => {
  const { user, token, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("favorites");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const handleLogout = () => {
    dispatch(logoutClient());
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  const handleEditProfile = async (data) => {
    try {
      if (data.avatarFile) {

        const formData = new FormData();
        formData.append("name",   data.name);
        formData.append("email",  data.email);
        formData.append("phone",  data.phone);
        formData.append("avatar", data.avatarFile);

        await axios.patch(
          "https://petlove.b.goit.study/api/users/current/edit",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {

        const body = {
          name:  data.name,
          email: data.email,
          phone: data.phone,
          ...(data.avatar && !data.avatar.startsWith("data:")
            ? { avatar: data.avatar }
            : {}),
        };

        await axios.patch(
          "https://petlove.b.goit.study/api/users/current/edit",
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
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile", error.response?.data);
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  const handleRemovePet = async () => {
    if (!petToDelete) return;
    try {
      await axios.delete(
        `https://petlove.b.goit.study/api/users/current/pets/remove/${petToDelete}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(fetchCurrentUser());
      setIsDeleteModalOpen(false);
      setPetToDelete(null);
    } catch (error) {
      console.error("Error removing pet", error);
    }
  };

  const confirmDeletePet = (petId) => {
    setPetToDelete(petId);
    setIsDeleteModalOpen(true);
  };

  const handleToggleFavorite = async (id) => {
    try {
      const isFav = user?.noticesFavorites?.some((n) => n._id === id);
      if (isFav) {
        await axios.delete(
          `https://petlove.b.goit.study/api/notices/favorites/remove/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        await axios.post(
          `https://petlove.b.goit.study/api/notices/favorites/add/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
      if (!isFav && (!user?.noticesFavorites || user.noticesFavorites.length === 0)) {
        setIsCongratsOpen(true);
      }
      dispatch(fetchCurrentUser());
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleLearnMore = async (id) => {
    try {
      const res = await axios.get(
        `https://petlove.b.goit.study/api/notices/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSelectedNotice(res.data);
    } catch (error) {
      console.error("Error fetching notice details:", error);
    }
  };

  const activeNotices =
    activeTab === "favorites"
      ? user?.noticesFavorites || []
      : user?.noticesViewed || [];
  const favoriteIds = user?.noticesFavorites?.map((n) => n._id) || [];

  return (
    <Box sx={{ bgcolor: "#F9F9F9", minHeight: "100vh", px: { xs: 2, lg: "64px" }, py: { xs: 4, lg: 4 } }}>
      <Box sx={{ maxWidth: "1216px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >

          <Paper
            elevation={0}
            sx={{
              width: { xs: "100%", lg: 440 },
              borderRadius: "40px",
              bgcolor: "white",
              p: 4,
              position: { xs: "relative", lg: "sticky" },
              top: { lg: 32 },
              flexShrink: 0,
            }}
          >

            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                bgcolor: "#F6B83D",
                color: "white",
                borderRadius: "30px",
                px: 2,
                py: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                User
              </Typography>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M13.5 14.25V13.5C13.5 12.7044 13.1839 11.9413 12.6213 11.3787C12.0587 10.8161 11.2956 10.5 10.5 10.5H7.5C6.70435 10.5 5.94129 10.8161 5.37868 11.3787C4.81607 11.9413 4.5 12.7044 4.5 13.5V14.25"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8.25C10.2426 8.25 11.25 7.24264 11.25 6C11.25 4.75736 10.2426 3.75 9 3.75C7.75736 3.75 6.75 4.75736 6.75 6C6.75 7.24264 7.75736 8.25 9 8.25Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>


            <IconButton
              onClick={() => setIsEditModalOpen(true)}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                bgcolor: "#FFF4DF",
                color: "#F6B83D",
                width: 38,
                height: 38,
                "&:hover": { bgcolor: "#fee8c1" },
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M12.375 2.625C12.5717 2.42826 12.8053 2.27218 13.0624 2.16568C13.3195 2.05917 13.595 2.00431 13.8731 2.00431C14.1513 2.00431 14.4267 2.05917 14.6838 2.16568C14.941 2.27218 15.1745 2.42826 15.3712 2.625C15.568 2.82174 15.7241 3.05531 15.8306 3.31245C15.9371 3.56958 15.992 3.8452 15.992 4.12332C15.992 4.40145 15.9371 4.67706 15.8306 4.9342C15.7241 5.19133 15.568 5.42491 15.3712 5.62165L5.4375 15.5587L2.00625 16.5L2.9475 13.0688L12.375 2.625Z"
                  stroke="#F6B83D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>


            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 6,
                mb: 4,
              }}
            >
              <Avatar
                src={user?.avatar || user?.avatarURL}
                sx={{
                  width: 110,
                  height: 110,
                  bgcolor: "#FFF4DF",
                  color: "#F6B83D",
                }}
              >
                {!(user?.avatar || user?.avatarURL) && (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"
                      fill="#F6B83D"
                    />
                  </svg>
                )}
              </Avatar>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#262626",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setIsEditModalOpen(true)}
              >
                Upload photo
              </Typography>
            </Box>


            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "#262626",
                mb: 2.5,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              My information
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 5 }}>
              {[
                { value: user?.name || "Name" },
                { value: user?.email || "Email" },
                { value: user?.phone || "+380" },
              ].map((field, idx) => (
                <Box
                  key={idx}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: "30px",
                    border: "1px solid rgba(38, 38, 38, 0.15)",
                    fontSize: 16,
                    color: "#262626",
                  }}
                >
                  {field.value}
                </Box>
              ))}
            </Stack>


            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#262626",
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                My pets
              </Typography>
              <Button
                component={RouterLink}
                to="/add-pet"
                variant="contained"
                sx={{
                  bgcolor: "#F6B83D",
                  borderRadius: "100px",
                  height: 40,
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: "none",
                  px: 3,
                  "&:hover": { bgcolor: "#e5a52e" },
                }}
              >
                Add pet +
              </Button>
            </Box>


            <Stack spacing={1.5} sx={{ mb: 6 }}>
              {user?.pets?.map((pet) => (
                <Box
                  key={pet._id}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: "20px",
                    border: "1px solid rgba(38, 38, 38, 0.08)",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={pet.imgURL || pet.imgUrl}
                    sx={{ width: 60, height: 60, borderRadius: "50%" }}
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      sx={{ fontWeight: 700, color: "#262626", fontSize: 16 }}
                    >
                      {pet.name}
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(38, 38, 38, 0.5)", fontSize: 12 }}
                    >
                      {pet.species}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => confirmDeletePet(pet._id)}
                    sx={{
                      bgcolor: "#FFF4DF",
                      color: "#F6B83D",
                      width: 38,
                      height: 38,
                      "&:hover": { bgcolor: "#fee8c1" },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Button
              onClick={() => setIsLogoutModalOpen(true)}
              sx={{
                py: 1.5,
                px: 5,
                borderRadius: "100px",
                bgcolor: "#FFF4DF",
                color: "#F6B83D",
                fontWeight: 700,
                textTransform: "uppercase",
                fontFamily: "'Manrope', sans-serif",
                "&:hover": { bgcolor: "#fee8c1" },
              }}
            >
              LOG OUT
            </Button>
          </Paper>


          <Box sx={{ flexGrow: 1, minWidth: 0, minHeight: "80vh" }}>
            <Stack spacing={3}>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  pb: 1,
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                }}
              >
                <Button
                  onClick={() => setActiveTab("favorites")}
                  sx={{
                    borderRadius: "100px",
                    px: { xs: 3, sm: 3.5 },
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: 14, sm: 16 },
                    bgcolor: activeTab === "favorites" ? "#F6B83D" : "white",
                    color: activeTab === "favorites" ? "white" : "#262626",
                    flexShrink: 0,
                    "&:hover": {
                      bgcolor:
                        activeTab === "favorites" ? "#e5a52e" : "#f5f5f5",
                    },
                  }}
                >
                  My favorite pets
                </Button>
                <Button
                  onClick={() => setActiveTab("viewed")}
                  sx={{
                    borderRadius: "100px",
                    px: { xs: 3, sm: 3.5 },
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: 14, sm: 16 },
                    bgcolor: activeTab === "viewed" ? "#F6B83D" : "white",
                    color: activeTab === "viewed" ? "white" : "#262626",
                    flexShrink: 0,
                    "&:hover": {
                      bgcolor: activeTab === "viewed" ? "#e5a52e" : "#f5f5f5",
                    },
                  }}
                >
                  Viewed
                </Button>
              </Box>


              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(2, 1fr)",
                  },
                  gap: "24px",
                  minHeight: 400,
                }}
              >
                {activeNotices.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <NoticeCard
                      item={item}
                      isFavorite={favoriteIds.includes(item._id)}
                      onToggleFavorite={handleToggleFavorite}
                      onLearnMore={handleLearnMore}
                    />
                  </Box>
                ))}
                {activeNotices.length === 0 && !isLoading && (
                  <Box
                    sx={{
                      gridColumn: "1 / -1",
                      width: "100%",
                      textAlign: "center",
                      maxWidth: "400px",
                      mx: "auto",
                      pt: 15,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#262626",
                        fontSize: 16,
                        lineHeight: "22px",
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      Oops,{" "}
                      <Box component="span" sx={{ color: "#F6B83D" }}>
                        looks like there aren't any furries
                      </Box>{" "}
                      on our adorable page yet. Do not worry! View your pets
                      on the "find your favorite pet" page and add them to
                      your favorites.
                    </Typography>
                  </Box>
                )}
                {isLoading && (
                  <Box sx={{ gridColumn: "1 / -1", width: "100%", display: "flex", justifyContent: "center", pt: 15 }}>
                    <CircularProgress sx={{ color: "#F6B83D" }} />
                  </Box>
                )}
              </Box>

            </Stack>
          </Box>
        </Box>

        <ModalEditProfile
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onSave={handleEditProfile}
        />

        <ModalLogout
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onLogout={handleLogout}
        />

        <ModalDeletePet
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setPetToDelete(null);
          }}
          onDelete={handleRemovePet}
        />

        <ModalCongrats
          isOpen={isCongratsOpen}
          onClose={() => setIsCongratsOpen(false)}
          text="The first fluff in the favorites! May your friendship be the happiest and filled with fun."
        />

        <ModalNotice
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          notice={selectedNotice}
          isFavorite={
            selectedNotice ? favoriteIds.includes(selectedNotice._id) : false
          }
          onToggleFavorite={handleToggleFavorite}
        />
      </Box>
    </Box>
  );
};

export default Profile;
