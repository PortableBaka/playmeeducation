import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";
import { t } from "i18next";

export const createStudentTransaction = createAsyncThunk(
  "transaction/createStudentTransaction",
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/transactions`, formValues);
      toast.success(t("transaction_success_message"));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveTransactions = createAsyncThunk(
  "transaction/retrieveTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/transactions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const retrieveTransactionDataById = createAsyncThunk(
  "transaction/retrieveTransactionsDataById",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/transactions/${transactionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (transactionId, { rejectWithValue }) => {
    try {
      await instance.delete(`/transactions/${transactionId}`);
      toast.success(t("transaction_delete_message"));
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    loading: false,
    error: null,
    success: false,
    status: "idle",
    transactionById: null,
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
      .addCase(createStudentTransaction.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createStudentTransaction.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(createStudentTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(retrieveTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(retrieveTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.transactionsData = action.payload;
      })
      .addCase(retrieveTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(retrieveTransactionDataById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(retrieveTransactionDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.transactionById = action.payload;
      })
      .addCase(retrieveTransactionDataById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
