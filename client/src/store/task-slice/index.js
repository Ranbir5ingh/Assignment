import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  taskItems: [],
  isLoading: false,
  error: null
};

export const addTask = createAsyncThunk(
  "task/addTask",
  async ({ userId, taskData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/task/add`,
        {
          userId,
          taskData,
        }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/task/get/${userId}`
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/task/${userId}/${taskId}`
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleCompleteTask = createAsyncThunk(
  "task/toggleCompleteTask",
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/task/toggle-complete`, // Fixed endpoint
        {
          userId,
          taskId,
        }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add clearCompletedTasks to match the controller functionality
export const clearCompletedTasks = createAsyncThunk(
  "task/clearCompletedTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/task/clear-completed/${userId}`
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Task
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskItems = action.payload.data;
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add task";
        // Don't clear taskItems on rejection
      })
      
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskItems = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to fetch tasks";
        // Don't clear taskItems on rejection
      })
      
      // Toggle Complete Task
      .addCase(toggleCompleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleCompleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskItems = action.payload.data;
        state.error = null;
      })
      .addCase(toggleCompleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to update task";
        // Don't clear taskItems on rejection
      })
      
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskItems = action.payload.data;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to delete task";
        // Don't clear taskItems on rejection
      })
      
      // Clear Completed Tasks
      .addCase(clearCompletedTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCompletedTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskItems = action.payload.data;
        state.error = null;
      })
      .addCase(clearCompletedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to clear completed tasks";
        // Don't clear taskItems on rejection
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;