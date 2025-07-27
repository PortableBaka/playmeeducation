import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";
import { t } from "i18next";

export const createEmployeeData = createAsyncThunk(
  "employee/createEmployeeData",
  async ({ formData }, { rejectWithValue }) => {
    try {
      if (!formData) {
        throw new Error("FormData is missing");
      }
      const response = await instance.post("/employees", formData);
      toast.success(t("employee_add_success"));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveAllData = createAsyncThunk(
  "employee/retrieveAllData",
  async ({ selectedBranchId }, { rejectWithValue }) => {
    try {
      if (!selectedBranchId) {
        throw new Error("Branch ID is missing");
      }
      const response = await instance.get(
        `/employees?branch_id=${selectedBranchId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveAllTeachersData = createAsyncThunk(
  "employee/retrieveAllTeachersData",
  async (selectedBranchId, { rejectWithValue }) => {
    try {
      if (!selectedBranchId) {
        throw new Error("Branch ID is missing");
      }
      const response = await instance.get(
        `/employees/all/teachers?branch_id=${selectedBranchId}`
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveEmployeeDataById = createAsyncThunk(
  "employee/retrieveEmployeeDataById",
  async ({ employeeId, selectedBranchId }, { rejectWithValue }) => {
    if (!employeeId) {
      throw new Error("EmployeeId is missing");
    }
    if (!selectedBranchId) {
      throw new Error("Branch ID is missing");
    }
    try {
      const response = await instance.get(
        `/employees/${employeeId}?branch_id=${selectedBranchId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ editFormData, selectedBranchId }, { rejectWithValue }) => {
    try {
      if (!editFormData) {
        throw new Error("FormData is missing");
      }
      if (!selectedBranchId) {
        throw new Error("Branch ID is missing");
      }
      const response = await instance.put(
        `/employees/${editFormData?.id}?branch_id=${selectedBranchId}`,
        editFormData
      );
      toast.success(t("employee_edit_success"));
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

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async ({ employeeId, selectedBranchId }, { rejectWithValue }) => {
    try {
      if (!employeeId) {
        throw new Error("EmployeeId is missing");
      }
      if (!selectedBranchId) {
        throw new Error("Branch ID is missing");
      }
      const response = await instance.delete(
        `/employees/${employeeId}?branch_id=${selectedBranchId}`
      );
      toast.success(t("employee_edit_success"));
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

const employeesSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    error: null,
    editData: null,
    status: "idle",
    allTeachers: [],
    employeeData: [],
  },
  reducers: {
    logout: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployeeData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createEmployeeData.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(createEmployeeData.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(retrieveEmployeeDataById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveEmployeeDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.employeeDataId = action.payload;
      })
      .addCase(retrieveEmployeeDataById.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(retrieveAllData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.employeeData = action.payload;
      })
      .addCase(retrieveAllData.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(retrieveAllTeachersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveAllTeachersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allTeachers = action.payload;
      })
      .addCase(retrieveAllTeachersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.editData = action.payload;
        state.status = "succeeded";
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        state.status = "failed";
      });
  },
});
export const { resetStatus } = employeesSlice.actions;
export default employeesSlice.reducer;
