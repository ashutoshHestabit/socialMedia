import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const { data } = await axios.get(`${API}/api/posts`);
  // data should be an array—no HTML
  return data;
});

export const createPost = createAsyncThunk('posts/create', async (post) => {
  const { data } = await axios.post(`${API}/api/posts`, post);
  return data.post;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: { items: [], status: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.items = Array.isArray(payload) ? payload : [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.items.unshift(payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
