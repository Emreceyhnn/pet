import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import { ModalAttention, ModalNotice, ModalCongrats } from "../components/Modals";
import NoticeCard from "../components/NoticeCard";
import { fetchCurrentUser } from "../store/authSlice";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  CircularProgress,
} from "@mui/material";
import CustomPagination from "../components/CustomPagination";
import SEO from "../components/SEO";

const Notices = () => {
  const dispatch = useDispatch();
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  const [search, setSearch] = useState("");
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [sex, setSex] = useState("");
  const [species, setSpecies] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [sortBy, setSortBy] = useState("");


  const [categories, setCategories] = useState([]);
  const [sexOptions, setSexOptions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);


  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const { token, user } = useSelector((state) => state.auth);
  const isAuth = !!token;
  const favoriteIds = user?.noticesFavorites?.map((n) => n._id) || [];


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, sexRes, specRes] = await Promise.all([
          axios.get("https://petlove.b.goit.study/api/notices/categories"),
          axios.get("https://petlove.b.goit.study/api/notices/sex"),
          axios.get("https://petlove.b.goit.study/api/notices/species"),
        ]);
        setCategories(catRes.data);
        setSexOptions(sexRes.data);
        setSpeciesOptions(specRes.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);


  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        let url = `https://petlove.b.goit.study/api/notices?page=${page}&limit=6`;
        if (search) url += `&keyword=${search}`;
        if (category) url += `&category=${category}`;
        if (sex) url += `&sex=${sex}`;
        if (species) url += `&species=${species}`;
        if (locationId?.value) url += `&locationId=${locationId.value}`;
        if (sortBy === "popular") url += `&byPopularity=false`;
        if (sortBy === "unpopular") url += `&byPopularity=true`;
        if (sortBy === "expensive") url += `&byPrice=false`;
        if (sortBy === "cheap") url += `&byPrice=true`;

        const response = await axios.get(url);

        setNotices(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [page, search, category, sex, species, locationId, sortBy]);

  const loadCityOptions = async (inputValue) => {
    if (inputValue.length < 3) return [];

    const formattedInput = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    try {
      const response = await axios.get(
        `https://petlove.b.goit.study/api/cities?keyword=${formattedInput}`,
      );
      return response.data.map((city) => ({
        label: `${city.cityEn}, ${city.stateEn}`,
        value: city._id,
      }));
    } catch {
      return [];
    }
  };

  const handleLearnMore = async (id) => {
    if (!isAuth) {
      setIsAttentionOpen(true);
      return;
    }
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
      if (error.response?.status === 401) {
        dispatch(fetchCurrentUser());
      }
    }
  };

  const handleToggleFavorite = async (id) => {
    if (!isAuth) {
      setIsAttentionOpen(true);
      return;
    }
    try {
      const isFav = favoriteIds.includes(id);
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
      if (!isFav && favoriteIds.length === 0) {
        setIsCongratsOpen(true);
      }
      dispatch(fetchCurrentUser());
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "30px",
      borderColor: "transparent",
      minHeight: "48px",
      boxShadow: "none",
      backgroundColor: "white",
      paddingLeft: "8px",
      "&:hover": { borderColor: "#F6B83D" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "'Manrope', sans-serif",
      fontSize: "16px",
      fontWeight: 500,
      color: "#262626",
    }),
    input: (base) => ({
      ...base,
      fontFamily: "'Manrope', sans-serif",
    }),
    option: (base, state) => ({
      ...base,
      fontFamily: "'Manrope', sans-serif",
      backgroundColor: state.isSelected ? "#F6B83D" : "white",
      textTransform: "capitalize",
      "&:hover": { backgroundColor: "#FFF4DF" },
    }),
    singleValue: (base) => ({
      ...base,
      textTransform: "capitalize",
    }),
  };

  const sortOptions = [
    { value: "popular", label: "Popular" },
    { value: "unpopular", label: "Unpopular" },
    { value: "cheap", label: "Cheap" },
    { value: "expensive", label: "Expensive" },
  ];

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
        title="Find Pets" 
        description="Browse our notices to find your new best friend. Filter by category, gender, type, and location to find the perfect pet for you." 
      />
      <Box sx={{ maxWidth: "1216px", mx: "auto", pt: { xs: "40px", lg: "80px" } }}>
        <Typography
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "32px", lg: "54px" },
            lineHeight: { xs: "32px", lg: "54px" },
            letterSpacing: "-0.03em",
            color: "#262626",
            mb: "40px",
          }}
        >
          Find your favorite pet
        </Typography>


          <Box
            sx={{
              p: { xs: "24px", md: "40px" },
              borderRadius: "30px",
              bgcolor: "#FFF4DF",
              mb: "40px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              mb: "20px",
            }}
          >
            <TextField
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "265px", lg: "230px" },
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  borderRadius: "30px",
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
                  color: "#262626",
                  "&::placeholder": { opacity: 1, color: "#262626" },
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
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="5.75"
                            stroke="#262626"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M13 13L15.5 15.5"
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

            <FormControl sx={{ width: { xs: "calc(50% - 6px)", sm: "170px", lg: "200px" } }}>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                displayEmpty
                IconComponent={() => (
                  <Box
                    sx={{ mr: "14px", pointerEvents: "none", display: "flex" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M4.5 7.5L9 12L13.5 7.5"
                        stroke="#262626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
                sx={{
                  height: "48px",
                  borderRadius: "30px",
                  bgcolor: "white",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#262626",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #F6B83D",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #F6B83D",
                  },
                }}
              >
                <MenuItem value="" sx={{ textTransform: "capitalize" }}>Category</MenuItem>
                {categories?.map((c) => (
                  <MenuItem key={c} value={c} sx={{ textTransform: "capitalize" }}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: { xs: "calc(50% - 6px)", sm: "170px", lg: "190px" } }}>
              <Select
                value={sex}
                onChange={(e) => {
                  setSex(e.target.value);
                  setPage(1);
                }}
                displayEmpty
                IconComponent={() => (
                  <Box
                    sx={{ mr: "14px", pointerEvents: "none", display: "flex" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M4.5 7.5L9 12L13.5 7.5"
                        stroke="#262626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
                sx={{
                  height: "48px",
                  borderRadius: "30px",
                  bgcolor: "white",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#262626",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                <MenuItem value="" sx={{ textTransform: "capitalize" }}>By gender</MenuItem>
                {sexOptions?.map((s) => (
                  <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: { xs: "100%", sm: "170px", lg: "190px" } }}>
              <Select
                value={species}
                onChange={(e) => {
                  setSpecies(e.target.value);
                  setPage(1);
                }}
                displayEmpty
                IconComponent={() => (
                  <Box
                    sx={{ mr: "14px", pointerEvents: "none", display: "flex" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M4.5 7.5L9 12L13.5 7.5"
                        stroke="#262626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
                sx={{
                  height: "48px",
                  borderRadius: "30px",
                  bgcolor: "white",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#262626",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #F6B83D",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #F6B83D",
                  },
                }}
              >
                <MenuItem value="" sx={{ textTransform: "capitalize" }}>By type</MenuItem>
                {speciesOptions?.map((s) => (
                  <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ width: { xs: "100%", sm: "265px", lg: "227px" } }}>
              <AsyncSelect
                loadOptions={loadCityOptions}
                value={locationId}
                onChange={(val) => {
                  setLocationId(val);
                  setPage(1);
                }}
                placeholder="Location"
                styles={{
                  ...selectStyles,
                  control: (base) => ({
                    ...base,
                    ...selectStyles.control(base),
                    width: "100%",
                  }),
                }}
                components={{
                  DropdownIndicator: () => (
                    <Box
                      sx={{ mr: "14px", display: "flex", alignItems: "center" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6.5"
                          stroke="#262626"
                          strokeWidth="2"
                        />
                        <path
                          d="M12.5 12.5L16 16"
                          stroke="#262626"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </Box>
                  ),
                  IndicatorSeparator: () => null,
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "1px",
              bgcolor: "rgba(38, 38, 38, 0.1)",
              mb: "20px",
            }}
          />


          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {sortOptions.map((opt) => (
              <Box
                key={opt.value}
                onClick={() => {
                  setSortBy(sortBy === opt.value ? "" : opt.value);
                  setPage(1);
                }}
                sx={{
                  height: "48px",
                  px: "20px",
                  borderRadius: "30px",
                  bgcolor: sortBy === opt.value ? "#F6B83D" : "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: sortBy === opt.value ? "white" : "#262626",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                  "&:hover": { bgcolor: sortBy === opt.value ? "#e5a52e" : "#fef8e8" },
                }}
              >
                {opt.label}
                {sortBy === opt.value && (
                  <Box sx={{ ml: "8px", display: "flex", alignItems: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M10.5 3.5L3.5 10.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.5 3.5L10.5 10.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>


        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#F6B83D" }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            {notices.map((item) => (
              <Box
                key={item._id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc((100% - 32px) / 2)",
                    lg: "calc((100% - 64px) / 3)",
                  },
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
          </Box>
        )}


        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />

        <ModalAttention
          isOpen={isAttentionOpen}
          onClose={() => setIsAttentionOpen(false)}
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

        <ModalCongrats
          isOpen={isCongratsOpen}
          onClose={() => setIsCongratsOpen(false)}
          text="The first fluff in the favorites! May your friendship be the happiest and filled with fun."
        />
      </Box>
    </Box>
  );
};

export default Notices;
