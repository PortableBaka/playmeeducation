import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoggedUser } from "./authUser";
import instance from "../api/instance";

export const authorizeSuperAdmin = createAsyncThunk(
  "superAdmin/authorizeSuperAdmin",
  async (values, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/auth/login`, values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setLoggedUser(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorizeSuperAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorizeSuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(authorizeSuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = superAdminSlice.actions;
export default superAdminSlice.reducer;
