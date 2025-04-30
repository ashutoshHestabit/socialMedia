import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const fetchComments = createAsyncThunk('comments/fetch', async () => {
  const { data } = await axios.get(`${API}/api/comments`);
  return Array.isArray(data) ? data : [];
});

export const createComment = createAsyncThunk(
  'comments/create',
  async (comment) => {
    const { data } = await axios.post(`${API}/api/comments`, comment);
    return data.comment;
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: { items: [], status: 'idle' },
  extraReducers: (b) => {
    b.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(createComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});

export default commentSlice.reducer;
