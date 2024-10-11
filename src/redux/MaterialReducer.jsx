// src/formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async operation to save form data using Axios
export const addFormDataAsync = createAsyncThunk(
  "material/addFormDataAsync",
  async (formData) => {
    const response = await axios.post(
      "https://your-api-endpoint.com/materials",
      formData
    );
    return response.data; // Assuming the API returns the saved data
  }
);

const MaterialReducer = createSlice({
  name: "material",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addFormDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFormDataAsync.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add the response data to the state
        state.loading = false;
      })
      .addCase(addFormDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any error messages
      });
  },
});

export default MaterialReducer.reducer;
