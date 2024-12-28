import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";
import { t } from "i18next";

export const createStudentData = createAsyncThunk(
  "students/postStudentData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/students`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveStudents = createAsyncThunk(
  "students/retrieveStudents",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("selectedBranchId");
      if (!id) {
        throw new Error("Branch ID is missing");
      }
      const response = await instance.get(`/students?branch_id=${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveStudentsDataById = createAsyncThunk(
  "students/retrieveStudentsDataById",
  async ({ studentId, branchId }, { rejectWithValue }) => {
    try {
      if (!branchId) {
        throw new Error("Branch ID is missing");
      }
      if (!studentId) {
        throw new Error("SetSelectedStudentId is missing");
      }
      const response = await instance.get(
        `/students/${studentId}?branch_id=${branchId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const editStudentData = createAsyncThunk(
  "students/update",
  async (editFormData, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/students/${editFormData?.id}`,
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

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      await instance.delete(`/students/${studentId}`);
      toast.success(t("student_success_delete"));
      return studentId;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    students: [],
    status: "idle",
    editData: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentData.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createStudentData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(retrieveStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(retrieveStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(retrieveStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      .addCase(retrieveStudentsDataById.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveStudentsDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.studentById = action.payload;
      })
      .addCase(retrieveStudentsDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(editStudentData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(editStudentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editData = action.payload;
        state.status = "succeeded";
      })
      .addCase(editStudentData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
        state.status = "failed";
      })

      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetStatus } = studentSlice.actions;
export default studentSlice.reducer;
