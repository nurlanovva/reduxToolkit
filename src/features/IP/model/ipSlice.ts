import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IpState {
  address: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IpState = {
  address: '',
  status: 'idle',
  error: null,
};

export const fetchIp = createAsyncThunk('ip/fetchIp', async () => {
  const response = await axios.get<{ ip: string }>('https://api.ipify.org?format=json');
  return response.data;
});

const ipSlice = createSlice({
  name: 'ip',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIp.fulfilled, (state, action: PayloadAction<{ ip: string }>) => {
        state.status = 'succeeded';
        state.address = action.payload.ip;
      })
      .addCase(fetchIp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch IP address';
      });
  },
});

export default ipSlice.reducer;
