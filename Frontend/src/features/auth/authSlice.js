import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Direct URL since you're not using .env

// Register user
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          'http://localhost:3000/api/users',
          userData
        );
        return data.user;
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          return rejectWithValue('Cannot connect to server. Is backend running?');
        }
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
      }
    }
  );

// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        { email, password }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Login failed. Invalid credentials.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    logout: (state) => { 
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;