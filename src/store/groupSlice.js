import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";
import { t } from "i18next";

export const createGroupData = createAsyncThunk(
  "groups/postStudentData",
  async (updatedFormData, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/groups`, updatedFormData);
      toast.success(t("group_success_add"));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveGroupData = createAsyncThunk(
  "groups/retrieveGroupsInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/groups`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveGroupDataById = createAsyncThunk(
  "groups/retrieveGroupDataById",
  async (groupId, { rejectWithValue }) => {
    try {
      if (!groupId) {
        throw new Error("Group ID is missing");
      }

      const response = await instance.get(`/groups/${groupId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveGroupSearch = createAsyncThunk(
  "groups/retrieveGroupSearch",
  async (searchTerm) => {
    const response = await instance.get(`/groups/search/${searchTerm}`);
    return response.data;
  }
);

export const editGroup = createAsyncThunk(
  "groups/editGroup",
  async (editFormData, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/groups/${editFormData?.id}`,
        editFormData
      );
      toast.success(t("group_success_edit"));
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

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (groupId, { rejectWithValue }) => {
    try {
      await instance.delete(`/groups/${groupId}`);
      toast.success(t("group_success_delete"));
      return groupId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    groups: [],
    selectedGroup: null,
    success: false,
    groupDataById: [],
    editData: null,
    searchItems: [],
  },
  reducers: {
    logout: (state) => {
      state.error = null;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroupData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createGroupData.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(createGroupData.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(retrieveGroupData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(retrieveGroupData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(retrieveGroupData.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(retrieveGroupDataById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveGroupDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.groupDataById = action.payload;
      })
      .addCase(retrieveGroupDataById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(retrieveGroupSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveGroupSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchItems = action.payload;
      })
      .addCase(retrieveGroupSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(editGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(editGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.editData = action.payload;
        state.status = "succeeded";
      })
      .addCase(editGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        state.status = "failed";
      })

      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setSelectedGroup } = groupSlice.actions;
export default groupSlice.reducer;
