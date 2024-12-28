import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/instance";

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (branchFormData, { rejectedWithValue }) => {
    try {
      const response = await instance.post(`/branches`, branchFormData);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const editBranch = createAsyncThunk(
  "branch/editBranch",
  async (selectedBranch, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/branches/${selectedBranch?.id}`,
        selectedBranch
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const retrieveBranchDataById = createAsyncThunk(
  "branch/retrieveBranchDataById",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/branches/${branchId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    createBranch: null,
    data: null,
    selectedBranchId: localStorage.getItem("selectedBranchId") || null,
  },
  reducers: {
    logout: (state) => {
      state.error = null;
    },
    setSelectedBranchId: (state, action) => {
      state.selectedBranchId = action.payload;
      localStorage.setItem("selectedBranchId", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.createBranch = action.payload;
        state.status = "succeeded";
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(editBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })

      .addCase(retrieveBranchDataById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveBranchDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.branchDataById = action.payload;
      })
      .addCase(retrieveBranchDataById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedBranchId } = branchSlice.actions;
export default branchSlice.reducer;
