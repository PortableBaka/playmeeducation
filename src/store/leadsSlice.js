import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";
import { t } from "i18next";

export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/leads`, leadData);
      toast.success(t("lead_success_add"));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editLeadData = createAsyncThunk(
  "leads/editLeadData",
  async (updatedValues, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/leads/${updatedValues?.id}?branch_id=${updatedValues?.branch_id}`,
        updatedValues
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

export const retrieveLeadsData = createAsyncThunk(
  "leads/retrieveLeadsData",
  async (selectedBranchId, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/leads?branch_id=${selectedBranchId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveLeadsDataById = createAsyncThunk(
  "leads/retrieveLeadsDataById",
  async (leadId, { rejectWithValue }) => {
    const selectedBranchId = localStorage.getItem("selectedBranchId");
    try {
      const response = await instance.get(
        `/leads/${leadId}?branch_id=${selectedBranchId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId, { rejectWithValue }) => {
    const selectedBranchId = localStorage.getItem("selectedBranchId");
    try {
      await instance.delete(`/leads/${leadId}?branch_id=${selectedBranchId}`);
      toast.success(t("lead_success_delete"));
      return leadId;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    loading: false,
    error: null,
    status: "idle",
    lead: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveLeadsData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveLeadsData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.leadsData = action.payload;
      })
      .addCase(retrieveLeadsData.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editLeadData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(editLeadData.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        state.status = "succeeded";
      })
      .addCase(editLeadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        state.status = "failed";
      })
      .addCase(retrieveLeadsDataById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveLeadsDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.leadById = action.payload;
      })
      .addCase(retrieveLeadsDataById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteLead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default leadsSlice.reducer;
