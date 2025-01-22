import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../api/instance";

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("selectedBranchId");
      eventData["branch_id"] = id;
      const response = await instance.post(`/events`, eventData);
      toast.success("Event created successfully!");
      return response.data;
    } catch (error) {
        toast.error(error.response?.data.detail || "Error creating event");
      return rejectWithValue(error.response?.data || "Error creating event");
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("selectedBranchId");
      const response = await instance.get(`/events?branch_id=${id}`);
      const data = response.data;
      const formattedData = data.map((event) => ({
        title: event.name,
        start: new Date(event.start_time), 
        end: new Date(event.end_time), 
        ...event
      }));
      return formattedData;
    } catch (error) {
        toast.error(error.response?.data.detail || "Error fetching events");
      return rejectWithValue(error.response?.data || "Error fetching events");
    }
  }
);

export const duplicateEventsToNextWeek = createAsyncThunk(
  "events/duplicateEventsToNextWeek",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/events/duplicate/week/`);
      toast.success("Events duplicated to next week successfully!");
      return response.data;
    } catch (error) {
        toast.error(error.response?.data.detail || "Error duplicating events");
      return rejectWithValue(error.response?.data || "Error duplicating events");
    }
  }
);

export const getCurrentWeekEvents = createAsyncThunk(
  "events/getCurrentWeekEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/events/current/week`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching current week events"
      );
    }
  }
);

export const getTodayEvents = createAsyncThunk(
  "events/getTodayEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/events/today`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching today's events"
      );
    }
  }
);

export const getEventsByDate = createAsyncThunk(
  "events/getEventsByDate",
  async (date, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/events/by-date?date=${date}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching events by date"
      );
    }
  }
);

export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching event");
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/events/${data.id}?branch_id=${localStorage.getItem("selectedBranchId")}`, data);
      toast.success("Event updated successfully!");
      return response.data;
    } catch (error) {
        toast.error(error.response?.data.detail || "Error updating event");
      return rejectWithValue(error.response?.data || "Error updating event");
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await instance.delete(`/events/${eventId}?branch_id=${localStorage.getItem("selectedBranchId")}`);
      toast.success("Event deleted successfully!");
      return eventId;
    } catch (error) {
        toast.error(error.response?.data.detail || "Error deleting event");
      return rejectWithValue(error.response?.data || "Error deleting event");
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
    status: "idle",
    currentEvent: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.status = "idle"
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
        .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "succeeded";
            state.status = "idle"
        })
        .addCase(updateEvent.rejected, (state, action) => {
            state.loading = false;
            state.status = "failed";
            state.error = action.payload;
        })
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event.id !== action.payload);
        state.status = "idle"
      });
  },
});

export const { resetStatus } = eventsSlice.actions;

export default eventsSlice.reducer;
