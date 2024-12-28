import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/instance";

export const createLibraryUploadFile = createAsyncThunk(
  "library/libraryFile",
  async ({ file, media_type }, { rejectWithValue }) => {
    try {
      const formLibraryFileData = new FormData();
      formLibraryFileData.append("file", file);
      formLibraryFileData.append("media_type", media_type);

      const url = `/library/upload/media?media_type=${media_type}`;

      const response = await instance.post(url, formLibraryFileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveLibraryDataById = createAsyncThunk(
  "library/retrieveLibraryDataById",
  async ({ libraryId, branchId }, { rejectWithValue }) => {
    try {
      if (!branchId) {
        throw new Error("Branch ID is missing");
      }
      if (!libraryId) {
        throw new Error("Library ID is missing");
      }

      const response = await instance.get(
        `/library/${libraryId}?branch_id=${branchId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveLibraryData = createAsyncThunk(
  "library/retrieveLibrary",
  async (selectedBranchId, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/library?branch_id=${selectedBranchId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const createLibraryData = createAsyncThunk(
  "library/postLibraryData",
  async (libraryData, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/library`, libraryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLibrary = createAsyncThunk(
  "library/deleteLibrary",
  async (libraryId, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("selectedBranchId");
      if (!id) {
        throw new Error("Branch ID is missing");
      }
      await instance.delete(`/library/${libraryId}?branch_id=${id}`);
      return libraryId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveLibrarySearch = createAsyncThunk(
  "library/retrieveLibrarySearch",
  async (searchTerm) => {
    const response = await instance.get(`/library/search/${searchTerm}`);
    return response.data;
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    status: "idle",
    searchItems: [],
  },
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveLibrarySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveLibrarySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchItems = action.payload;
      })
      .addCase(retrieveLibrarySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(retrieveLibraryDataById.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveLibraryDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.libraryDataById = action.payload;
      })
      .addCase(retrieveLibraryDataById.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteLibrary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLibrary.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteLibrary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(retrieveLibraryData.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveLibraryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.libraryData = action.payload;
      })
      .addCase(retrieveLibraryData.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createLibraryUploadFile.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createLibraryUploadFile.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createLibraryUploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || "Failed to upload file";
      })

      .addCase(createLibraryData.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(createLibraryData.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.status = "succeeded";
      })
      .addCase(createLibraryData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { resetStatus } = librarySlice.actions;
export default librarySlice.reducer;
