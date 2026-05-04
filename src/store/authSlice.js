import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://petlove.b.goit.study/api';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/users/signin`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;
  if (!token) return rejectWithValue('No token');
  
  try {
    const response = await axios.get(`${API_URL}/users/current/full`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message, status: error.response?.status });
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;
  if (!token) return rejectWithValue('No token');
  
  try {
    await axios.post(`${API_URL}/users/signout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return null;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getInitialToken = () => {
  const token = localStorage.getItem('token');
  if (token === 'null' || token === 'undefined' || !token) return null;
  return token;
};

const initialState = {
  user: null,
  token: getInitialToken(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutClient: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
    },
    setCredentials: (state, action) => {
      // Handle different response structures: { user: {...}, token: "..." } or { ...userFields, token: "..." }
      if (action.payload.user) {
        state.user = action.payload.user;
      } else {
        const { token, ...user } = action.payload;
        state.user = user;
      }
      state.token = action.payload.token;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          const { token, ...user } = action.payload;
          state.user = user;
        }
        state.token = action.payload.token;
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          const { token, ...user } = action.payload;
          state.user = user;
        }
        state.token = action.payload.token;
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        
        // ONLY logout if it's an authentication error (401)
        const isAuthError = 
          (action.payload && action.payload.status === 401) || 
          (action.error && action.error.message && action.error.message.includes('401'));
          
        if (isAuthError) {
          state.user = null;
          state.token = null;
          localStorage.removeItem('token');
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(logoutUser.rejected, (state) => {
        // Even if the server logout fails, we clear the client session
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { clearError, logoutClient, setCredentials } = authSlice.actions;
export default authSlice.reducer;
