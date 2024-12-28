import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";

export const createMultipleKinderGarten = createAsyncThunk(
  "kindergartens/createKindergartens",
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `/kindergardens/multiple-branches`,
        submissionData
      );
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveKindergartens = createAsyncThunk(
  "kindergartens/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/kindergardens`);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveKindergartensById = createAsyncThunk(
  "kindergartens/fetchById",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("kindergartenId");
      const response = await instance.get(`/kindergardens/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveKindergartenAggregatedInfo = createAsyncThunk(
  "kindergartens/retrieveKindergartenAggregatedInfo",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("kindergartenId");
      const response = await instance.get(
        `/kindergardens/aggregated-info/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const updateKindergarden = createAsyncThunk(
  "kindergarden/update",
  async (editFormData, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/kindergardens/${editFormData?.id}`,
        editFormData
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

export const editKindergartenStatus = createAsyncThunk(
  "kindergartens/editKindergartenStatus",
  async (updatedFormData, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/kindergardens/${updatedFormData?.kindergarden_id}`,
        updatedFormData
      );
      if (!response.ok) {
        throw new Error("Failed to update kindergarten");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBranches = createAsyncThunk(
  "kindergartens/updateBranches",
  async (editBranchesFormData, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/kindergardens/${editBranchesFormData?.kindergarden_id}`,
        editBranchesFormData
      );
      if (!response.ok) {
        throw new Error("Failed to update kindergarten");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteResource = createAsyncThunk(
  "kindergartens/deleteResource",
  async (kindergarden_id, { rejectWithValue }) => {
    try {
      await instance.delete(`/kindergardens/${kindergarden_id}`);
      return kindergarden_id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveKindergartensSearch = createAsyncThunk(
  "kindergartens/retrieveKindergartensSearch",
  async (searchTerm) => {
    const response = await instance.get(
      `/kindergardens/search?name=${searchTerm}`
    );
    return response.data;
  }
);

const kindergartenSlice = createSlice({
  name: "kindergartens",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    kindergartens: [],
    createKindergartens: null,
    updateKindergartens: [],
    deleteItems: [],
    updateBranchesItems: [],
    kindergartenStatus: [],
    list: [],
    branchInfo: null,
    data: null,
  },
  reducers: {
    logout: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(retrieveKindergartensById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveKindergartensById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branchInfo = action.payload;
      })
      .addCase(retrieveKindergartensById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(retrieveKindergartenAggregatedInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        retrieveKindergartenAggregatedInfo.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.totalInfo = action.payload;
        }
      )
      .addCase(retrieveKindergartenAggregatedInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(retrieveKindergartensSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveKindergartensSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(retrieveKindergartensSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(retrieveKindergartens.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(retrieveKindergartens.fulfilled, (state, action) => {
        state.kindergartens = action.payload;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(retrieveKindergartens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      .addCase(createMultipleKinderGarten.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(createMultipleKinderGarten.fulfilled, (state, action) => {
        state.loading = false;
        state.createKindergartens = action.payload;
        state.status = "succeeded";
      })
      .addCase(createMultipleKinderGarten.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      .addCase(updateKindergarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateKindergarden.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateKindergarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(deleteResource.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deleteItems = state.deleteItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranches.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateBranchesItems = action.payload;
      })
      .addCase(updateBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editKindergartenStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editKindergartenStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.kindergartenStatus = action.payload;
      })
      .addCase(editKindergartenStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kindergartenSlice.reducer;
